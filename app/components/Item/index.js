// 所有列表元素组件

import React, {Component} from 'react'
import {View, TouchableOpacity, Text, StyleSheet, Image} from 'react-native'
import PropTypes from 'prop-types'
import {showTime} from '../../utils/index'
import {RequestItem} from './RequestItem'

export {RequestItem}

export const ItemWithImage = ({onPress, children}) => (
  <TouchableOpacity style={styles.itemWithImageContainer} onPress={onPress}>
    <View
      style={{width: 65, alignItems: "center", padding: 10, paddingTop: 20}}
    >
      <Image
        style={{
          height: 50, width: 50
        }}
        source={require('../../images/icons/mo.png')}
      />
    </View>
    <View style={{flex: 1}}>
      {children}
    </View>
  </TouchableOpacity>
)

ItemWithImage.propTypes = {
  onPress: PropTypes.func,
}
ItemWithImage.defaultProps = {}

export const MessageItem = ({sender, content, datetime, onPress, isRead}) => <ItemWithImage onPress={onPress}>
  <View style={[styles.title, {flexDirection: "row", alignItems: "center"}]}>
    {isRead ? null :
      <View style={{backgroundColor: '#0389f9', width: 8, height: 8, borderRadius: 4, marginRight: 10}}/>}
    <Text style={{fontSize: 20}}>{sender}</Text>
  </View>

  <View style={styles.title}>
    <Text style={{fontSize: 20}}>{content}</Text>
  </View>

  <View style={styles.datetime}>
    <Text style={{color: 'grey'}}>{showTime(datetime)}</Text>
  </View>
</ItemWithImage>

MessageItem.propTypes = {
  content: PropTypes.string,
  datetime: PropTypes.string,
  // isRead: PropTypes.boolean,
}
MessageItem.defaultProps = {
  isRead: false
}

export const UsedAppItem = ({usedApp, onPress}) => {
  const {app_obj = {}, datetime} = usedApp
  const {name, description, favor_users = [], star_users = []} = app_obj

  return <TouchableOpacity style={styles.itemContainer} onPress={onPress}>
    <View style={styles.title}>
      <Text style={{fontSize: 18}}>{name}</Text>
    </View>

    <View style={styles.text}>
      <Text style={{color: 'grey'}} numberOfLines={5}>{description}</Text>
    </View>

    <View style={styles.text}>
      <Text>点赞数：{favor_users.length}</Text>
    </View>

    <View style={styles.text}>
      <Text>收藏数：{star_users.length}</Text>
    </View>

    <View style={styles.text}>
      <Text style={{color: 'grey'}}>{showTime(datetime)}</Text>
    </View>
  </TouchableOpacity>
}

const styles = StyleSheet.create({
  itemWithImageContainer: {
    flexDirection: "row",
    margin: 8,
    padding: 3,
    backgroundColor: 'white',

    borderRadius: 5,
    shadowColor: 'grey',
    shadowOffset: {h: 2, w: 2},
    shadowRadius: 8,
    shadowOpacity: 0.5,
  },
  itemContainer: {
    display: 'flex',
    padding: 3,
    margin: 8,
    // alignItems: 'center',
    backgroundColor: 'white',

    borderRadius: 5,
    shadowColor: 'grey',
    shadowOffset: {h: 2, w: 2},
    shadowRadius: 8,
    shadowOpacity: 0.5,
  },
  title: {
    padding: 10,
    marginTop: -10
  },
  datetime: {
    padding: 10,
  },

  text: {
    alignItems: 'center',
    margin: 5,
  },
})
