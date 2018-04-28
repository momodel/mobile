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


const {width, height} = Dimensions.get('window')

export class SpeechContainer extends Component {
  state = {
    modal: false
  }

  render() {
    return (
      <View>
        {/*<TouchableOpacity*/}
        {/*onPressOut={() => {*/}
        {/*console.log("in onPressOut")*/}
        {/*}}*/}

        {/*onPressIn={() => {*/}
        {/*console.log("in onPressIn")*/}
        {/*}}*/}

        {/*onPress={()=>{*/}
        {/*console.log("in onPress")*/}
        {/*}}*/}
        {/*>*/}
        {/**/}
        {/*</TouchableOpacity>*/}

        <TouchableOpacity
          onPressIn={() => {
            console.log("onPressIn")
            this.props.onPressIn()
            this.setState({modal: true})
          }}
          onPressOut={() => {
            console.log("onPressOut")
            this.props.onPressOut()
            this.setState({modal: false})
          }}
          onPress={() => {
            console.log("onPress")
            this.props.onPress()
          }}
          // pressRetentionOffset={{top: 100, left: 100, bottom: 100, right: 100}}
        >
          <Image
            style={styles.button}
            source={require('../../images/icons/microphone.png')}
          />
        </TouchableOpacity>
        <Modal
          visible={this.state.modal}
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
          title="松开发送 上滑取消"
        >
          <View
            style={{justifyContent: 'center', alignItems: 'center'}}
          >
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

