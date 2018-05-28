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
  KeyboardAvoidingView,
  Dimensions,
  ImageBackground
} from 'react-native'
import {InputItem, Button, List} from 'antd-mobile'
import {createAction, NavigationActions, checkMobile} from '../utils'
import Global from '../Global'
import InputItemStyle from "antd-mobile/lib/input-item/style/index"

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
class Register extends Component {
  constructor(props) {
    super(props)
    this.state = {
      phone: '',
      password: '',
      user_ID: "",
      code: "",
      count: 0
    }
  }

  onGetCaptcha = () => {
    // 向后端请求验证码
    let phone = this.state.phone
    phone = phone.replace(/\s+/g, "")
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

  onSubmit = () => {
    if (this.state.phone === '' || this.state.code === '' || this.state.user_ID === '' || this.state.password === '') {
      Alert.alert('警告', '请输入手机号和验证码', [{text: '确定'}])
      return
    }

    this.props.dispatch(
      createAction('register/submit')({
        phone: this.state.phone,
        code: this.state.code,
        user_ID: this.state.user_ID,
        password: this.state.password
      })
    )
  }

  renderRigisterBox() {
    const {count} = this.state
    return (
      <View>
        <View style={{padding: 10}}>
          <InputItem
            styles={StyleSheet.create(newStyle)}
            type="text"
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

        <View style={{padding: 10}}>
          <InputItem
            styles={StyleSheet.create(newStyle)}
            type="text"
            placeholder="用户名长度1-7位"
            onChange={value => {
              this.setState({
                user_ID: value,
              })
            }}
            value={this.state.user_ID}
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

  render() {
    return (
      <KeyboardAvoidingView style={{height: "100%", width: "100%"}}
                            behavior='position'>
        <ImageBackground source={require('../images/background.png')}
                         style={{height: "100%", width: "100%"}}>
          <View style={{
            height: "35%", justifyContent: "center",
            alignItems: "center",
          }}>
            <View style={{
              height: 110 * scale, width: 110 * scale, backgroundColor: 'white',
              borderRadius: 55 * scale, justifyContent: "center",
              alignItems: "center",
              marginTop: 40 * scale,
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
            height: "50%", marginLeft: 30, marginRight: 30, backgroundColor: "white",
            borderRadius: 5
          }}>
            {
              this.renderRigisterBox()
            }

            <View style={{flex: 1, justifyContent: "flex-end"}}>
              <Button style={{width: "100%", alignSelf: "center", backgroundColor: "#6D9CF9"}}
                      onClick={this.onSubmit}>
                <Text style={{color: 'white'}}>注 册</Text>
              </Button>
            </View>
          </View>

          <View style={{
            flex: 1, justifyContent: "flex-end"
          }}>

            <View style={{
              flexDirection: "row", justifyContent: "center",
              alignItems: "center", margin: 30, backgroundColor: "transparent"
            }}>
              <Text style={styles.bottomText}>
                已有账户？
              </Text>

              <TouchableOpacity
                onPress={() => this.props.dispatch(NavigationActions.back())}
                style={{backgroundColor: "transparent"}}
              >
                <Text style={[styles.bottomText, {fontWeight: "700", color: "white"}]}>登录</Text>
              </TouchableOpacity>
            </View>
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
export default Register
