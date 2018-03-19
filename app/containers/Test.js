import React, {Component} from 'react'
import {StyleSheet, View, Image, Text, TouchableHighlight} from 'react-native'

import t from 'tcomb-form-native'
// let t = require('tcomb-form-native')

import {connect} from 'react-redux'
import _ from 'lodash'
// import {RequestHeader} from "../components/RequestHeader"
let Form = t.form.Form



// const options = {
//   // label: 'My struct label', // <= form legend, displayed before the fields
//   // fields: {
//   //   DayofMonth: {
//   //     placeholder: 'My name label', // <= label for the name field
//   //     help: 'Your help message here',
//   //     error: 'Insert a valid email'
//   //   }
//   // }
// }

@connect(({app}) => ({...app}))
export default class Test extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: {}
    }
  }
  onPress = () => {
    // call getValue() to get the values of the form
    var value = this.refs.form.getValue()
    if (value) { // if validation fails, value will be null
      console.log(value) // value here is an instance of Person
      this.clearForm();
    }
  }

  onChange = (value) => {
    this.setState({ value });
  }

  clearForm() {
    // clear content from all textbox
    this.setState({ value: null });
  }

  render() {
    const {args} = this.props

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
          // error: 'Insert a valid email'
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
      <View style={styles.container}>
        {/* display */}
        <Form
          ref="form"
          type={Type}
          options={options}
          value={this.state.value}
          onChange={this.onChange}

        />
        <TouchableHighlight style={styles.button} onPress={this.onPress} underlayColor='#99d9f4'>
          <Text style={styles.buttonText}>Save</Text>
        </TouchableHighlight>
      </View>
    )
  }
}

Test.defaultProps = {
  args: {
    "input": {
      "flight_delay_prediction_param_1": {
        placeholder:"aaaa",
        "default": null,
        "des": "",
        "name": "DayofMonth",
        "range": null,
        "required": false,
        "type": "input",
        "value": null,
        "value_type": "int"
      },
      "flight_delay_prediction_param_2": {
        "default": null,
        "des": "",
        "name": "DayofMonth221",
        "range": null,
        "required": true,
        "type": "input",
        "value": null,
        "value_type": "str"
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
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    // marginTop: 50,
    padding: 20,
    backgroundColor: '#ffffff',
  },
  title: {
    fontSize: 30,
    alignSelf: 'center',
    marginBottom: 30
  },
  buttonText: {
    fontSize: 18,
    color: 'white',
    alignSelf: 'center'
  },
  button: {
    height: 36,
    backgroundColor: '#48BBEC',
    borderColor: '#48BBEC',
    borderWidth: 1,
    borderRadius: 8,
    marginBottom: 10,
    alignSelf: 'stretch',
    justifyContent: 'center'
  }
})
