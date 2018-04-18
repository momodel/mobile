import React, { PureComponent } from 'react'
import { BackHandler, Animated, Easing } from 'react-native'
import {
  StackNavigator,
  TabNavigator,
  TabBarBottom,
  addNavigationHelpers,
  NavigationActions,
} from 'react-navigation'
import { connect } from 'react-redux'

import Loading from './containers/Loading'
import Login from './containers/Login'
import Home from './containers/Home'
import Account from './containers/Account'
import Register from './containers/Register'
import Message from './containers/Message'
import Forget from './containers/Forget'
import AppDetail from './containers/AppDetail'
import Predict from './containers/Predict'
import Requests from './containers/Requests'
import Request from './containers/Request'
import FavorApps from './containers/FavorApps'
import {RequestEdit} from './containers/RequestEdit'
import UserInfo from './containers/UserInfo'
// import Predict from './containers/Predict'
// import ImagePickerExample from './containers/Test'

// import Test from './containers/Test'
// import {RequestHeaderCard} from './components/RequestHeader'
// import SpeechToText from './containers/test/SpeechToText'
import SpeechTest from './containers/test/SpeechTest'


const HomeNavigator = TabNavigator(
  {
    Home: {
      screen: Home,
      navigationOptions: {
        tabBarVisible: false,
      },
    },
  },
  // {
  //   Home: {
  //     screen: Home,
  //     navigationOptions: {
  //       tabBarVisible: false,
  //     },
  //   },
  // },
  {
    tabBarComponent: TabBarBottom,
    tabBarPosition: 'bottom',
    swipeEnabled: false,
    animationEnabled: false,
    lazyLoad: true,
  }
)

const MainNavigator = StackNavigator(
  {
    HomeNavigator: { screen: HomeNavigator },
    Message: { screen: Message,
      navigationOptions: {
        title: '我的消息',
      },
    },
    Account: { screen: Account,
      navigationOptions: {
        title: '我的账户',
        header: null,
        // headerStyle: {
        //   backgroundColor: '#AACDFF',
        //   borderBottom: 0
        // },
      },
    },
    AppDetail: { screen: AppDetail,
      navigationOptions: {
        // title: '应用详情',
      },
    },
    Predict: { screen: Predict },
    Requests: {
      screen: Requests,
      navigationOptions: {
        title: '我发布的需求',
      },
    },
    Request: { screen: Request,
      navigationOptions: {
        title: '需求详情',
      }
    },

    // UsedApps: { screen: UsedApps,
    //   navigationOptions: {
    //     title: '使用记录',
    //   }
    // },

    FavorApps: { screen: FavorApps,
      navigationOptions: {
        title: '我的收藏',
      }
    },

    RequestEdit: { screen: RequestEdit,
      navigationOptions: {
        title: '修改需求',
      }
    },

    UserInfo: { screen: UserInfo,
      navigationOptions: {
        title: '账号与安全',
      }
    },
  },
  {
    headerMode: 'float',
  }
)

const LoginNavigator = StackNavigator(
  {
    Login: {
      screen: Login,
      navigationOptions: {
        header: null,
      },
    },
    Register: {
      screen: Register,
      navigationOptions: {
        header: null,
        title: '注册',
      },
    },
    Forget: {
      screen: Forget,
      navigationOptions: {
        title: '忘记密码',
      },
    },
  },
  {
    headerMode: 'float',
  }
)

const AppNavigator = StackNavigator(
  {
    LoginNav: { screen: LoginNavigator },
    Main: { screen: MainNavigator },
  },
  {
    headerMode: 'none',
    mode: 'modal',
    navigationOptions: {
      gesturesEnabled: false,
    },
    transitionConfig: () => ({
      transitionSpec: {
        duration: 300,
        easing: Easing.out(Easing.poly(4)),
        timing: Animated.timing,
      },
      screenInterpolator: sceneProps => {
        const { layout, position, scene } = sceneProps
        const { index } = scene

        const height = layout.initHeight
        const translateY = position.interpolate({
          inputRange: [index - 1, index, index + 1],
          outputRange: [height, 0, 0],
        })

        const opacity = position.interpolate({
          inputRange: [index - 1, index - 0.99, index],
          outputRange: [0, 1, 1],
        })

        return { opacity, transform: [{ translateY }] }
      },
    }),
  }
)

function getCurrentScreen(navigationState) {
  if (!navigationState) {
    return null
  }
  const route = navigationState.routes[navigationState.index]
  if (route.routes) {
    return getCurrentScreen(route)
  }
  return route.routeName
}

@connect(({ app, router }) => ({ app, router }))
class Router extends PureComponent {
  componentWillMount() {
    BackHandler.addEventListener('hardwareBackPress', this.backHandle)
  }

  componentWillUnmount() {
    BackHandler.removeEventListener('hardwareBackPress', this.backHandle)
  }

  backHandle = () => {
    const currentScreen = getCurrentScreen(this.props.router)
    if (currentScreen === 'Login') {
      return true
    }
    if (currentScreen !== 'Home') {
      this.props.dispatch(NavigationActions.back())
      return true
    }
    return false
  }

  render() {
    const { dispatch, app, router } = this.props
    if (app.loading) return <Loading />

    const navigation = addNavigationHelpers({ dispatch, state: router })
    return <AppNavigator navigation={navigation} />
  }
}

export function routerReducer(state, action = {}) {
  return AppNavigator.router.getStateForAction(action, state)
}

export default Router
