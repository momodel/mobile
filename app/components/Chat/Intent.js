import React, {Component} from 'react'

import {WebChatId, optionStep} from './WebChat'
import {getIntent} from "../../services/chat"

export default class Intent extends Component {
  constructor(props) {
    super(props)

    this.state = {
      apiList: null,
      displayText: null,
    }
  }

  componentWillMount() {
    console.log('intent')
    const {steps} = this.props
    const keyWord = steps[WebChatId.message.input].value
    // 将关键字发往后端，得到反馈
    const result = getIntent({
      content: keyWord,
      IntentList: optionStep.options,
      onSuccess: (res) => {
        const {type, message, trigger} = res.response
        console.log("res", res)
        if(type==="tuling"){
          // 调用图灵机器人回答
          this.props.triggerNextStep({trigger: "custom_message", value: message})
        }
        if(type === 'intent'){
          // 跳转对应功能
          console.log("this.props", this.props)
          this.props.triggerNextStep({trigger: trigger})
        }
      },
      onError: res => {
        this.props.triggerNextStep({trigger: "custom_message", value: "网络出错了"})
        console.log('res2', res)
      }
    })
  }

  render() {
    return null
  }
}
