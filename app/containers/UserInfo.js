/**
 * 用户个人信息页面
 */
import React, {Component} from 'react'
import {StyleSheet, View, Image, Text, ImageBackground, TouchableOpacity} from 'react-native'
import {connect} from 'react-redux'
import {List} from 'antd-mobile'
import {Modal, Button, WingBlank, WhiteSpace, Toast, ActivityIndicator} from 'antd-mobile'
import {createAction, objectIdToImg} from "../utils"
import ImagePicker from "react-native-image-picker"
import {URL} from "../Global"
const prompt = Modal.prompt
const operation = Modal.operation
const Item = List.Item
const genderDic = {
  '1': '男',
  '0': '女',
  '2': '保密'
}
const radius = 20
const options = {
  title: '选择图片',
  storageOptions: {
    skipBackup: true,
    path: 'images'
  },
  quality: 0.1
}


@connect(({app}) => ({...app}))
export default class UserInfo extends Component {
  state = {
    imageLoading: false
  }

  componentDidMount() {
    // this.props.dispatch({
    //   type: "app/getUserInfo",
    //   payload: {
    //     user_ID: this.props.username
    //   }
    // })
  }

  updateUser = (key, value) => {
    this.props.dispatch({
      type: "app/updateUser",
      payload: {
        [key]: value
      }
    })
  }

  updateAvatar = (base64Str) => {
    this.props.dispatch({
      type: "app/updateAvatar",
      payload: {
        base64Str
      }
    })
  }

  logout = () => {
    this.props.dispatch(createAction('app/logout')())
  }

  handleChangeAvatar = () => {
    this.setState({
      imageLoading: true
    })

    ImagePicker.showImagePicker(options, (response) => {
      this.setState({
        imageLoading: false
      })

      if (response.didCancel) {
        console.log('User cancelled image picker')
      }
      else if (response.error) {
        console.log('ImagePicker Error: ', response.error)
      }
      else if (response.customButton) {
        console.log('User tapped custom button: ', response.customButton)
      }
      else {
        // 上传头像
        // this.updateUser('avatar', `data:image/png;base64, ${response.data}`)
        this.updateAvatar(`data:image/png;base64, ${response.data}`)
        // this.setState({
        //   image
        // })
      }
    })
  }

  render() {
    const {login, user = {}, updatingUser} = this.props
    const {email, phone, gender, avatar, user_ID, avatarV} = user
    const lists = [
      {
        key: "email",
        extra: email,
        text: "邮箱",
        value: email,
      },
      {
        key: "phone",
        extra: phone,
        text: "手机",
        value: phone,
      },
    ]

    return (
      !updatingUser ?
        <View>
          <List renderHeader={() => '常规设置'}>
            <Item
              extra={<View style={{
                width: radius * 2,
                height: radius * 2,
                borderRadius: radius,
                backgroundColor: "white",
                alignItems: "center",
                justifyContent: "center"
              }}>
                <Image style={{width: radius * 2 - 2, height: radius * 2 - 2, borderRadius: radius - 1}}
                       source={{uri: `${URL}/user/avatar/${user_ID}.jpeg?${avatarV}`}}
                       // source={avatar ? {uri: avatar} : objectIdToImg(user._id)}
                />
              </View>}
              onClick={this.handleChangeAvatar}>
              更换头像
            </Item>

            <Item thumb="https://zos.alipayobjects.com/rmsportal/dNuvNrtqUztHCwM.png"
                  extra={genderDic[String(gender)]}
                  onClick={() => operation([
                    {
                      text: '女', onPress: () => this.props.dispatch({
                        type: "app/updateUser",
                        payload: {
                          gender: 0
                        }
                      })
                    },
                    {
                      text: '男', onPress: () => this.props.dispatch({
                        type: "app/updateUser",
                        payload: {
                          gender: 1
                        }
                      })
                    },
                    {
                      text: '保密', onPress: () => this.props.dispatch({
                        type: "app/updateUser",
                        payload: {
                          gender: 2
                        }
                      })
                    },
                  ])}
            >
              性别
            </Item>
          </List>

          <List renderHeader={() => '账号与安全'}>
            {lists.map((item) =>
              <Item thumb="https://zos.alipayobjects.com/rmsportal/dNuvNrtqUztHCwM.png"
                    extra={item.extra}
                    key={item.key}
                    onClick={() => prompt(item.text, '修改', [
                      {text: '取消'},
                      {text: '确定', onPress: value => this.updateUser(item.key, value)},
                    ], 'default', item.value)}
              >
                {item.text}
              </Item>)}
          </List>
          <List>
            <View style={{height: 50}}/>
            {
              login && <Item
                style={styles.logout}
                onClick={this.logout}
              >
                <Text style={styles.logout_text}>退出登录</Text>
              </Item>
            }
          </List>
        </View> : <ActivityIndicator animating/>
    )
  }
}

const styles = StyleSheet.create({
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
