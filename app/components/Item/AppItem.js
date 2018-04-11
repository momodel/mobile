import React, {Component} from 'react'
import {showTime} from "../../utils"
import {View, Image, Text, TouchableOpacity} from 'react-native'

export const AppItem = ({App, onPress}) => {
  const {name, description, favor_users = [], star_users = [], create_time: datetime, user_ID: app_obj_user_ID} = App

  return <View>
    <TouchableOpacity style={{
      backgroundColor: "white",
      height: 100,
      justifyContent: "space-between",
    }} onPress={()=>onPress(App)}>
      <View style={{margin: 15}}>
        <Text numberOfLines={2} style={{fontSize: 18}}>{name}</Text>
      </View>

      <View style={{margin: 10, flexDirection: "row", justifyContent: "space-between"}}>

        <View style={{margin: 5, width: "20%"}}>
          <Text style={{color: 'grey'}}>{app_obj_user_ID}</Text>
        </View>

        <View style={{margin: 5, width: "15%"}}>
          <Text style={{color: 'grey'}}>{star_users.length}赞</Text>
        </View>

        <View style={{margin: 5, width: "15%"}}>
          <Text style={{color: 'grey'}}>{favor_users.length}收藏</Text>
        </View>

        <View style={{margin: 5, width: "25%"}}>
          <Text style={{color: 'grey'}}>{showTime(datetime, 'yyyy-MM-dd')}</Text>
        </View>

      </View>
    </TouchableOpacity>
    <View style={{height: 5, backgroundColor: "#F2F4F6"}}/>
  </View>
}

export const UsedAppItem = ({App: usedApp, onPress}) => {
  let {app_obj = {}, datetime, app_obj_user_ID} = usedApp
  app_obj = {
    ...app_obj,
    user_ID: app_obj_user_ID,
    create_time: datetime
  }
  return <AppItem App={app_obj} onPress={onPress}/>
}
