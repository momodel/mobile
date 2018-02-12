import React, { Component } from 'react'
import {
  StyleSheet,
  View,
  Image,
  Text,
  TouchableOpacity,
  ScrollView,
} from 'react-native'
import { Button } from 'antd-mobile'
import { connect } from 'react-redux'
import { NavigationActions } from '../utils'

@connect(({ app }) => ({ ...app }))
class ApiDetail extends Component {
  static navigationOptions = ({ navigation }) => ({
    title: '应用详情',

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
          // onPress={() => {
          //   navigation.dispatch(
          //     NavigationActions.navigate({ routeName: 'Message' })
          //   )
          // }}
        >
          <Image
            style={{ width: 25, height: 25, tintColor: 'grey' }}
            source={require('../images/icons/up.png')}
          />
        </TouchableOpacity>

        <TouchableOpacity
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            margin: 10,
          }}
          // onPress={() => {
          //   navigation.dispatch(
          //     NavigationActions.navigate({ routeName: 'Account' })
          //   )
          // }}
        >
          <Image
            style={{ width: 21, height: 21, tintColor: 'grey' }}
            source={require('../images/icons/down.png')}
          />
        </TouchableOpacity>

        <TouchableOpacity
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            margin: 10,
          }}
          // onPress={() => {
          //   navigation.dispatch(
          //     NavigationActions.navigate({ routeName: 'Account' })
          //   )
          // }}
        >
          <Image
            style={{ width: 21, height: 21, tintColor: 'grey' }}
            source={require('../images/icons/favor.png')}
          />
        </TouchableOpacity>
      </View>
    ),
  })

  componentDidMount() {
    // 获取 api 详情
  }

  render() {
    // 从apiList 直接传过来
    const {
      name,
      description,
      doc = 'aaa',
    } = this.props.navigation.state.params.api
    return (
      <View style={{ flex: 1 }}>
        <ScrollView>
          <View style={styles.container}>
            <Text>App详情</Text>
            <Text>{name}</Text>
            <Text>{description}</Text>
            <Text>doc markdown</Text>
            <Text>{doc}</Text>
          </View>
        </ScrollView>
        <View style={styles.footer}>
          <Button
            style={{
              width: 300,
              margin: 10,
              borderRadius: 30,
              backgroundColor: 'blue',
            }}
            onClick={() => {
              this.props.dispatch(
                NavigationActions.navigate({ routeName: 'Predict' })
              )
            }}
          >
            立即使用
          </Button>
        </View>
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
  footer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
})
export default ApiDetail
