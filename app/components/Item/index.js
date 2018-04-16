// 所有列表元素组件

import React, {Component} from 'react'
import {View, TouchableOpacity, Text, StyleSheet, Image} from 'react-native'
import PropTypes from 'prop-types'
import {showTime} from '../../utils/index'
import {RequestItem} from './RequestItem'

export {RequestItem}
import styles from './styles'

export const ItemWithImage = ({onPress, children, source}) => (
  <TouchableOpacity style={styles.itemWithImageContainer} onPress={onPress}>
    <View
      style={{width: 65, alignItems: "center", padding: 10, paddingTop: 20}}
    >
      <Image
        style={{
          height: 50, width: 50, borderRadius: 25,
        }}
        source={source}
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

export const MessageItem = ({sender, content, datetime, onPress, isRead, source}) => <ItemWithImage onPress={onPress} source={source}>
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

// export const UsedAppItemBackup = ({usedApp, onPress}) => {
//   const {app_obj = {}, datetime} = usedApp
//   const {name, description, favor_users = [], star_users = []} = app_obj
//
//   return <TouchableOpacity style={styles.itemContainer} onPress={onPress}>
//     <View style={styles.title}>
//       <Text style={{fontSize: 18}}>{name}</Text>
//     </View>
//
//     <View style={styles.text}>
//       <Text style={{color: 'grey'}} numberOfLines={5}>{description}</Text>
//     </View>
//
//     <View style={styles.text}>
//       <Text>点赞数：{favor_users.length}</Text>
//     </View>
//
//     <View style={styles.text}>
//       <Text>收藏数：{star_users.length}</Text>
//     </View>
//
//     <View style={styles.text}>
//       <Text style={{color: 'grey'}}>{showTime(datetime)}</Text>
//     </View>
//   </TouchableOpacity>
// }


// export const UsedAppItem = ({usedApp, onPress}) => {
//   const {app_obj = {}, datetime, app_obj_user_ID} = usedApp
//   const {name, description, favor_users = [], star_users = []} = app_obj
//   console.log("app_obj", app_obj)
//
//   return <View>
//     <TouchableOpacity style={{
//       backgroundColor: "white",
//       height: 100,
//       justifyContent: "space-between",
//       // marginBottom: 10,
//     }} onPress={onPress}>
//       <View style={{margin: 15}}>
//         <Text numberOfLines={2} style={{fontSize: 18}}>{name}</Text>
//       </View>
//
//       <View style={{margin: 10, flexDirection: "row", justifyContent: "space-between"}}>
//
//         <View style={{margin: 5, width: "15%"}}>
//           <Text style={{color: 'grey'}}>{app_obj_user_ID}</Text>
//         </View>
//
//         <View style={{margin: 5, width: "15%"}}>
//           <Text style={{color: 'grey'}}>{star_users.length}赞</Text>
//         </View>
//
//         <View style={{margin: 5, width: "15%"}}>
//           <Text style={{color: 'grey'}}>{favor_users.length}收藏</Text>
//         </View>
//
//         <View style={{margin: 5, width: "30%"}}>
//           <Text style={{color: 'grey'}}>{showTime(datetime, 'yyyy-MM-dd')}</Text>
//         </View>
//
//       </View>
//     </TouchableOpacity>
//     <View style={{height: 5, backgroundColor: "#F2F4F6"}}/>
//   </View>
// }



