import React, {Component} from 'react'
import {StyleSheet, View, Image, Text, ImageBackground, TouchableOpacity} from 'react-native'
import {connect} from 'react-redux'
import {List, Icon} from 'antd-mobile'
import {createAction, NavigationActions} from '../utils'

const Item = List.Item

@connect(({app}) => ({...app}))
class Account extends Component {
  gotoLogin = () => {
    this.props.dispatch(NavigationActions.navigate({routeName: 'Login'}))
  }

  gotoMessage = () => {
    this.props.dispatch(NavigationActions.navigate({routeName: 'Message'}))
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
        <ImageBackground
          style={{

          }}
          source={require("../images/account_background.png")}>
          <TouchableOpacity
            style={{
              marginTop: "7%",
              paddingLeft: "2.5%",
              backgroundColor:'transparent',
              flexDirection:"row",
              // justifyContent: "center",
              alignItems: "center"
            }}
            onPress={()=>this.props.dispatch(NavigationActions.back())}
          >
            <Icon type="left" color='#2F7DF6' style={{marginRight: 10, color: "blue"}}/>
            <Text style={{fontSize: 20, color: "white"}}
            >我的</Text>
          </TouchableOpacity>

        <List style={{
          marginTop: "40%"}}>
          {
            login && <Item style={{alignItems: "center"}} onClick={() => {
            }}>
              {username}
            </Item>
          }

          {/*{*/}
            {/*!login && <Item arrow="horizontal" onClick={this.gotoLogin}>*/}
              {/*登录*/}
            {/*</Item>*/}
          {/*}*/}

          <View style={{height: 15}}/>

          <Item thumb="https://zos.alipayobjects.com/rmsportal/dNuvNrtqUztHCwM.png"
                arrow="horizontal" onClick={() => {
            this.props.dispatch(NavigationActions.navigate({routeName: 'UserInfo'}))
          }}>
            账号与安全
          </Item>

          <View style={{height: 15}}/>

          <Item thumb="https://zos.alipayobjects.com/rmsportal/dNuvNrtqUztHCwM.png"
                arrow="horizontal" onClick={ this.gotoMessage}
          >
            消息列表
          </Item>

          {/*<Item thumb="https://zos.alipayobjects.com/rmsportal/dNuvNrtqUztHCwM.png"*/}
                {/*arrow="horizontal" onClick={() => {*/}
          {/*}}>*/}
            {/*用户帮助*/}
          {/*</Item>*/}

          <View style={{height: 15}}/>

          <Item thumb="https://zos.alipayobjects.com/rmsportal/dNuvNrtqUztHCwM.png"
                arrow="horizontal" onClick={this.gotoRequests}>
            我的需求
          </Item>

          <View style={{height: 15}}/>

          <Item thumb="https://zos.alipayobjects.com/rmsportal/dNuvNrtqUztHCwM.png"
                arrow="horizontal" onClick={this.gotoUsedApps}>
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

        {/*<List/>*/}
        </ImageBackground>
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
