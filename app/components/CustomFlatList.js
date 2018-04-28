import React, {Component} from 'react'
import {StyleSheet, View, Image, Text, ScrollView, FlatList, RefreshControl} from 'react-native'
import {ActivityIndicator} from 'antd-mobile'


const InfoPage = ({text}) => {
  return (
    <View style={{minHeight: 200, alignItems: "center", justifyContent: "center"}}>
      <Text>
        {text}
      </Text>
    </View>
  )
}

export const CustomFlatList = ({dataItems, state, renderItem, noMore, loadingMore, onEndReached, refreshing, onRefresh}) => {
  const _keyExtractor = (item, index) => item._id
  const _renderFooter = () => {
    if (noMore) {
      return (
        <View
          style={{paddingVertical: 10, justifyContent: 'center', alignItems: 'center'}}
        >
          <Text>没有更多了</Text>
        </View>
      )
    }
    if (loadingMore) {
      return (
        <View
          style={{paddingVertical: 10, justifyContent: 'center', alignItems: 'center'}}
        >
          <Text>加载中...</Text>
        </View>
      )
    }
    return null
  }
  const emptyComponent = () => {
    return <View style={{
      height: '100%',
      alignItems: 'center',
      justifyContent: 'center',
    }}>
      <Text style={{
        fontSize: 16
      }}>暂无数据下拉刷新</Text>
    </View>
  }
  if(refreshing&&dataItems===null){
    return (
      <View style={{
        height: '15%',
        alignItems: 'center',
        justifyContent: 'center',
      }}>
        <ActivityIndicator size='large'/>
      </View>
    )
  }
  return (
    dataItems && dataItems.length !== 0 ?
      <FlatList
        data={dataItems}
        extraData={state}
        keyExtractor={_keyExtractor}
        renderItem={renderItem}
        ListFooterComponent={_renderFooter}
        ListEmptyComponent={emptyComponent}
        onEndReachedThreshold={0.1}
        onEndReached={onEndReached}
        refreshing={refreshing}
        onRefresh={onRefresh}
      /> : <InfoPage text="暂无信息"/>
  )
}
