import React, { Component } from "react";
import {
  AppRegistry, StyleSheet, View, TextInput, ToastAndroid,
  DeviceEventEmitter, Platform, NativeEventEmitter, TouchableOpacity,
  Text, Dimensions, Image
} from "react-native"
import { Recognizer, Synthesizer, SpeechConstant } from "react-native-speech-iflytek";
import {Modal} from 'antd-mobile'
const {width, height} = Dimensions.get('window')
import {SpeechContainer} from './SpeechBase'

export default class AndroidSpeech extends Component {
  constructor(props) {
    super(props);
    if (Platform.OS === 'android') {
      Synthesizer.init("57c7c5b0");
      Recognizer.init("57c7c5b0");
    } else if (Platform.OS === 'ios') {
      Synthesizer.init("59a4161e");
      Recognizer.init("59a4161e");
    }

    this.state = {
      text: "",

      end: false
    };

    this.onRecordStart = this.onRecordStart.bind(this);
    this.onRecordEnd = this.onRecordEnd.bind(this);
    this.onRecordCancel = this.onRecordCancel.bind(this);
    this.onRecognizerResult = this.onRecognizerResult.bind(this);
    this.onRecognizerError = this.onRecognizerError.bind(this);
    this.onRecognizerVolumeChanged = this.onRecognizerVolumeChanged.bind(this);
    this.onSyntheBtnPress = this.onSyntheBtnPress.bind(this);
  }


  componentDidMount() {
    this.recognizerEventEmitter = new NativeEventEmitter(Recognizer);
    this.recognizerEventEmitter.addListener('onRecognizerResult', this.onRecognizerResult)
    this.recognizerEventEmitter.addListener('onRecognizerError', this.onRecognizerError)
    this.recognizerEventEmitter.addListener('onRecognizerVolumeChanged', this.onRecognizerVolumeChanged)
    this.synthesizerEventEmitter = new NativeEventEmitter(Synthesizer);
    this.synthesizerEventEmitter.addListener('onSynthesizerSpeakCompletedEvent', this.onSynthesizerSpeakCompletedEvent);
    this.synthesizerEventEmitter.addListener('onSynthesizerBufferCompletedEvent', this.onSynthesizerBufferCompletedEvent);
  }

  componentWillUnmount() {
    this.recognizerEventEmitter.removeAllListeners('onRecognizerResult');
    this.recognizerEventEmitter.removeAllListeners('onRecognizerError');
    this.recognizerEventEmitter.removeAllListeners('onRecognizerVolumeChanged');
    this.synthesizerEventEmitter.removeAllListeners('onSynthesizerSpeakCompletedEvent');
    this.synthesizerEventEmitter.removeAllListeners('onSynthesizerBufferCompletedEvent');
  }

  onRecordStart() {
    console.log("start")
    Recognizer.start();
    this.setState({
      end: false
    })
  }

  onRecordEnd() {
    // 设置是否输出
    this.setState({
      end: true
    })
  }

  handlePressOut = () =>{
    Recognizer.stop();
  }

  onRecordCancel(evt) {
    // 设置flag, stop 不输出
    // setTimeout(() => {
    //   Recognizer.cancel();
    // }, 500);
  }

  onRecognizerResult(e) {
    console.log("onRecognizerResult", e)
    if (!e.isLast) {
      return;
    }
    if (!this.state.end){
      return;
    }
    this.setState({ text: e.result });
    this.props.setResult(e.result)
  }

  onRecognizerError(result) {
    if (result.errorCode !== 0) {
      alert(JSON.stringify(result));
    }
  }

  onRecognizerVolumeChanged() {
  }

  async onSyntheBtnPress() {
    Synthesizer.start(this.state.text);
  }

  onSynthesizerSpeakCompletedEvent(result) {
    alert('onSynthesizerSpeakCompletedEvent\n\n' + JSON.stringify(result));
  }

  onSynthesizerBufferCompletedEvent(result) {
    // alert('onSynthesizerBufferCompletedEvent\n\n' + JSON.stringify(result));
  }

  render() {
    return <SpeechContainer
      onPressIn={this.onRecordStart}
      onPressOut={this.handlePressOut}
      onPress={this.onRecordEnd}
    />
  }
}

