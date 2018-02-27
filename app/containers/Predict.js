import React, {Component} from 'react'
import {StyleSheet, View, Image, Text} from 'react-native'
import {connect} from 'react-redux'
import {InputItem, Button, List, DatePicker} from 'antd-mobile'

import _ from "lodash"

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
      // date_time: null
    }
  }

  onSubmit = () => {
    console.log("this.state", this.state)
    const api = {
      api_id: this.props._id,
      input: this.props.input
    }
    // 把state中的值赋给api
    for(let key in api.input.body){
      if (api.input.body.hasOwnProperty(key)) {
        api.input.body[key].value = this.state[key]
      }
    }


    this.props.dispatch({
      type: "api/runApi",
      payload: {
        api
      }
    })
  }

  render() {
    // Todo 结果可能不是文字，而是一个json, 最多2层 loop一下就好
    const {input, api_response="结果"} = {
      "input": {
        "body": {
          "date_time": {
            "type": "datetime",
            "value": null
          },
          "flight_no": {
            "type": "str",
            "value": null
          }
        }
      }
    }


    return (
      <View style={styles.container}>
        <View style={styles.bg}>
          <List>

            {_.map(input.body, (value, key) => {

                if (value.type === "datetime") {
                  return <DatePicker
                    value={this.state[key]}
                    key={key}
                    onChange={date => this.setState({[key]: date,})}
                  >
                    <List.Item arrow="horizontal">Datetime</List.Item>
                  </DatePicker>

                }
                return <InputItem
                  type={python_type_to_antd[value.type]}
                  // placeholder="186 1234 1234"
                  onChange={v => {
                    this.setState({
                      [key]: v,
                    })
                  }}
                  key={key}
                  // autoCapitalize="none"
                  // value={this.state[key]}
                >
                  {key}
                </InputItem>
              }
            )}

          </List>

          <Button
            // style={styles.btn}
            onClick={this.onSubmit}
          >
            提交
          </Button>
        </View>
        <View style={{justifyContent:"center", alignItems:"center"}}>
          <Text>
            {api_response}
          </Text>
        </View>

      </View>
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

  // bg: {
  //   flex: 1,
  //   marginTop: 500 / 3,
  //   paddingTop: 20,
  //   paddingLeft: 50,
  //   paddingRight: 50,
  //   paddingBottom: 30,
  //   bottom: 0,
  // },
  // input: {
  //   marginBottom: 20,
  // },
})
