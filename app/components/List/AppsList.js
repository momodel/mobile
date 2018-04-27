import React, {Component} from 'react'
import {StyleSheet, View, Image, Text, ScrollView} from 'react-native'
import {AppItem, UsedAppItem} from '../Item/AppItem'
import {ActivityIndicator} from 'antd-mobile'
import {CustomFlatList} from '../../components/CustomFlatList'


const BasicList = (props) => {
  const {Apps, emptyText = '暂无历史记录', onPressItem, Item, fetching} = props
  return (
    fetching ? <View style={{
        height: '15%',
        alignItems: 'center',
        justifyContent: 'center',
      }}>
        <ActivityIndicator size='large'/>
      </View>
      :
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


const InfoPage = ({text}) => {
  return (
    <View style={{minHeight: 200, alignItems: "center", justifyContent: "center"}}>
      <Text>
        {text}
      </Text>
    </View>
  )
}



