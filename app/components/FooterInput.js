import React, {Component} from 'react'
import {TouchableOpacity, Text, View, Image} from 'react-native'
import {Button} from 'antd-mobile'
// import {Speech} from './Speech/SpeechBase'
import {Speech} from './Speech/index'

export class FooterInput extends Component {
  state = {
    type: "speech",
    result: ""
  }

  render() {
    return (
      <View style={{
        height: 90, flexDirection: 'row',
        alignItems: "center", justifyContent: 'center', flex: 1
      }}>

        <TouchableOpacity
          onPress={this.props.toggleInputType}
          style={{margin: 10, justifyContent: "center", alignItems: "center"}}
        >
          <Image
            style={{width: 25, height: 25, tintColor: '#A7A8AA', justifyContent: "center", alignItems: "center"}}
            source={require('../images/icons/keyboard.png')}
          />

          <Text style={{marginTop: 5, color: '#A7A8AA'}}>
            键盘
          </Text>

        </TouchableOpacity>


        <View style={{margin: 10, width: "40%", justifyContent: "center", alignItems: "center"}}>
          <Speech
            setResult={(result) => {
              console.log("final_result", result)
              this.props.sendSpeechResult(result)
            }}
          />
        </View>


        <TouchableOpacity
          style={{margin: 10, justifyContent: "center", alignItems: "center"}}
        >
          <Image
            style={{width: 20, height: 20, tintColor: '#A7A8AA', justifyContent: "center", alignItems: "center"}}
            source={require('../images/icons/category.png')}
          />

          <Text style={{marginTop: 5, color: '#A7A8AA'}}>
            分类
          </Text>
        </TouchableOpacity>
      </View>
    )
  }
}
