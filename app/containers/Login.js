import React, {Component} from 'react'
import {connect} from 'react-redux'
import {
  StyleSheet,
  View,
  Text,
  ActivityIndicator,
  Image,
  NativeAppEventEmitter,
  Alert,
  TouchableOpacity,
} from 'react-native'
import {InputItem, Button, Tabs} from 'antd-mobile'
import {Touchable} from '../components'
import Global from '../Global'

import {createAction, NavigationActions} from '../utils'

/**
 * <Tabs tabs={[
            {title: "账号密码登录"},
            {title: "手机号登录"},
          ]}
 initialPage={1}
 onChange={(tab, index) => {
                  console.log('onChange', index, tab)
                }}
 onTabClick={(tab, index) => {
                  console.log('onTabClick', index, tab)
                }}
 >
 */
@connect(({app}) => ({...app}))
class LoginPage extends Component {
  constructor(props) {
    super(props)
    this.state = {
      username: '',
      password: '',

      phone: "",
      code: "",
      count: 0
    }
  }

  componentWillMount() {
    const {username, password} = this.props
    this.setState({
      username,
      password,

      type: "account",
    })
  }

  onLogin = () => {
    if (this.state.username === '' || this.state.password === '') {
      Alert.alert('警告', '请输入用户名和密码', [{text: '确定'}])
      return
    }

    this.props.dispatch(
      createAction('app/login')({
        username: this.state.username,
        password: this.state.password,
      })
    )
  }


  onLoginWithPhone = () => {
    console.log("onLoginWithPhone")
    if (this.state.phone === '' || this.state.code === '') {
      Alert.alert('警告', '请输入手机号和验证码', [{text: '确定'}])
      return
    }

    this.props.dispatch(
      createAction('app/loginWithPhone')({
        phone: this.state.phone,
        code: this.state.code,
      })
    )
  }

  onGetCaptcha = () => {
    // 向后端请求验证码
    let phone = this.state.phone
    this.props.dispatch({
      type: "register/sendVerificationCode",
      payload: {
        phone: phone
      }
    })

    let count = 59;
    this.setState({ count });
    this.interval = setInterval(() => {
      count -= 1;
      this.setState({ count });
      if (count === 0) {
        clearInterval(this.interval);
      }
    }, 1000);
  }

