import React, {Component} from 'react'
// import { connect } from 'dva'
import {View, Text, StyleSheet} from 'react-native'
import {List, InputItem, Button, Toast, TouchableOpacity} from 'antd-mobile'
import {WebChatId} from './WebChat'
import {connect} from 'react-redux'

import {createNewUserRequest} from "../../services/userRequest"
import {NavigationActions} from "../../utils"

@connect(({app}) => ({...app}))
export default class CreateUserRequest extends Component {
  constructor(props) {
    super(props)
    this.state = {
      requestTitle: null,
      requestDescription: null,

      submitSuccess: false,
      request: null
      // requestDataset: values['requestDataset'],
      // requestInput: values['requestInput'],
      // requestOutput: values['requestOutput'],
      // requestTags: values['requestTags'],
      // requestCategory: values['requestCategory'],

    }
  }

  submit = () => {
    // 不能使用dispatch 直接调用service
    createNewUserRequest({
      requestTitle: this.state['requestTitle'],
      requestDescription: this.state['requestDescription'],
      user_ID: this.props.username,
      type: this.props.type,
      onSuccess: (res) => {
        console.log("res", res)
        this.setState({
          submitSuccess: true,
          request: res.response
        })

      },
      onError: (res) => {
        console.log("res1", res)
        Toast.fail("提交失败")
      }
    })
  }


  render() {
    return (
      this.state.submitSuccess ?
        <View style={[styles.bubble]}>
          {/*<TouchableOpacity onPress={}>*/}
          <Text style={{ fontSize: 15}} onPress={
            () => {
              this.props.dispatch(NavigationActions.navigate({
                routeName: "Request", params: {request: this.state.request}
              }))
            }
          }>
            <Text >你的需求 {this.state.request.name} 已成功发布， 你可以在我的-需求补充完整~ ，</Text>
            <Text style={{color: "#6798F6",}}>轻触前往需求</Text>

          </Text>
          {/*</TouchableOpacity>*/}

        </View> :
        <View style={styles.cardContainer}>
          <View>
            <List>
              <InputItem
                clear
                placeholder="填写标题"
                onChangeText={text => this.setState({requestTitle: text})}
              >需求标题</InputItem>

              <InputItem
                // type={type}
                placeholder="需求描述"
                onChangeText={text => this.setState({requestDescription: text})}
              >需求描述</InputItem>
            </List>

            <Button type="primary" onClick={this.submit}>
              提交
            </Button>
          </View>
        </View>


    )

  }

}
const styles = StyleSheet.create({
  cardContainer: {
    paddingTop: 10,
    paddingBottom: 10,
    padding: 3,
    backgroundColor: 'white',
    margin: 8,
    borderRadius: 8,
    shadowColor: 'grey',
    shadowOffset: {h: 2, w: 2},
    shadowRadius: 8,
    shadowOpacity: 0.5,
  },
  bubble: {
    width: "60%",
    backgroundColor: "#F9F9F9",
    borderTopLeftRadius: 18,
    borderTopRightRadius: 18,
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: 18,

    paddingTop: 12,
    paddingBottom: 12,
    paddingLeft: 12,
    paddingRight: 12,
    minHeight: 42,

    shadowOffset: {h: 1, w: 1},
    shadowRadius: 2,
    shadowOpacity: 0.3,
  }

})
