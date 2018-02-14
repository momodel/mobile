import React, { Component } from 'react'
import { StyleSheet, View, Image, Text } from 'react-native'
import { connect } from 'react-redux'
import { List } from 'antd-mobile'
import { createAction, NavigationActions } from '../utils'
const Item = List.Item

@connect(({ app }) => ({ ...app }))
class Account extends Component {
  static navigationOptions = {
    title: '我的账户',
    // tabBarLabel: 'Account',
    // tabBarIcon: ({ focused, tintColor }) => (
    //   <Image
    //     style={[styles.icon, { tintColor: focused ? tintColor : 'gray' }]}
    //     source={require('../images/person.png')}
    //   />
    // ),
  }

  gotoLogin = () => {
    this.props.dispatch(NavigationActions.navigate({ routeName: 'Login' }))
  }

  logout = () => {
    this.props.dispatch(createAction('app/logout')())
  }
  render() {
    const { username, login } = this.props
    return (
      <View>
        <List>
          {
            login&&<Item arrow="horizontal" onClick={() => {}}>
              {username}
            </Item>
          }

          {
            !login&&<Item arrow="horizontal" onClick={this.gotoLogin}>
              登录
            </Item>
          }


          <Item arrow="horizontal" onClick={() => {}}>
            检查更新
          </Item>

          <Item arrow="horizontal" onClick={() => {}}>
            用户帮助
          </Item>
          <View style={{ height: 50 }} />


          {
            login&&<Item
              style={styles.logout}
              // arrow="horizontal"
              onClick={this.logout}
            >
              <Text style={styles.logout_text}>退出登录</Text>
            </Item>
          }

        </List>

        <List />
      </View>
    )
  }

  // render() {
  //   const { login } = this.props
  //   return (
  //     <View style={styles.container}>
  //       {login ? (
  //         <Button text="Logout" onPress={this.logout} />
  //       ) : (
  //         <Button text="Goto Login" onPress={this.gotoLogin} />
  //       )}
  //     </View>
  //   )
  // }
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

  logout: {
    height: 40,
    // marginTop: 50,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'red',
    padding: 5,
    margin: 5,
  },
  logout_text: {
    textAlign: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: 18,
    color: 'white',
  },
})

export default Account
