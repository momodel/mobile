import React, { Component } from 'react'
// import { connect } from 'dva'
import { View, Text } from 'react-native'

import { WebChatId } from './WebChat'

export default class Asking extends Component {
  constructor(props) {
    super(props)
    this.state = {
      displayText: null,
    }
  }

  componentWillMount() {
    // 提问 api
    const { [WebChatId.asking.input]: { value } } = this.props.steps
    const { user_ID } = this.props.login.user
    //fetch
    fetch(`/pyapi/user_request`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        request_title: value,
        user_id: user_ID,
      }),
    })
      .then(response => {
        if (response.status >= 200 && response.status < 300) {
          return response.json()
        }
      })
      .then(({ response }) => {
        console.log('/api/user_request response', response)
        this.setState(
          {
            displayText: '提问成功',
          },
          () =>
            this.props.triggerNextStep({
              trigger: WebChatId.functionSelect.text,
            })
        )
      })
      .catch(() => {
        console.log('error')
        // 网络出错，重新输入
        this.setState(
          {
            displayText: '请求出错了',
          },
          () =>
            this.props.triggerNextStep({
              trigger: WebChatId.functionSelect.text,
            })
        )
      })
  }

  render() {
    // const {show_api_detail: {value}} = this.props.steps
    return (
      <View>
        <Text>{this.state.displayText && this.state.displayText}</Text>
      </View>
    )
  }
}

// export default connect(({ login }) => ({ login }))(Asking)
