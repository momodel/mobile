import React, {Component} from 'react'
import {View, TouchableOpacity, Text, StyleSheet, Image} from 'react-native'
import PropTypes from 'prop-types'

import {HearderRightV, HearderRight} from './Header'
export const ApiCard = ({ app, onPress, isFavor, isStar}) => {

  const {favor_users=[], star_users=[], name: title, description, score} = app

  return <TouchableOpacity style={styles.cardContainer} onPress={onPress}>
    <View style={styles.title}>
      <Text style={{fontSize: 20, color: "#6D9CF9"}}>{title}</Text>
    </View>

    <View style={styles.desc}>
      <Text style={{color: 'grey'}} numberOfLines={3}>{description}</Text>
    </View>
    {/*<View style={styles.text}>*/}
      {/*{score && <Text>匹配度：{score.toFixed(2)}</Text>}*/}
    {/*</View>*/}
    <HearderRight isFavor={isFavor} isStar={isStar} favorNum={favor_users.length} starNum={star_users.length}/>


  </TouchableOpacity>
}
export const NoMoreCard = ({onPress}) => <IconCard
  imgSource={require("../images/icons/no_more.png")}
  text="没有更多了"
  onPress={onPress}
  moreText="发布需求"
/>

export const MoreCard = ({onPress}) => <IconCard
  imgSource={require("../images/icons/more.png")}
  text="再看看"
  onPress={onPress}
/>

export const IconCard = ({imgSource, text, onPress, moreText}) =>
  <TouchableOpacity style={[styles.cardContainer, {justifyContent: "center"}]} onPress={onPress}>
    <Image style={{width: 50, height: 50}} source={imgSource}/>
    <View style={styles.title}>
      <Text style={{fontSize: 18}}>{text}</Text>
      {moreText && <Text style={{fontSize: 18, color: "blue", marginTop: 5}}>{moreText}</Text>}
    </View>
  </TouchableOpacity>

ApiCard.propTypes = {
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  // score: PropTypes.number.isRequired,
  favor: PropTypes.number.isRequired,
  onPress: PropTypes.func,
}
ApiCard.defaultProps = {
  title: '标题',
  description: '描述',
  // score: 0,
  favor: 0,
}

// export default CustomCard

const styles = StyleSheet.create({

  cardContainer: {
    display: 'flex',
    padding: 3,
    alignItems: 'center',
    backgroundColor: '#F9F9F9',
    margin: 8,
    borderRadius: 8,
    shadowColor: 'grey',
    shadowOffset: {h: 1, w: 1},
    shadowRadius: 8,
    shadowOpacity: 0.5,
    width: 150,
    height: 180,
    justifyContent: "space-between"
  },
  title: {
    alignItems: 'center',
    margin: 10,
  },

  desc: {
    alignItems: 'center',
    marginLeft: 10,
    marginRight: 10,
    height: "35%",
  },

  text: {
    alignItems: 'center',
    margin: 5,
  },
})
