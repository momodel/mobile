import React, {Component} from 'react'
import {StyleSheet, View, Image, Text} from 'react-native'
import {connect} from 'react-redux'
import {List} from 'antd-mobile'
import {createAction, NavigationActions} from '../utils'

const Item = List.Item

@connect(({app}) => ({...app}))
class Account extends Component {
  gotoLogin = () => {
    this.props.dispatch(NavigationActions.navigate({routeName: 'Login'}))
  }

  gotoRequests = () => {
    this.props.dispatch(NavigationActions.navigate({routeName: 'Requests'}))
  }

  gotoUsedApps = () => {
    this.props.dispatch(NavigationActions.navigate({routeName: 'UsedApps'}))
  }

  logout = () => {
    this.props.dispatch(createAction('app/logout')())
  }

  render() {
    const {username, login} = this.props
    return (
      <View>
        <List>
          {
            login && <Item arrow="horizontal" onClick={() => {
            }}>
              {username}
            </Item>
          }

          {
            !login && <Item arrow="horizontal" onClick={this.gotoLogin}>
              登录
            </Item>
          }


          <Item arrow="horizontal" onClick={() => {
          }}>
            检查更新
          </Item>

          <Item arrow="horizontal" onClick={() => {
          }}>
            用户帮助
          </Item>

          <View style={{height: 50}}/>

          <Item arrow="horizontal" onClick={this.gotoRequests}>
            我发布的需求
          </Item>

          <Item arrow="horizontal" onClick={this.gotoUsedApps}>
            我的历史记录
          </Item>

          <View style={{height: 50}}/>
          {
            login && <Item
              style={styles.logout}
              // arrow="horizontal"
              onClick={this.logout}
            >
              <Text style={styles.logout_text}>退出登录</Text>
            </Item>
          }

        </List>

        <List/>
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

  logout: {
    height: 40,
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
