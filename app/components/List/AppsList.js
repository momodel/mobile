import React, {Component} from 'react'
import {StyleSheet, View, Image, Text, ScrollView} from 'react-native'
import {AppItem, UsedAppItem} from '../Item/AppItem'

const BasicList = (props) => {
  const {Apps, emptyText = '暂无历史记录', onPressItem, Item} = props
  return (
    <View>
      {
        Apps.length !== 0 ? Apps.map(App => (
            <Item
              key={App._id}
              App={App}
              onPress={onPressItem}
            />
          ))
          :
          <View style={{width: "100%", height: 200, justifyContent: "center", alignItems: "center"}}>
            <Text style={{fontSize: 16}}>
              {emptyText}
            </Text>
          </View>
      }
    </View>
  )
}


export const AppsList = (props) => {
  return (
    <BasicList {...props} Item={AppItem}
               emptyText="暂无记录"
    />
  )
}


export const UsedAppsList = (props) => {
  return (
    <BasicList {...props} Item={UsedAppItem}/>
  )
}



