import React, {Component} from 'react'
import {View, TouchableOpacity, Text, StyleSheet} from 'react-native'
// import {Cube} from "../components/Cube"
import PropTypes from 'prop-types'

export const RequestCard = ({title, datetime, commitNum, answerNum, favorNum, onPress}) => (
  <TouchableOpacity style={styles.cardContainer} onPress={onPress}>

    <View style={styles.datetime}>
      <Text style={{color: 'grey'}}>{datetime}</Text>
    </View>

    <View style={styles.title}>
      <Text style={{fontSize: 20}}>{title}</Text>
    </View>


    <View style={{flexDirection: "row", padding: 10, justifyContent: "space-between"}}>
      <Cube title="评论" content={commitNum} customStyle={{alignItems: "flex-start"}} />
      <Cube title="回答" content={answerNum} type="text"/>
      <Cube title="收藏" content={favorNum} customStyle={{alignItems: "flex-end"}}/>
    </View>


  </TouchableOpacity>
)

RequestCard.propTypes = {
  title: PropTypes.string.isRequired,
  datetime: PropTypes.string.isRequired,
  commitNum: PropTypes.number.isRequired,
  answerNum: PropTypes.number.isRequired,
  favorNum: PropTypes.number.isRequired,
  onPress: PropTypes.func,
}
RequestCard.defaultProps = {
  title: '标题',
  datetime: '描述',
  commitNum: 0,
  answerNum: 0,
  favorNum: 0
}

const Cube = ({title, content, customStyle}) => {
  return (
    <View style={{
      margin: 10, alignItems: "center", justifyContent: "center",
      flex: 1, ...customStyle
    }}>
      <View
        style={{alignItems: "center", justifyContent: "center"}}
      >

      <Text style={{}}>
        {title}
      </Text>

      <View style={{flexDirection: "row", marginTop: 10}}>
        <Text style={{fontSize: 25, color: "blue"}}
        >{content}</Text>
      </View>

      </View>
    </View>
  )
}


// export default RequestCard

const styles = StyleSheet.create({
  cardContainer: {
    margin: 8,

    display: 'flex',
    padding: 3,
    // alignItems: 'center',
    backgroundColor: 'white',
    //
    // borderColor: "grey",
    // borderWidth: 0.5,
    borderRadius: 5,
    // boxShadow: "10px 10px 5px #888888"

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
