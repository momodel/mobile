import React, { Component } from 'react'

import { WebChatId } from './WebChat'

export default class Intent extends Component {
  constructor(props) {
    super(props)

    this.state = {
      apiList: null,
      displayText: null,
      // result: false
    }
  }

  componentWillMount() {
    console.log('intent')
    const { steps } = this.props
    const keyWord = steps[WebChatId.message.input].value

    // 将关键字发往后端，得到反馈

    if (keyWord === '使用平台服务') {
      // 意图识别后前往其他页面
      console.log('keyWord', keyWord)
      this.props.triggerNextStep({ trigger: WebChatId.requirement.text })
    } else {
      // 无法识别
      this.props.triggerNextStep({ trigger: WebChatId.requirement.hello })
    }
  }

  render() {
    return null
  }
}
