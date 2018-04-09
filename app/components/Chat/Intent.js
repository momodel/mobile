import React, {Component} from 'react'
import {View, Text} from 'react-native'
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
    const {steps} = this.props
    const keyWord = steps[WebChatId.message.input].value
    // 将关键字发往后端，得到反馈
    const result = getIntent({
      content: keyWord,
      IntentList: optionStep.options,
      onSuccess: (res) => {
        const {type, message, trigger} = res.response
        if(type==="tuling"){
          // 调用图灵机器人回答
          this.props.triggerNextStep({trigger: "custom_message", value: message})
        }
        if(type === 'intent'){
          // 跳转对应功能
          this.setState({
            displayText: message
          })
          // this.props.triggerNextStep({trigger: "custom_message_no_trigger",
          //   value: message})
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
    return <View>
      <Text>
        {this.state.displayText}
      </Text>
    </View>
  }
}
