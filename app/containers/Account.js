import React, {Component} from 'react'
import {StyleSheet, View, Image, Text, ImageBackground, TouchableOpacity, Dimensions, ScrollView} from 'react-native'
import {connect} from 'react-redux'
import {List, Icon} from 'antd-mobile'
import {createAction, NavigationActions} from '../utils'
const { width, height } = Dimensions.get('window')
import UsedApps from './UsedApps'
import AppsList, {UsedAppsList} from '../components/List/AppsList'
const Item = List.Item
import {avatarList} from  '../Global'
const radius = 40

@connect(({app, appList}) => ({...app, appList}))
class Account extends Component {
  componentDidMount() {
    this.props.dispatch({
      type: 'appList/getUsedApps'
    })
  }

  gotoLogin = () => {
    this.props.dispatch(NavigationActions.navigate({routeName: 'Login'}))
  }

  gotoMessage = () => {
    this.props.dispatch(NavigationActions.navigate({routeName: 'Message'}))
  }

  gotoRequests = () => {
    this.props.dispatch(NavigationActions.navigate({routeName: 'Requests'}))
  }

  // gotoUsedApps = () => {
  //   this.props.dispatch(NavigationActions.navigate({routeName: 'UsedApps'}))
  // }

  // FavorApps
  gotoFavorApps = () => {
    this.props.dispatch(NavigationActions.navigate({routeName: 'FavorApps'}))
  }

  render() {
    const {username, login, user} = this.props
    const picNumber = parseInt(user._id.slice(20))%6
    return (
      <View>

        <View style={{width: "100%", height: height*0.1, backgroundColor: "#AACDFF",}}>
          <TouchableOpacity
          style={{
          // position: 'absolute',
          // left: 100,
          // top: 100,
          marginTop: "7%",
          paddingLeft: "2.5%",
          backgroundColor: 'transparent',
          flexDirection: "row",
          // justifyContent: "center",
          alignItems: "center"
          }}
          onPress={() => this.props.dispatch(NavigationActions.back())}
          >
          <Icon type="left" color='#2F7DF6' style={{marginRight: 10, color: "blue"}}/>
          <Text style={{fontSize: 20, color: "white"}}
          >我的</Text>
          </TouchableOpacity>
        </View>

      <ScrollView style={{backgroundColor: "white"}}
                  keyboardShouldPersistTaps="always">
        <View style={{width: "100%", height: height*0.08, backgroundColor: "#AACDFF",}}>
        </View>

        <TouchableOpacity style={{width: "100%", alignItems: "center", marginTop: -radius}}
              onPress={() => {
                this.props.dispatch(NavigationActions.navigate({routeName: 'UserInfo'}))
              }}
        >
          <View style={{width: radius*2, height: radius*2, borderRadius: radius, backgroundColor: "white", alignItems: "center", justifyContent: "center"}} >
            <Image style={{width: radius*2-2, height: radius*2-2, borderRadius: radius-1}} source={avatarList[picNumber]} />
          </View>

          <View style={{marginTop: 10}}>
            <Text style={{fontSize: 20}}>
              {username}
            </Text>
          </View>
        </TouchableOpacity>

        <View style={{alignItems: "center", justifyContent: "center", margin: 10}}>
          <View style={{width: "90%", backgroundColor: "#F2F2F2", height: 1}}/>
        </View>


        <View style={{flexDirection: "row",  alignItems: "center", justifyContent: "center", height: height*0.1, width: width}}>
          <TouchableOpacity style={{alignItems: "center", justifyContent: "center", width: "45%"}}
                onPress={this.gotoFavorApps}
          >
            <Text style={{fontSize: 20, color: "#6D9CF9"}}>
              10
            </Text>
            <Text style={{marginTop: 10}}>
              收藏
            </Text>
          </TouchableOpacity>

          <View style={{alignItems: "center", justifyContent: "center"}}>
            <View style={{height: "90%", backgroundColor: "#F2F2F2", width: 1}}/>
          </View>

          <TouchableOpacity style={{alignItems: "center", justifyContent: "center", width: "45%"}}
                onPress={this.gotoRequests}
          >
            <Text style={{fontSize: 20, color: "#6D9CF9"}}>
              2
            </Text>
            <Text style={{marginTop: 10}}>
              需求
            </Text>
          </TouchableOpacity>
        </View>

        <View style={{backgroundColor: "#F2F4F6", height: 30, justifyContent: "center"}}>
          <Text style={{marginLeft: 30}}>
            使用记录
          </Text>
        </View>

        {/*<UsedApps />*/}


        <UsedAppsList Apps={this.props.appList.usedApps} onPressItem={(App)=>
          this.props.dispatch(
            NavigationActions.navigate({
              routeName: 'AppDetail',
              params: {api: App},
            })
          )
        }/>

        {/*<List style={{*/}
          {/*marginTop: "40%"*/}
        {/*}}>*/}
          {/*{*/}
            {/*login && <Item style={{alignItems: "center"}} onClick={() => {*/}
            {/*}}>*/}
              {/*{username}*/}
            {/*</Item>*/}
          {/*}*/}

          {/*/!*{*!/*/}
          {/*/!*!login && <Item arrow="horizontal" onClick={this.gotoLogin}>*!/*/}
          {/*/!*登录*!/*/}
          {/*/!*</Item>*!/*/}
          {/*/!*}*!/*/}

          {/*<View style={{height: 15}}/>*/}

          {/*<Item thumb="https://zos.alipayobjects.com/rmsportal/dNuvNrtqUztHCwM.png"*/}
                {/*arrow="horizontal" onClick={() => {*/}
            {/*this.props.dispatch(NavigationActions.navigate({routeName: 'UserInfo'}))*/}
          {/*}}>*/}
            {/*账号与安全*/}
          {/*</Item>*/}

          {/*<View style={{height: 15}}/>*/}

          {/*<Item thumb="https://zos.alipayobjects.com/rmsportal/dNuvNrtqUztHCwM.png"*/}
                {/*arrow="horizontal" onClick={this.gotoMessage}*/}
          {/*>*/}
            {/*消息列表*/}
          {/*</Item>*/}

          {/*/!*<Item thumb="https://zos.alipayobjects.com/rmsportal/dNuvNrtqUztHCwM.png"*!/*/}
          {/*/!*arrow="horizontal" onClick={() => {*!/*/}
          {/*/!*}}>*!/*/}
          {/*/!*用户帮助*!/*/}
          {/*/!*</Item>*!/*/}

          {/*<View style={{height: 15}}/>*/}

          {/*<Item thumb="https://zos.alipayobjects.com/rmsportal/dNuvNrtqUztHCwM.png"*/}
                {/*arrow="horizontal" onClick={this.gotoRequests}>*/}
            {/*我的需求*/}
          {/*</Item>*/}

          {/*<View style={{height: 15}}/>*/}

          {/*<Item thumb="https://zos.alipayobjects.com/rmsportal/dNuvNrtqUztHCwM.png"*/}
                {/*arrow="horizontal" onClick={this.gotoUsedApps}>*/}
            {/*我的历史记录*/}
          {/*</Item>*/}

          {/*<View style={{height: 50}}/>*/}
          {/*{*/}
            {/*login && <Item*/}
              {/*style={styles.logout}*/}
              {/*// arrow="horizontal"*/}
              {/*onClick={this.logout}*/}
            {/*>*/}
              {/*<Text style={styles.logout_text}>退出登录</Text>*/}
            {/*</Item>*/}
          {/*}*/}

        {/*</List>*/}

        {/*/!*<List/>*!/*/}
      </ScrollView>
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
