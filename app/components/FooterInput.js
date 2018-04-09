import React, {Component} from 'react'
import {TouchableOpacity, Text, View, Image} from 'react-native'
import {Button} from 'antd-mobile'
import {Speech} from './Speech'

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
            style={{width: 20, height: 20}}
            source={require('../images/icons/keyboard.png')}
          />
          <Text style={{marginTop:5}}>
            键盘
          </Text>
        </TouchableOpacity>


        <View style={{margin: 10, width: "40%", justifyContent: "center", alignItems: "center"}}>
          <Speech
            setResult={(result) => {
              if(result !== this.state.result){
                this.setState({result: result})
                this.props.sendSpeechResult(result)
              }
            }}
          />
        </View>


        <TouchableOpacity
          style={{margin: 10}}
        >
          <Image
            style={{width: 20, height: 20}}
            source={require('../images/icons/category.png')}
          />

          <Text style={{marginTop:5}}>
            分类
          </Text>
        </TouchableOpacity>
      </View>
    )
  }
}
