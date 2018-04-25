import React, {Component} from 'react'
import {
  StyleSheet,
  Text,
  View,
  Image,
  AppRegistry,
  TouchableHighlight,
  TouchableOpacity,
  Dimensions
} from 'react-native'

import Voice from 'react-native-voice'
import {SpeechContainer} from './SpeechBase'

export default class IosSpeech extends Component {
  constructor(props) {
    super(props)
    this.state = {
      recognized: '',
      pitch: '',
      error: '',
      end: '',
      started: '',
      results: [],
      partialResults: [],

      isEnd: false,
      modal1: false,
    }
    Voice.onSpeechStart = this.onSpeechStart.bind(this)
    Voice.onSpeechRecognized = this.onSpeechRecognized.bind(this)
    Voice.onSpeechEnd = this.onSpeechEnd.bind(this)
    Voice.onSpeechError = this.onSpeechError.bind(this)
    Voice.onSpeechResults = this.onSpeechResults.bind(this)
    Voice.onSpeechPartialResults = this.onSpeechPartialResults.bind(this)
    Voice.onSpeechVolumeChanged = this.onSpeechVolumeChanged.bind(this)
    // this.setOuterResult = this.setOuterResult.bind(this)
  }

  componentWillUnmount() {
    Voice.destroy().then(Voice.removeAllListeners)
  }


  onSpeechStart(e) {
    this.setState({
      started: '√',
    })
  }

  onSpeechRecognized(e) {
    this.setState({
      recognized: '√',
    })
  }

  onSpeechEnd(e) {
    this.setState({
      end: '√',
    })
  }

  onSpeechError(e) {
    this.setState({
      error: JSON.stringify(e.error),
    })
  }

  onSpeechResults(e) {
    if (this.state.isEnd) {
      this.setState({
        isEnd: false
      })

      this.props.setResult(e.value[0])
    }
  }

  onSpeechPartialResults(e) {
    this.setState({
      partialResults: e.value,
    })
  }

  onSpeechVolumeChanged(e) {
    this.setState({
      pitch: e.value,
    })
  }

  async _startRecognizing(e) {
    this.setState({
      recognized: '',
      pitch: '',
      error: '',
      started: '',
      results: [],
      partialResults: [],
      end: '',
      isEnd: false,
      modal1: true,
    })
    try {
      await Voice.start('zh-CN')
    } catch (e) {
      console.error(e)
    }
  }

  async _stopRecognizing(e) {
    this.setState({isEnd: true, modal1: false})
    try {
      await Voice.stop()
    } catch (e) {
      console.error(e)
    }
  }

  setOuterResult() {
    this.props.setResult(this.state.results[0])
  }

  async _cancelRecognizing(e) {
    try {
      await Voice.cancel()
    } catch (e) {
      console.error(e)
    }
  }

  async _destroyRecognizer(e) {
    try {
      await Voice.destroy()
    } catch (e) {
      console.error(e)
    }
    this.setState({
      recognized: '',
      pitch: '',
      error: '',
      started: '',
      results: [],
      partialResults: [],
      end: ''
    })
  }

  render() {
    return <SpeechContainer
      onPressIn={this._startRecognizing.bind(this)}
      onPressOut={this._stopRecognizing.bind(this)}
    />
  }
}
