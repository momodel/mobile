/**
 * TODO 尝试这个库使用form改写表单 https://github.com/gcanti/tcomb-form-native
 * 示例写在Test里面
 */
import React, {Component} from 'react'
import {StyleSheet, View, Image, Text, ScrollView, Dimensions} from 'react-native'
import {connect} from 'react-redux'
import {InputItem, Button, List, DatePicker, ActivityIndicator} from 'antd-mobile'
import t from 'tcomb-form-native'
import _ from "lodash"
import {py_type_to_antd_components} from '../Global'

const {height, width} = Dimensions.get('window')
const Form = t.form.Form

const dict = {
  'int': 'Number',
  'str': 'String',
  'datetime': 'Date'
}

@connect(({api}) => ({...api}))
export default class Predict extends Component {
  constructor(props) {
    super(props)
    this.state = {
      value: {}
    }
    this.setContentRef = this.setContentRef.bind(this)
    this.onContentSizeChange = this.onContentSizeChange.bind(this)
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

      const app = {
        input: value
      }

      // const app = {
      //   "input": {
      //     "flight_no": 111, "flight_date": 111
      //   }
      // }

      this.props.dispatch({
        type: "api/runApi",
        payload: {
          app_id: this.props.app._id,
          app
        }
      })
      this.clearForm();
    }
  }

  onChange = (value) => {
    this.setState({ value });
  }

  clearForm() {
    this.setState({ value: null });
  }

  render() {
    const {app: {args}, api_response, fetch_api_response} = this.props

    // 生成样式内容
    let typeJson = {}
    let fieldsJson = {}
    for (let key in args.input) {
      if (args.input.hasOwnProperty(key)) {
        if (args.input[key].required === false) {
          typeJson[args.input[key].name] = t.maybe(t[(dict[args.input[key].value_type])])
        }
        else {
          typeJson[args.input[key].name] = t[dict[args.input[key].value_type]]
        }

        fieldsJson[args.input[key].name] = {
          placeholder: args.input[key].placeholder,
          help: args.input[key].help,
          error: `need type: ${args.input[key].value_type}`
        }
      }
    }
    let Type = t.struct(
      typeJson
    )
    let options = {
      fields: fieldsJson
    }

    return (
      <ScrollView
        style={styles.container}
        keyboardShouldPersistTaps="always"
        ref={this.setContentRef}
        onContentSizeChange={this.onContentSizeChange}
      >
        <Form
          ref="form"
          type={Type}
          options={options}
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
