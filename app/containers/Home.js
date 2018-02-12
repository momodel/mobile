import React, { Component } from 'react'
import { StyleSheet, View, Image, Text, TouchableOpacity } from 'react-native'

import { connect } from 'react-redux'

import { NavigationActions } from '../utils'

import WebChat from '../components/Chat/WebChat'

@connect(({ app }) => ({ ...app }))
class Home extends Component {
  static navigationOptions = ({ navigation }) => ({
    headerRight: (
      <View
        style={{
          display: 'flex',
          flexDirection: 'row',
        }}
      >
        <TouchableOpacity
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            margin: 10,
          }}
          onPress={() => {
            navigation.dispatch(
              NavigationActions.navigate({ routeName: 'Message' })
            )
          }}
        >
          <Image
            style={{ width: 25, height: 25, tintColor: 'grey' }}
            source={require('../images/icons/message.png')}
          />
        </TouchableOpacity>

        <TouchableOpacity
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            margin: 10,
          }}
          onPress={() => {
            navigation.dispatch(
              NavigationActions.navigate({ routeName: 'Account' })
            )
          }}
        >
          <Image
            style={{ width: 21, height: 21, tintColor: 'grey' }}
            source={require('../images/icons/user.png')}
          />
        </TouchableOpacity>
      </View>
    ),
  })

  render() {
    return <WebChat />
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

export default Home