  render() {
    const { count } = this.state;
    return (
        <View style={styles.container}>
          <View style={styles.icon}>
            <Image
              style={{height: 150, width: 150}}
              source={require('./../images/icons/mo.png')}
            />
            <Text style={styles.title}>MO</Text>
          </View>


          {
            this.state.type === "account" ?
              <View style={styles.bg}>
                <InputItem
                  type="text"
                  placeholder="输入你的用户名"
                  onChange={value => {
                    this.setState({
                      username: value,
                    })
                  }}
                  autoCapitalize="none"
                  value={this.state.username}
                >
                  用户名
                </InputItem>

                <InputItem
                  type="password"
                  placeholder="****"
                  onChange={value => {
                    this.setState({
                      password: value,
                    })
                  }}
                  value={this.state.password}
                >
                  密码
                </InputItem>

                <Button style={styles.btn} onClick={this.onLogin}>
                  <Text style={{color: 'white'}}>登录</Text>
                </Button>

                <TouchableOpacity
                  onPress={() => {
                    this.setState({
                      type: "phone"
                    })
                  }}
                  style={{justifyContent: "center", alignItems: 'center', marginTop: 5}}
                >
                  <Text style={{color: '#34C0E2'}}>使用手机号登录</Text>
                </TouchableOpacity>


                <View style={styles.textContainer}>
                  <TouchableOpacity
                    onPress={() => {
                      this.props.dispatch(
                        NavigationActions.navigate({routeName: 'Register'})
                      )
                    }}
                  >
                    <Text style={styles.text}>注册</Text>
                  </TouchableOpacity>

                  <TouchableOpacity
                    onPress={() => {
                      this.props.dispatch(
                        NavigationActions.navigate({ routeName: 'Forget' })
                      )
                    }}


                  >
                    <Text style={styles.text}>忘记密码</Text>
                  </TouchableOpacity>
                </View>

                <View style={styles.textContainer1}>
                  <Text style={styles.text}>MO手机版 版本号: {Global.version}</Text>
                </View>

              </View>:




              <View style={[styles.bg, {marginTop: 115}]}>

                <InputItem
                  type="text"
                  placeholder="186 1234 1234"
                  onChange={value => {
                    this.setState({
                      phone: value,
                    })
                  }}
                  // autoCapitalize="none"
                  value={this.state.phone}
                >
                  手机号码
                </InputItem>

                <InputItem
                  type="text"
                  placeholder="输入验证码"
                  onChange={value => {
                    this.setState({
                      code: value,
                    })
                  }}
                  value={this.state.code} />


                <Button
                  size="large"
                  disabled={Boolean(count)}
                  onClick={this.onGetCaptcha}
                >
                  {count ? `${count} s` : '获取验证码'}
                </Button>

                <Button style={styles.btn} onClick={this.onLoginWithPhone}>
                  <Text style={{color: 'white'}}>登录</Text>
                </Button>

                <TouchableOpacity
                  onPress={() => {
                    this.setState({
                      type: "account"
                    })
                  }}
                  style={{justifyContent: "center", alignItems: 'center', marginTop: 5}}
                >
                  <Text style={{color: '#34C0E2'}}>使用账号密码登录</Text>
                </TouchableOpacity>


                <View style={styles.textContainer}>
                  <TouchableOpacity
                    onPress={() => {
                      this.props.dispatch(
                        NavigationActions.navigate({routeName: 'Register'})
                      )
                    }}
                  >
                    <Text style={styles.text}>注册</Text>
                  </TouchableOpacity>

                </View>

                <View style={styles.textContainer1}>
                  <Text style={styles.text}>MO手机版 版本号: {Global.version}</Text>
                </View>

              </View>

          }




        </View>

    )
  }
}

@connect(({app}) => ({...app}))
class Login extends Component {
  componentWillMount() {
    // 检查是否登录
    const {login} = this.props
    if (login) {
      this.props.navigation.dispatch(
        NavigationActions.navigate({routeName: 'Main'})
      )
    }
  }

  // onClose = () => {
  //   this.props.dispatch(NavigationActions.back())
  // }

  onGotoMain = () => {
    this.props.navigation.dispatch(
      NavigationActions.navigate({routeName: 'Main'})
    )
  }

  render() {
    const {fetching} = this.props
    return (
      <View style={styles.container}>
        {fetching ? <ActivityIndicator/> : <LoginPage/>}
        {!fetching && (
          <Touchable
            style={styles.close}
            text="游客登录"
            onPress={this.onGotoMain}
          >
            <Text>close</Text>
          </Touchable>
        )}
      </View>
    )
  }
}

export default Login

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: '#FBFAFA',
  },
  icon: {
    top: 80,
    alignItems: 'center',
  },
  title: {
    marginTop: 20,
    fontSize: Global.titleFontSizeBigBig,
    color: Global.blue,
  },
  bg: {
    // height: "60%",
    // justifyContent: "center",
    // alignItems: "center",

    flex: 1,
    marginTop: 500 / 3,
    paddingTop: 20,
    paddingLeft: 50,
    paddingRight: 50,
    // paddingBottom: 30,
    bottom: 0,
  },
  input: {
    marginBottom: 20,
  },
  btn: {
    marginTop: 20,
    width: 260,
    alignSelf: 'center',
    backgroundColor: Global.blue,
  },
  textContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 20,
    margin: 10,
  },
  textContainer1: {
    // display: "flex",
    // flexDirection: "row",
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 40,
  },
  text: {
    fontSize: Global.textFontSize,
    color: 'grey',
  },

  close: {
    position: 'absolute',
    right: 20,
    top: 40,
  },
})
