import React, { Component } from 'react'
import { StyleSheet, View, Image, Text } from 'react-native'
import { connect } from 'react-redux'

import { createAction, NavigationActions } from '../utils'

// @connect(({ app }) => ({ ...app }))
class Message extends Component {
  static navigationOptions = {
    title: '我的消息',
  }

  // gotoDetail = () => {
  //   this.props.dispatch(NavigationActions.navigate({ routeName: 'Detail' }))
  // }
  //
  // goBack = () => {
  //   this.props.dispatch(NavigationActions.back({ routeName: 'Account' }))
  // }

  render() {
    return (
      <View style={styles.container}>
        <Text>我的信息页面</Text>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  icon: {
    width: 32,
    height: 32,
  },
})

export default Message
