import React, { Component } from 'react'
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native'
import PropTypes from 'prop-types'

export const ApiCard = ({ title, description, score, favor, onPress }) => (
  <TouchableOpacity style={styles.cardContainer} onPress={onPress}>
    <View style={styles.title}>
      <Text style={{ fontSize: 18 }}>{title}</Text>
    </View>

    <View style={styles.desc}>
      <Text style={{ color: 'grey' }}>{description}</Text>
    </View>

    <View style={styles.text}>
      <Text>匹配度：{score}</Text>
    </View>

    <View style={styles.text}>
      <Text>点赞数：{favor}</Text>
    </View>
  </TouchableOpacity>
)

ApiCard.propTypes = {
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  score: PropTypes.number.isRequired,
  favor: PropTypes.number.isRequired,
  onPress: PropTypes.func,
}
ApiCard.defaultProps = {
  title: '标题',
  description: '描述',
  score: 0,
  favor: 0,
}

// export default CustomCard

const styles = StyleSheet.create({
  cardContainer: {
    display: 'flex',
    padding: 3,
    alignItems: 'center',
    backgroundColor: 'white',
    margin: 8,
    // borderColor: "grey",
    // borderWidth: 0.5,
    borderRadius: 8,
    // boxShadow: "10px 10px 5px #888888"

    shadowColor: 'grey',
    shadowOffset: { h: 2, w: 2 },
    shadowRadius: 8,
    shadowOpacity: 0.5,
  },
  title: {
    alignItems: 'center',
    margin: 10,
  },

  desc: {
    alignItems: 'center',
    marginBottom: 30,
    marginLeft: 10,
    marginRight: 10,
  },

  text: {
    alignItems: 'center',
    margin: 5,
  },
})
