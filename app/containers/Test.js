import React, {Component} from 'react'
import ImagePicker from 'react-native-image-picker'
import {View, Text, TouchableOpacity, Image, ImageBackground} from 'react-native'
import {Icon} from 'antd-mobile'
import ImageContainer from "../package/rn-chatbot/lib/steps/text/ImageContainer"

var options = {
  title: '选择图片',
  customButtons: [
    {name: 'fb', title: 'Choose Photo from Facebook'},
  ],
  storageOptions: {
    skipBackup: true,
    path: 'images'
  }
}


export default class ImagePickerExample extends React.Component {
  state = {
    response: ""
  }

  onClick = () => {
    console.log("onClick")
    ImagePicker.showImagePicker(options, (response) => {
      console.log('Response = ', response)

      if (response.didCancel) {
        console.log('User cancelled image picker')
      }
      else if (response.error) {
        console.log('ImagePicker Error: ', response.error)
      }
      else if (response.customButton) {
        console.log('User tapped custom button: ', response.customButton)
      }
      else {
        this.setState({
          response
        })
        // let source = {uri: response.uri}

        // You can also display the image using data:
        // let source = { uri: 'data:image/jpeg;base64,' + response.data };

        // this.setState({
        //   avatarSource: source
        // })
      }
    })
  }

  onSegChange = (e) => {
    const index = e.nativeEvent.selectedSegmentIndex
    this.setState({
      multiple: index === 1,
    })
  }

  _onDeleteImagePressed = () => {
    this.setState({
      response: ""
    })
  }

  render() {
    const {response} = this.state
    return (
      <View>

        {
          response ?

            <ImageBackground
              // key={`resizeImage${i}`}
              source={{uri: response.uri}}
              style={{ width: 100,
                height: 100,
                marginBottom: 30,}}
            >
              <TouchableOpacity
                underlayColor="#ffa456"
                // activeOpacity={0.9}
                // style={{ borderRadius: 8,padding: 6,marginTop:5}}
                style={{
                  backgroundColor: 'transparent',
                  opacity: 0.5,
                  justifyContent: 'flex-end',
                  alignItems: 'flex-end',
                }}
                onPress={
                  this._onDeleteImagePressed
                }
              >
                <Icon type="cross" size="md" color="white" />
              </TouchableOpacity>
            </ImageBackground>
            :
            < TouchableOpacity
              onPress={this.onClick}
              style={{
                width: 100, height: 100,
                justifyContent:"center",
                alignItems: "center",
                // boxSizing: "border-box",
                // borderRadius: 3,
                // border: "1pX solid #ddd",
                backgroundColor: "#fff",
              }}
            >
              <Image style={{width: 50, height: 50}} source={require("../images/icons/add.png")}/>
            </TouchableOpacity>

        }


      </View>
    )
  }
}
