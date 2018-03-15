import React, {Component} from 'react'
import {StyleSheet, View, Image, Text, ScrollView, Dimensions} from 'react-native'
import {connect} from 'react-redux'
import {InputItem, Button, List, DatePicker} from 'antd-mobile'

import _ from "lodash"

const { height, width } = Dimensions.get('window')

const python_type_to_antd = {
  "datetime": "datetime",
  "str": "text",
  "int": "number",
  "float": "digit"
}


@connect(({api}) => ({...api}))
export default class Predict extends Component {
  constructor(props) {
    super(props)
    this.state = {
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
    console.log("this.state", this.state)

    // const app = {
    //   input: this.state
    // }
    const app = {
    "input": {
      "flight_no": 111, "flight_date": 111
    }
    }

    this.props.dispatch({
      type: "api/runApi",
      payload: {
        app_id: this.props.app._id,
        app
      }
    })

  }

  render() {
    const {app: {args}, api_response} = this.props
    return (
      <ScrollView
        style={styles.container}
        keyboardShouldPersistTaps="always"
        ref={this.setContentRef}
        onContentSizeChange={this.onContentSizeChange}

      >
        <View >
          <Text>输入</Text>
          <List>
            {_.map(args.input, (value, key) => {

                if (value.value_type === "datetime") {
                  return <DatePicker
                    value={this.state[key]}
                    key={key}
                    onChange={date => this.setState({[key]: date,})}
                  >
                    <List.Item arrow="horizontal">Datetime</List.Item>
                  </DatePicker>

                }
                return <InputItem
                  type={python_type_to_antd[value.value_type]}
                  placeholder={key}
                  onChange={v => {
                    this.setState({
                      [key]: v,
                    })
                  }}
                  key={key}
                  // autoCapitalize="none"
                  // value={this.state[key]}
                />

              }
            )}

          </List>

          {/*<List>*/}
            {/*{_.map(input.body, (value, key) => {*/}

                {/*if (value.type === "datetime") {*/}
                  {/*return <DatePicker*/}
                    {/*value={this.state[key]}*/}
                    {/*key={key}*/}
                    {/*onChange={date => this.setState({[key]: date,})}*/}
                  {/*>*/}
                    {/*<List.Item arrow="horizontal">Datetime</List.Item>*/}
                  {/*</DatePicker>*/}

                {/*}*/}
                {/*return <InputItem*/}
                  {/*type={python_type_to_antd[value.type]}*/}
                  {/*// placeholder="186 1234 1234"*/}
                  {/*onChange={v => {*/}
                    {/*this.setState({*/}
                      {/*[key]: v,*/}
                    {/*})*/}
                  {/*}}*/}
                  {/*key={key}*/}
                  {/*// autoCapitalize="none"*/}
                  {/*// value={this.state[key]}*/}
                {/*>*/}
                  {/*{key}*/}
                {/*</InputItem>*/}
              {/*}*/}
            {/*)}*/}

          {/*</List>*/}

          <Button

            onClick={this.onSubmit}
          >
            提交
          </Button>
        </View>

        <Text>输出</Text>

        <View style={{justifyContent: "center", alignItems: "center"}}>
          {_.map(args.output, (value, key) => {
            return <Text key={key}>key: {key}</Text>
          })
          }
        </View>

        <View style={{justifyContent: "center", alignItems: "center"}}>
          {api_response&&api_response.map(e=><Text key={Math.random()}>{e}</Text>)}
        </View>

      </ScrollView>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // alignItems: 'center',
    // justifyContent: 'center',
  },
  icon: {
    width: 32,
    height: 32,
  },
})


Predict.defaultProps = {
  args: {
    "input": {
      "flight_delay_prediction_param_1": {
        "default": null,
        "des": "",
        "name": "DayofMonth,",
        "range": null,
        "required": false,
        "type": "input",
        "value": null,
        "value_type": "int"
      }
    },
    "output": {
      "flight_delay_prediction_flight_date": {
        "type": "str",
        "value": null
      },
      "flight_delay_prediction_flight_no": {
        "type": "int",
        "value": null
      },
      "weather_prediction_out1": {
        "type": "int",
        "value": null
      }
    }

  },
  api_response: []
}
