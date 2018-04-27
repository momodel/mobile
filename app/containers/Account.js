import React, {Component} from 'react'
import {StyleSheet, View, Image, Text, ImageBackground, TouchableOpacity, Dimensions, ScrollView} from 'react-native'
import {connect} from 'react-redux'
import {Icon, ActivityIndicator} from 'antd-mobile'
import {NavigationActions, objectIdToImg} from '../utils'

const {width, height} = Dimensions.get('window')
import {UsedAppsList} from '../components/List/AppsList'

const radius = 40

@connect(({app, appList}) => ({...app, appList}))
class Account extends Component {
  componentDidMount() {
    this.props.dispatch({
      type: 'appList/getUsedApps'
    })

    this.props.dispatch({
      type: "app/getUserInfo",
      payload: {
        user_ID: this.props.username
      }
    })

    this.props.dispatch({
      type: "app/getUserStatistics",
      payload: {
        user_ID: this.props.username
      }
    })


  }

  gotoLogin = () => {
    this.props.dispatch(NavigationActions.navigate({routeName: 'Login'}))
  }

  gotoMessage = () => {
    this.props.dispatch(NavigationActions.navigate({routeName: 'Message'}))
  }

  gotoRequests = () => {
    this.props.dispatch(NavigationActions.navigate({routeName: 'Requests'}))
  }


  gotoFavorApps = () => {
    this.props.dispatch(NavigationActions.navigate({routeName: 'FavorApps'}))
  }

  gotoUserInfo = () => {
    this.props.dispatch(NavigationActions.navigate({routeName: 'UserInfo'}))
  }

  goBack = () => this.props.dispatch(NavigationActions.back())

  render() {
    const {username, login, user, userStatistics} = this.props
    const {avatar} = user
    const {favor_apps_count, requests_count} = userStatistics
    return (
      <View>
        <View style={{
          width: "100%", height: height * 0.1,
          backgroundColor: "#AACDFF", flexDirection: "row",
          justifyContent: "space-between"
        }}>
          <TouchableOpacity
            style={{
              // position: 'absolute',
              // left: 100,
              // top: 100,
              marginTop: "7%",
              paddingLeft: "2.5%",
              backgroundColor: 'transparent',
              flexDirection: "row",
              // justifyContent: "center",
              alignItems: "center"
            }}
            onPress={this.goBack}
          >
            <Icon type="left" color='#2F7DF6' style={{marginRight: 10, color: "blue"}}/>
            <Text style={{fontSize: 20, color: "white"}}
            >我的</Text>
          </TouchableOpacity>


          <TouchableOpacity
            style={{
              marginTop: "7%",
              paddingRight: "2.5%",
              backgroundColor: 'transparent',

              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              // margin: 10,
              width: 50,
              height: 40,
            }}
            onPress={() => {
              this.props.dispatch(
                NavigationActions.navigate({routeName: 'Message'})
              )
            }}
          >
            <Image
              style={{width: 25, height: 25, tintColor: 'white'}}
              source={require('../images/icons/mail.png')}
            />
          </TouchableOpacity>

        </View>


        <ScrollView style={{backgroundColor: "white"}}
                    keyboardShouldPersistTaps="always">
          <View style={{width: "100%", height: height * 0.08, backgroundColor: "#AACDFF",}}>
          </View>
          <TouchableOpacity style={{width: "100%", alignItems: "center", marginTop: -radius}}
                            onPress={this.gotoUserInfo}
          >
            <View style={{
              width: radius * 2,
              height: radius * 2,
              borderRadius: radius,
              backgroundColor: "white",
              alignItems: "center",
              justifyContent: "center"
            }}>
              {user !== "" ? <Image style={{width: radius * 2 - 2, height: radius * 2 - 2, borderRadius: radius - 1}}
                                    source={avatar ? {uri: avatar} : objectIdToImg(user._id)}/> :
                <ActivityIndicator animating/>
              }

            </View>

            <View style={{marginTop: 10}}>
              <Text style={{fontSize: 20}}>
                {username}
              </Text>
            </View>
          </TouchableOpacity>

          <View style={{alignItems: "center", justifyContent: "center", margin: 10}}>
            <View style={{width: "90%", backgroundColor: "#F2F2F2", height: 1}}/>
          </View>


          <View style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "center",
            height: height * 0.1,
            width: width
          }}>
            <TouchableOpacity style={{alignItems: "center", justifyContent: "center", width: "45%"}}
                              onPress={this.gotoFavorApps}
            >
              <Text style={{fontSize: 20, color: "#6D9CF9"}}>
                {favor_apps_count}
              </Text>
              <Text style={{marginTop: 10}}>
                收藏
              </Text>
            </TouchableOpacity>

            <View style={{alignItems: "center", justifyContent: "center"}}>
              <View style={{height: "90%", backgroundColor: "#F2F2F2", width: 1}}/>
            </View>

            <TouchableOpacity style={{alignItems: "center", justifyContent: "center", width: "45%"}}
                              onPress={this.gotoRequests}
            >
              <Text style={{fontSize: 20, color: "#6D9CF9"}}>
                {requests_count}
              </Text>
              <Text style={{marginTop: 10}}>
                需求
              </Text>
            </TouchableOpacity>
          </View>

          <View style={{backgroundColor: "#F2F4F6", height: 30, justifyContent: "center"}}>
            <Text style={{marginLeft: 30}}>
              使用记录
            </Text>
          </View>

          <UsedAppsList Apps={this.props.appList.usedApps} onPressItem={(App) =>
            this.props.dispatch(
              NavigationActions.navigate({
                routeName: 'AppDetail',
                params: {api: App},
              })
            )
          }/>
        </ScrollView>

      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  icon: {
    width: 32,
    height: 32,
  },

  logout: {
    height: 40,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'red',
    padding: 5,
    margin: 5,
  },
  logout_text: {
    textAlign: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: 18,
    color: 'white',
  },
})

export default Account
