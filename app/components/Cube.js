import React, {Component} from 'react'
import {
  StyleSheet,
  View,
  Image,
  TouchableOpacity,
  ScrollView,
} from 'react-native'
import {Button, Tag, Text,} from 'antd-mobile'
import {py_type_to_image} from '../Global'

export const Cube = ({title, content, type = "icon"}) => {
  if (type === 'icon') {
    // let dic = {
    //   "image": require('../images/icons/favor.png'),
    //   "int": require('../images/icons/user.png'),
    //   "str": require('../images/icons/user.png'),
    // }
    return (
      <View style={{
        margin: 10, alignItems: "center", justifyContent: "center",
        flex: 0.25
      }}>
        <Text style={{height: 40}}>
          {title}
        </Text>

        <View style={{flexDirection: "row",height: 40}}>

          {content&&content.map(e =>
            <Image
              key={Math.random()}
              style={{
                width: 21, height: 21, tintColor: "grey"
              }}
              source={py_type_to_image[e]}
            />
          )}
        </View>
      </View>
    )
  }
  else {
    return (
      <View style={{
        margin: 10, alignItems: "center", justifyContent: "center",
        flex: 0.25
      }}>
        <Text style={{height: 40}}>
          {title}
        </Text>
        <View style={{flexDirection: "row", height: 40}}>
          <Text>{content}</Text>
        </View>
      </View>
    )
  }

}
