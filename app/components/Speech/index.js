import React, {Component} from "react"
import { View, Text, Platform } from "react-native"

import AndroidSpeech from './AndroidSpeech'
import IosSpeech from './IosSpeech'

export class Speech extends Component {
  render() {
    if (Platform.OS === 'android') {
      return <AndroidSpeech {...this.props} />
    } else if (Platform.OS === 'ios') {
      return <IosSpeech {...this.props}/>
    }
  }
}
