import React, {Component} from 'react'
import {StyleSheet, View, Image, Text, ImageBackground} from 'react-native'
import {connect} from 'react-redux'
import {List} from 'antd-mobile'
import {Modal, Button, WingBlank, WhiteSpace, Toast} from 'antd-mobile'
import {createAction} from "../utils"

const prompt = Modal.prompt
const operation = Modal.operation
const Item = List.Item

const genderDic = {
  '1': '男',
  '0': '女',
  '2': '保密'
}

@connect(({app}) => ({...app}))
export default class UserInfo extends Component {

  componentDidMount() {
    this.props.dispatch({
      type: "app/getUserInfo",
      payload: {
        user_ID: this.props.username
      }
    })
  }

  updateUser = (key, value) => {
    this.props.dispatch({
      type: "app/updateUser",
      payload: {
        [key]: value
      }
    })
  }

  logout = () => {
    this.props.dispatch(createAction('app/logout')())
  }

  render() {
    const {login, user = {}} = this.props
    const {email, phone, gender} = user
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
      <List>
        <Item thumb="https://zos.alipayobjects.com/rmsportal/dNuvNrtqUztHCwM.png"
              onClick={() => {
              }}>
          头像
        </Item>

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
