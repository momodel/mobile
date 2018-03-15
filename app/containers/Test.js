import React, { Component } from 'react'
import { StyleSheet, View, Image, Text } from 'react-native'
import { connect } from 'react-redux'

import {RequestHeader} from "../components/RequestHeader"
@connect(({ app }) => ({ ...app }))
export default class Account extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Text>页面名称</Text>
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
