/**
 * TODO 尝试这个库使用form改写表单 https://github.com/gcanti/tcomb-form-native
 * 示例写在Test里面
 */
import React, {Component} from 'react'
import {StyleSheet, View, Image, Text, ScrollView,
  Dimensions, TextInput, ImageBackground, TouchableOpacity} from 'react-native'
import ImagePicker from 'react-native-image-picker'

import {connect} from 'react-redux'
import {InputItem, Button, List, DatePicker, ActivityIndicator, Icon} from 'antd-mobile'
import t from 'tcomb-form-native'
import _ from "lodash"
import {py_type_to_antd_components} from '../Global'

const {height, width} = Dimensions.get('window')
const Form = t.form.Form

const dict = {
  'int': 'String',
  'str': 'String',
  'datetime': 'Date'
}

const typeDict = {
  upload: "",
  input: ""
}

const options = {
  title: '选择图片',
  customButtons: [
    {name: 'fb', title: 'Choose Photo from Facebook'},
  ],
  storageOptions: {
    skipBackup: true,
    path: 'images'
  }
}

@connect(({api}) => ({...api}))
export default class Predict extends Component {
  constructor(props) {
    super(props)
    this.state = {
      value: {},
      image: {},
      imageLoading: {},

      Type: {},
      options: {},
    }
    this.setContentRef = this.setContentRef.bind(this)
    this.onContentSizeChange = this.onContentSizeChange.bind(this)
  }

  componentWillMount() {
    // 初始化 state
    const {app: {args}, api_response, fetch_api_response} = this.props

    let typeJson = {}
    let fieldsJson = {}
    let imageJson = {}
    for (let key in args.input) {
      if (args.input.hasOwnProperty(key)) {

        if (args.input[key].type === 'upload') {
          imageJson[args.input[key].name] = {...args.input[key]}
          continue
        }

        if (args.input[key].required === false) {
          typeJson[args.input[key].name] = t.maybe(t[(dict[args.input[key].value_type])])
        }
        else {
          typeJson[args.input[key].name] = t[dict[args.input[key].value_type]]
        }

        fieldsJson[args.input[key].name] = {
          placeholder: args.input[key].placeholder,
          help: `type: ${args.input[key].value_type}`,
          error: `need type: ${args.input[key].value_type}`,
          // label: `${args.input[key].name}(${args.input[key].value_type})`
        }
      }
    }
    let Type = t.struct(
      {
        ...typeJson,
      }
    )
    let options = {
      fields: {
        ...fieldsJson,
      }
    }
    this.setState({
      Type,
      options,
      image: imageJson
    })

  }

  setContentRef(c) {
    this.scrollView = c
  }

  onContentSizeChange(contentWidth, contentHeight) {
    if (contentHeight > height - 10) {
      this.scrollView.scrollToEnd()
    }
  }

  onSubmit = () => {
    // todo 将state传入app
    let value = this.refs.form.getValue()
    if (value) { // if validation fails, value will be null
      console.log(value) // value here is an instance of Person
      let imageKeyValue = {}
      if (this.state.image) {
        // 存进input里
        for (let key in this.state.image) {
          imageKeyValue[key] = this.state.image[key].file.data
        }
      }


      const app = {
        input: {...value, ...imageKeyValue}
      }


      this.props.dispatch({
        type: "api/runApi",
        payload: {
          app_id: this.props.app._id,
          app
        }
      })
      this.clearForm()
    }
  }

  onChange = (value) => {
    this.setState({value})
  }

  clearForm() {
    this.setState({value: null})
  }

