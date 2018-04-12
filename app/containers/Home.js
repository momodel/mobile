/**
 * 手机端主页， 聊天机器人
 *
 */
import React, {Component} from 'react'
import {connect} from 'react-redux'
import {StyleSheet, View, Image, Text, TouchableOpacity} from 'react-native'

import {NavigationActions} from '../utils'
import WebChat from '../components/Chat/WebChat'

@connect(({app}) => ({...app}))
class Home extends Component {
  static navigationOptions = ({navigation}) => ({
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
            // margin: 10,
            width: 50,
            height: 40,
          }}
          onPress={() => {
            navigation.dispatch(
              NavigationActions.navigate({routeName: 'Message'})
            )
          }}
        >
          <Image
            style={{width: 25, height: 25, tintColor: 'grey'}}
            source={require('../images/icons/mail.png')}
          />
        </TouchableOpacity>

        <TouchableOpacity
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            width: 50,
            height: 40,
          }}
          onPress={() => {
            navigation.dispatch(
              NavigationActions.navigate({routeName: 'Account'})
            )
          }}
        >
          <Image
            style={{width: 21, height: 21, tintColor: 'grey'}}
            source={require('../images/icons/user.png')}
          />
        </TouchableOpacity>
      </View>
    ),
  })

  render() {
    return <View style={{backgroundColor:"white"}}>
      <WebChat/>
    </View>
  }
}

const styles = StyleSheet.create({
  // container: {
  //   flex: 1,
  //   alignItems: 'center',
  //   justifyContent: 'center',
  // },
  // icon: {
  //   width: 32,
  //   height: 32,
  // },
})

export default Home
