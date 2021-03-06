import React, {Component} from 'react'
import {StyleSheet, View, Image, Text, ScrollView, TouchableOpacity} from 'react-native'
import {InputItem, List, Tabs} from 'antd-mobile'

import {showTime} from '../utils'


export const RequestHeaderCard = ({request, onPress, showMore, onPressEdit, onPressComments, numComments}) => {
  const {title, create_time, description, category, tags, input, output} = request

  return <View style={styles.cardContainer}>
    <View style={{flexDirection: "row", justifyContent: "space-between"}}>
      <View style={[styles.title, {width: "80%"}]}>
        <Text style={{fontSize: 20}}>{title}</Text>
      </View>

      <TouchableOpacity onPress={onPressEdit}>
        <Text style={{color: 'grey', fontSize: 15, marginTop: 5, marginRight: 5}}> 编辑</Text>
      </TouchableOpacity>
    </View>

    <View style={styles.datetime}>
      <Text style={{color: 'grey'}}>发布于 {showTime(create_time)}</Text>
    </View>

    <View style={[styles.title]}>
      <Text style={{color: 'grey', fontSize: 15}} numberOfLines={showMore ? 100 : 3}>{description}</Text>

      {showMore ? null : <TouchableOpacity onPress={onPress}>
        <Text style={{color: 'grey', fontSize: 15, marginTop: 5}}> 展开 </Text>
      </TouchableOpacity>}
    </View>

    {
      showMore && <RequestInfo {...request}/>
    }
    <View style={styles.title}>
      <Steps array={[title, input, output, tags, description]}/>
      <Text style={{color: 'grey', fontSize: 15, margin: 10}}>
        填写更加详细的信息有助于得到想要的回答
      </Text>
    </View>

    {numComments !== null ?
      <TouchableOpacity
        style={styles.title}
        onPress={onPressComments}>
        <Text style={{color: 'grey', fontSize: 12, margin: 10}}>
          {numComments}条评论
        </Text>
      </TouchableOpacity> : null
    }
  </View>
}

RequestHeaderCard.propTypes = {}
RequestHeaderCard.defaultProps = {
  request: {
    "_id": "5a9d07c839b6bd379457c9f1",
    "answer_number": 3,
    "category": [],
    "create_time": "2018-03-05 09:35:23.382000",
    "description": "很长的描述很长的描述很长的描述很长的描述很长的描述很长的描述很长的描述很长的描述很长的描述很长的描述很长的描述很长的描述很长的描述很长的描述很长的描述很长的描述很长的描述很长的描述很长的描述很长的描述很长的描述很长的描述很长的描述很长的描述很长的描述很长的描述很长的描述很长的描述很长的描述很长的描述很长的描述很长的描述很长的描述",
    "input": "两张照片",
    "output": "是否为夫妻脸",
    "star_user": [
      "5a68a3a20c11f31e6f3c4bd2"
    ],
    "status": 0,
    "tags": [
      "图片",
      "识别",
      "我"
    ],
    "title": "有没有预测夫妻脸的app",
    "type": "app",
    "user": "5a68a3a20c11f31e6f3c4bd2",
    "user_ID": "zhaofengli",
    "votes_up_user": []
  },
  showMore: false

}

const styles = StyleSheet.create({
  cardContainer: {
    display: 'flex',
    padding: 3,
    backgroundColor: 'white',
  },
  title: {
    paddingLeft: 10,
    paddingTop: 10,
    // paddingBottom: 2,
    // marginTop: -10
  },
  datetime: {
    paddingLeft: 10,
    paddingTop: 5,
    // padding: 2,
  }
})

const RequestInfo = ({category, tags, input, output}) => {
  return <List style={{
    marginTop: 10
  }}>
    {/*<InputItem*/}
    {/*type="text"*/}
    {/*disabled*/}
    {/*editable={false}*/}
    {/*value={category && category.toString()}*/}
    {/*>*/}
    {/*分类*/}
    {/*</InputItem>*/}

    <InputItem
      type="text"
      disabled
      editable={false}
      value={tags && tags.toString()}
    >
      标签
    </InputItem>

    <InputItem
      type="text"
      disabled
      editable={false}
      value={input}
    >
      输入
    </InputItem>

    <InputItem
      type="text"
      disabled
      editable={false}
      value={output}
    >
      输出
    </InputItem>
  </List>
}


const Steps = ({array}) => {
  let count = 0
  array = array.map(e => {
    if (e !== undefined && e !== null && e.length !== 0) {
      return true
    }
    count += 1
    return false
  })

  // for (let item in array) {
  //   if (item === false) {
  //     count += 1
  //   }
  // }
  return (
    <View>
      {count !== 0 && <Text>
        {`还有${count}项未完善`}
      </Text>
      }

      <View style={{flexDirection: "row"}}>
        {array.map(e =>
          <View key={Math.random()}
                style={{backgroundColor: e ? "#6A9AF6" : '#F5F5F5', height: 30, width: "12%", margin: 3}}/>)}
      </View>
    </View>
  )
}
Steps.defaultProps = {
  array: [true, false, false, false, false, false, false]
}
