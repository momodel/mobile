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
  ScrollView,
  KeyboardAvoidingView,
  Dimensions,
  ImageBackground

} from 'react-native'
import InputItemStyle from 'antd-mobile/lib/input-item/style/index'
import {InputItem, Button, Tabs} from 'antd-mobile'
import {Touchable} from '../components'
import Global from '../Global'
import {createAction, NavigationActions, checkMobile} from '../utils'

const {width, height} = Dimensions.get('window')
const nwidth = 375
const nheight = 667
const scale = 1 / nheight * height


const newStyle = {}
for (const key in InputItemStyle) {
  if (Object.prototype.hasOwnProperty.call(InputItemStyle, key)) {
    // StyleSheet.flatten返回的obj描述中的configurable、writable为false，所以这里要展开赋值
    newStyle[key] = {...StyleSheet.flatten(InputItemStyle[key])}
    if (key === 'input') {
      newStyle[key].fontSize = 15
    }
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

  onGotoMain = () => {
    this.props.navigation.dispatch(
      NavigationActions.navigate({routeName: 'Main'})
    )
  }

  render() {
    const {fetching} = this.props
    return (
      <View style={{
        backgroundColor: '#FBFAFA',
        alignItems: "center",
        width: width,
        height: height,
      }}>
        {fetching ? <ActivityIndicator/> : <LoginPage/>}
        {/*{!fetching && (*/}
        {/*<Touchable*/}
        {/*style={styles.close}*/}
        {/*text="游客登录"*/}
        {/*onPress={this.onGotoMain}*/}
        {/*>*/}
        {/*<Text style={{color: "white"}}>close</Text>*/}
        {/*</Touchable>*/}
        {/*)}*/}
      </View>
    )
  }
}

export default Login


@connect(({app}) => ({...app}))
class LoginPage extends Component {
  constructor(props) {
    super(props)
    this.state = {
      username: '',
      password: '',

      phone: "",
      code: "",
      count: 0,
      type: "account",
    }
  }

  componentWillMount() {
    const {username, password} = this.props
    this.setState({
      username,
      password,
      // type: "phone",
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
    if (this.state.phone === '' || this.state.code === '') {
      Alert.alert('警告', '请输入手机号和验证码', [{text: '确定'}])
      return
    }
    let phone = this.state.phone
    phone = phone.replace(/\s+/g,"");
    if (checkMobile(phone)) {
      this.props.dispatch(
        createAction('app/loginWithPhone')({
          phone: phone,
          code: this.state.code,
        })
      )
    }else{
      Alert.alert('警告', '请输入正确的手机号', [{text: '确定'}])
    }
  }

  onGetCaptcha = () => {
    // 向后端请求验证码
    let phone = this.state.phone
    phone = phone.replace(/\s+/g,"");
    if (checkMobile(phone)) {
      this.props.dispatch({
        type: "register/sendVerificationCode",
        payload: {
          phone: phone
        }
      })
      let count = 59
      this.setState({count})
      this.interval = setInterval(() => {
        count -= 1
        this.setState({count})
        if (count === 0) {
          clearInterval(this.interval)
        }
      }, 1000)
    } else {
      Alert.alert('警告', '请输入正确的手机号', [{text: '确定'}])
    }
  }

  renderAccountBox() {
    return (
      <View>
        <View style={{padding: 10}}>
          <InputItem
            styles={StyleSheet.create(newStyle)}
            type="text"
            placeholder="用户名长度1-7位"
            onChange={value => {
              this.setState({
                username: value,
              })
            }}
            autoCapitalize="none"
            value={this.state.username}
          >
            <Text style={{fontSize: 15, color: "#8A8C91"}}>
              用户名
            </Text>
          </InputItem>
        </View>
        <View style={{padding: 10}}>
          <InputItem
            styles={StyleSheet.create(newStyle)}
            type="password"
            placeholder="密码长度6-14位"
            onChange={value => {
              this.setState({
                password: value,
              })
            }}
            value={this.state.password}
          >
            <Text style={{fontSize: 15, color: "#8A8C91"}}>
              密码
            </Text>
          </InputItem>
        </View>
      </View>
    )
  }

  renderPhoneBox() {
    const {count} = this.state
    return (
      <View>
        <View style={{padding: 10}}>
          <InputItem
            styles={StyleSheet.create(newStyle)}
            type="phone"
            placeholder="186 1234 1234"
            onChange={value => {
              this.setState({
                phone: value,
              })
            }}
            value={this.state.phone}
          >
            <Text style={{fontSize: 15, color: "#8A8C91"}}>
              手机号
            </Text>
          </InputItem>
        </View>
        <View style={{flexDirection: "row",}}>
          <View style={{padding: 10, flex: 1}}>

            <InputItem
              styles={StyleSheet.create(newStyle)}
              type="text"
              placeholder="请输入验证码"
              onChange={value => {
                this.setState({
                  code: value,
                })
              }}
              value={this.state.code}/>
          </View>
          <View style={{justifyContent: "center", alignItems: "center", paddingRight: 20,}}>
            <Button
              style={{width: 100, height: 35, borderRadius: 2, borderColor: "#6D9CF9"}}
              type="ghost"
              disabled={Boolean(count)}
              onClick={this.onGetCaptcha}
            >
              <Text style={{fontSize: 13, color: "#6D9CF9"}}>
                {count ? `${count} s` : '获取验证码'}
              </Text>
            </Button>
          </View>
        </View>

      </View>
    )
  }


  render() {
    return (
      <KeyboardAvoidingView style={{height: "100%", width: "100%"}}
                            behavior='position'>
        <ImageBackground source={require('../images/background.png')}
                         style={{height: "100%", width: "100%"}}>
          <View style={{
            height: "42%", justifyContent: "center",
            alignItems: "center",
          }}>
            <View style={{
              height: 110 * scale, width: 110 * scale, backgroundColor: 'white',
              borderRadius: 55 * scale, justifyContent: "center",
              alignItems: "center",
              marginTop: 90 * scale,
              // boxShadow: "100px 100px 50spx #888888"
              // boxShadow:"2px 2px 2px 2px #FF0000",
              // // border: "10px solid #ddd",
              shadowColor: 'black',
              shadowOffset: {h: 5, w: 5},
              shadowRadius: 15,
              shadowOpacity: 0.3,
            }}>
              <Image
                style={{height: 70 * scale, width: 70 * scale}}
                source={require('./../images/icons/mo.png')}
              />
            </View>
          </View>

          <View style={{
            height: "41%", marginLeft: 30, marginRight: 30, backgroundColor: "white",
            borderRadius: 5
          }}>
            <View style={{height: "25%", flexDirection: "row"}}>
              <TouchableOpacity
                style={{
                  flex: 1, justifyContent: "center",
                  alignItems: "center",
                }}
                onPress={() => this.setState({type: "account"})}
              >
                <Text style={{
                  color: this.state.type === 'account' ? "#6D9CF9" : "#BBC3D2",
                  fontSize: 16,
                  // fontFamily: "PingFangSC-Regular"
                }}>
                  账号登录
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={{
                  flex: 1, justifyContent: "center",
                  alignItems: "center",
                }}
                onPress={() => this.setState({type: "phone"})}
              >
                <Text style={{
                  color: this.state.type === 'phone' ? "#6D9CF9" : "#BBC3D2",
                  fontSize: 16,
                }}>
                  短信登录
                </Text>
              </TouchableOpacity>
            </View>


            {this.state.type === 'account' ? this.renderAccountBox() : this.renderPhoneBox()}

            <View style={{flex: 1, justifyContent: "flex-end"}}>
              <Button style={{width: "100%", alignSelf: "center", backgroundColor: "#6D9CF9"}}
                      onClick={
                        this.state.type === "account" ? this.onLogin : this.onLoginWithPhone
                      }>
                <Text style={{color: 'white'}}>登 录</Text>
              </Button>
            </View>

          </View>


          <View style={{
            flex: 1, justifyContent: "flex-end"
          }}>

            <View style={{
              flexDirection: "row", justifyContent: "center",
              alignItems: "center", margin: 30
            }}>
              <TouchableOpacity
                onPress={() => {
                  this.props.dispatch(
                    NavigationActions.navigate({routeName: 'Forget'})
                  )
                }}
                style={{backgroundColor: "transparent"}}
              >
                <Text style={styles.bottomText}>找回密码</Text>
              </TouchableOpacity>

              <View style={{marginLeft: 20, marginRight: 20, backgroundColor: "grey", width: 1, height: "100%"}}/>
              <TouchableOpacity
                onPress={() => {
                  this.props.dispatch(
                    NavigationActions.navigate({routeName: 'Register'})
                  )
                }}
                style={{backgroundColor: "transparent"}}
              >
                <Text style={styles.bottomText}>注册</Text>

              </TouchableOpacity>
            </View>
            {/*<View style={{backgroundColor: "transparent", justifyContent: "center",*/}
            {/*alignItems: "center",  margin: 10}}>*/}
            {/*<Text style={styles.bottomText}>MO手机版 版本号: {Global.version}</Text>*/}
            {/*</View>*/}

          </View>
        </ImageBackground>
      </KeyboardAvoidingView>
    )
  }
}


const styles = StyleSheet.create({

  bottomText: {
    color: "#BBC3D2",
    fontSize: 14
  },
})
