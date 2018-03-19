import React, { Component } from 'react'
import { connect } from 'react-redux'
import {
  StyleSheet,
  View,
  Text,
  ActivityIndicator,
  Image,
  NativeAppEventEmitter,
  Alert,
  TouchableOpacity,
} from 'react-native'
import { InputItem, Button, List } from 'antd-mobile'

import Global from '../Global'

import { createAction, NavigationActions } from '../utils'

@connect(({ app }) => ({ ...app }))
class Register extends Component {
  constructor(props) {
    super(props)
    this.state = {
      phoneNumber: '',
      password: '',
    }
  }

  render() {

    return (
      <View style={styles.container}>
        {/*<View style={styles.icon}>*/}
        {/*<Image*/}
        {/*style={{height: 150, width: 150}}*/}
        {/*source={require('./../images/icon.png')}*/}
        {/*/>*/}
        {/*<Text style={styles.title}>MO</Text>*/}
        {/*</View>*/}

        <View style={styles.bg}>
          <List>
            <InputItem
              type="phone"
              placeholder="186 1234 1234"
              onChange={value => {
                this.setState({
                  phoneNumber: value,
                })
              }}
              // autoCapitalize="none"
              value={this.state.phoneNumber}
            >
              手机号码
            </InputItem>

            <InputItem
              type="password"
              placeholder="****"
              onChange={value => {
                this.setState({
                  password: value,
                })
              }}
              value={this.state.password}
            >
              密码
            </InputItem>
          </List>

          <Button
            style={styles.btn}
          >
            <Text style={{ color: 'white' }}>注册</Text>
          </Button>
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: '#FBFAFA',
  },
  icon: {
    top: 80,
    alignItems: 'center',
  },
  title: {
    marginTop: 20,
    fontSize: Global.titleFontSizeBigBig,
    color: Global.blue,
  },
  bg: {
    flex: 1,
    marginTop: 500 / 3,
    paddingTop: 20,
    paddingLeft: 50,
    paddingRight: 50,
    paddingBottom: 30,
    bottom: 0,
  },
  input: {
    marginBottom: 20,
  },
  btn: {
    marginTop: 20,
    width: 260,
    alignSelf: 'center',
    backgroundColor: Global.blue,
  },
  textContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 20,
    margin: 10,
  },
  textContainer1: {
    // display: "flex",
    // flexDirection: "row",
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 40,
  },
  text: {
    fontSize: Global.textFontSize,
    color: 'grey',
  },

  close: {
    position: 'absolute',
    right: 20,
    top: 40,
  },
})
// const RegisterOut = createForm()(Register)
export default Register