  handleAddImage(imageKey) {
    let imageLoading = this.state.imageLoading
    imageLoading[imageKey] = true

    this.setState({
      imageLoading
    })
    ImagePicker.showImagePicker(options, (response) => {
      let imageLoading = this.state.imageLoading
      imageLoading[imageKey] = false
      this.setState({
        imageLoading
      })

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
        let image = this.state.image
        image[imageKey].file = response

        this.setState({
          image
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

  handleDeleteImage(imageKey) {
    let image = this.state.image
    image[imageKey].file = ''

    this.setState({
      image
    })
  }


  render() {
    const {app: {args}, api_response, fetch_api_response} = this.props

    // // 生成样式内容
    // let typeJson = {}
    // let fieldsJson = {}
    // this.imgDict = []
    // for (let key in args.input) {
    //   if (args.input.hasOwnProperty(key)) {
    //
    //     if (args.input[key].type === 'upload') {
    //       this.imgDict.push(args.input[key])
    //       continue
    //     }
    //
    //     if (args.input[key].required === false) {
    //       typeJson[args.input[key].name] = t.maybe(t[(dict[args.input[key].value_type])])
    //     }
    //     else {
    //       typeJson[args.input[key].name] = t[dict[args.input[key].value_type]]
    //     }
    //
    //     fieldsJson[args.input[key].name] = {
    //       placeholder: args.input[key].placeholder,
    //       help: `type: ${args.input[key].value_type}`,
    //       error: `need type: ${args.input[key].value_type}`,
    //       // label: `${args.input[key].name}(${args.input[key].value_type})`
    //     }
    //   }
    // }
    // let Type = t.struct(
    //   {
    //     ...typeJson,
    //     // img: t.String
    //   }
    // )
    // let options = {
    //   fields: {
    //     ...fieldsJson,
    //     // img: {
    //     //   template: myCustomTemplate
    //     // }
    //
    //   }
    // }

    return (
      <ScrollView
        style={styles.container}
        keyboardShouldPersistTaps="always"
        ref={this.setContentRef}
        onContentSizeChange={this.onContentSizeChange}
      >
        <Form
          ref="form"
          type={this.state.Type}
          options={this.state.options}
          value={this.state.value}
          onChange={this.onChange}
        />

        {/*<List>*/}
        {/*{*/}
        {/*_.map(args.input, (value, key) => {*/}
        {/*if (value.value_type === "datetime") {*/}
        {/*return <DatePicker*/}
        {/*value={this.state[key]}*/}
        {/*key={key}*/}
        {/*onChange={date => this.setState({*/}
        {/*form: {*/}
        {/*...this.state.form,*/}
        {/*[value.name]: v*/}
        {/*}*/}
        {/*})}*/}
        {/*>*/}
        {/*<List.Item arrow="horizontal">Datetime</List.Item>*/}
        {/*</DatePicker>*/}
        {/*}*/}
        {/*return <InputItem*/}
        {/*type={py_type_to_antd_components[value.value_type]}*/}
        {/*placeholder={value.name}*/}
        {/*onChange={v =>{*/}
        {/*this.setState({*/}
        {/*form: {*/}
        {/*...this.state.form,*/}
        {/*[value.name]: v*/}
        {/*}*/}
        {/*})*/}

        {/*// this.setState({*/}
        {/*//   [value.name]: v,*/}
        {/*// })*/}
        {/*}}*/}
        {/*key={key}*/}
        {/*/>*/}
        {/*}*/}
        {/*)}*/}
        {/*</List>*/}

        {
          _.map(this.state.image, (value, key) => {

            return (
              <View key={key}>

                {


                }
                <Text>{key}</Text>
                {
                  this.state.imageLoading[key]?<ActivityIndicator animating/>:
                    (
                  value.file ? <ImageBackground
                      // key={`resizeImage${i}`}
                      source={{uri: value.file.uri}}
                      style={{
                        width: 100,
                        height: 100,
                        marginBottom: 30,
                      }}
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
                          () => this.handleDeleteImage(key)
                        }
                      >
                        <Icon type="cross" size="md" color="white"/>
                      </TouchableOpacity>
                    </ImageBackground>
                    :
                    < TouchableOpacity
                      onPress={() => this.handleAddImage(key)}
                      style={{
                        width: 100, height: 100,
                        justifyContent: "center",
                        alignItems: "center",
                        // boxSizing: "border-box",
                        // borderRadius: 3,
                        // border: "1pX solid #ddd",
                        backgroundColor: "#fff",
                      }}
                    >
                      <Image style={{width: 50, height: 50}} source={require("../images/icons/add.png")}/>
                    </TouchableOpacity>
                    )
                }
              </View>
            )
          })
        }


        <Button
          type="primary"
          onClick={this.onSubmit}
          style={{marginTop: 20}}
        >
          提交
        </Button>


        {/*<Text>输出</Text>*/}
        {/*<View style={{justifyContent: "center", alignItems: "center"}}>*/}
        {/*{_.map(args.output, (value, key) => {*/}
        {/*return <Text key={key}>key: {key}</Text>*/}
        {/*})}*/}
        {/*</View>*/}

        {
          fetch_api_response ? <ActivityIndicator animating/> : (
            api_response &&
            _.map(api_response, (value, key) => {
              console.log("api_response", api_response)
              return (
                <ResultItem value={value} key={key} keyIn={key}/>
              )
            })
          )
        }
      </ScrollView>
    )
  }
}

const ResultItem = ({keyIn, value}) => {
  return (
    <View style={{display: "flex", justifyContent: 'center', marginTop: 10}}>
      <Text style={{fontSize: 20, color: "black"}}>
        {keyIn}:
      </Text>

      <View style={{
        backgroundColor: '#F5F5F5',
        padding: 10, display: "flex",
        alignItems: "center", justifyContent: 'center',
        marginTop: 5,
        height: 80
      }}>
        <Text style={{fontSize: 25, color: "#759DF2"}}>
          {value}
        </Text>
      </View>


    </View>
  )
}

function myCustomTemplate(locals) {

  var containerStyle = {}
  var labelStyle = {}
  var textboxStyle = {}

  return (
    <View style={containerStyle}>
      <Text style={labelStyle}>{locals.label}</Text>
      <TextInput style={textboxStyle}/>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    // margin: 5,
    backgroundColor: "white"
    // alignItems: 'center',
    // justifyContent: 'center',
  },

})


Predict.defaultProps = {
  // args: {
  //   "input": {
  //     "flight_delay_prediction_param_1": {
  //       "default": null,
  //       "des": "",
  //       "name": "DayofMonth,",
  //       "range": null,
  //       "required": false,
  //       "type": "input",
  //       "value": null,
  //       "value_type": "int"
  //     }
  //   },
  //   "output": {
  //     "flight_delay_prediction_flight_date": {
  //       "type": "str",
  //       "value": null
  //     },
  //     "flight_delay_prediction_flight_no": {
  //       "type": "int",
  //       "value": null
  //     },
  //     "weather_prediction_out1": {
  //       "type": "int",
  //       "value": null
  //     }
  //   }
  //
  // },
  api_response: []
}
