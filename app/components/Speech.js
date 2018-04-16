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

import {Modal} from 'antd-mobile'

import Voice from 'react-native-voice'

const {width, height} = Dimensions.get('window')

export class Speech extends Component {
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
    this.setState({
      results: e.value,
    })
    // if (this.state.isEnd) {
    //
    //   this.props.setResult(e.value[0])
    // }
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
    return (
      <View>
        <TouchableOpacity
          onPressIn={this._startRecognizing.bind(this)}
          onPressOut={() => {
            this._stopRecognizing.bind(this)
            // TODO 手机测试一下这样的新写法， 当松开是吧result给出去
            this.setOuterResult.bind(this)
          }
          }
        >
          <Image
            style={styles.button}
            source={require('../images/icons/microphone.png')}
          />
        </TouchableOpacity>
        <Modal
          visible={this.state.modal1}
          transparent
          maskClosable={false}
          style={{
            width: width,
            height: height,
            // backgroundColor: "transparent",
            // opacity: 0.1,
            backgroundColor: "rgba(255, 255, 255, 0.8)",
            alignItems: "center",
            justifyContent: "center"
          }}
          // onClose={this.onClose('modal1')}
          title="松开发送"
          // footer={[{ text: 'Ok', onPress: () => { console.log('ok'); this.onClose('modal1')(); } }]}
          // wrapProps={{ onTouchStart: this.onWrapTouchStart }}
        >
          <View style={{justifyContent: 'center', alignItems: 'center'}}>

            <Text style={styles.text}>语音助手</Text>
            <Text style={styles.text}>我要使用app</Text>
            <Text style={styles.text}>我要发布需求</Text>
            <Text style={styles.text}>我要查看我的收藏</Text>

          </View>
        </Modal>

      </View>
    )
  }
}

const styles = StyleSheet.create({
  button: {
    width: 80,
    height: 80,
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  action: {
    textAlign: 'center',
    color: '#0000FF',
    marginVertical: 5,
    fontWeight: 'bold',
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
  stat: {
    textAlign: 'center',
    color: '#B0171F',
    marginBottom: 1,
  },

  text: {
    margin: 10,
    padding: 5,
  }
})

