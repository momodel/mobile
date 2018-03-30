import React, {Component} from 'react'
import {StyleSheet, View, Image, Text, ImageBackground} from 'react-native'
import {connect} from 'react-redux'
import {List} from 'antd-mobile'
import {Modal, Button, WingBlank, WhiteSpace, Toast} from 'antd-mobile'

const prompt = Modal.prompt
const operation = Modal.operation;
const Item = List.Item


// const lists = [{
//   key: "email",
//   text: "邮箱"
// }]
@connect(({app}) => ({...app}))
export default class UserInfo extends Component {

  componentDidMount(){
    this.props.dispatch({
      type: "app/getUserInfo",
      payload: {
        user_ID: this.props.username}
    })
  }

  updateUser = (key, value) => {
    // update email

    this.props.dispatch({
      type: "app/updateUser",
      payload: {
        [key]: value
      }
    })
  }




  render() {
    const {username, login, user = {}} = this.props
    // const {email, phone, gender} = login.response.user
    const {email, phone, gender} = user
    console.log("this.props", this.props)

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
      // {
      //   key: "gender",
      //   extra: gender === 1 ? "男" : "女",
      //   text: "性别",
      //   value: gender,
      // }
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

        {/*<Item thumb="https://zos.alipayobjects.com/rmsportal/dNuvNrtqUztHCwM.png"*/}
              {/*extra={email}*/}

              {/*onClick={() => prompt('defaultValue', 'defaultValue for prompt', [*/}
                {/*{text: 'Cancel'},*/}
                {/*{text: 'Submit', onPress: value => this.updateUser('email', value)},*/}
              {/*], 'default', email)}*/}
        {/*>*/}
          {/*邮箱*/}
        {/*</Item>*/}

        {/*<Item thumb="https://zos.alipayobjects.com/rmsportal/dNuvNrtqUztHCwM.png"*/}
              {/*extra={phone}*/}
              {/*onClick={() => prompt('defaultVlue', 'defaultValue for prompt', [*/}
                {/*{text: 'Cancel'},*/}
                {/*{text: 'Submit', onPress: value => this.updateUser('phone', value)},*/}
              {/*], 'default', phone)}*/}
        {/*>*/}
          {/*手机*/}
        {/*</Item>*/}

        <Item thumb="https://zos.alipayobjects.com/rmsportal/dNuvNrtqUztHCwM.png"
              extra={gender === 1 ? "男" : "女"}
              onClick={() => operation([
                { text: '男', onPress: () => this.props.dispatch({
                  type: "app/updateUser",
                  payload: {
                    gender: 1
                  }
                }) },
                { text: '女', onPress: () => this.props.dispatch({
                  type: "app/updateUser",
                  payload: {
                    gender: 0
                  }
                })  },
              ])}

              // onClick={() => prompt('defaultValue', 'defaultValue for prompt', [
              //   {text: 'Cancel'},
              //   {text: 'Submit', onPress: value => this.updateUser('gender', value)},
              // ], 'default', gender)}
        >
          性别
        </Item>

      </List>
    )
  }

}
