import React, {Component} from 'react'
import {View, TouchableOpacity, Text, StyleSheet, Image} from 'react-native'
import PropTypes from 'prop-types'
import {HearderRight} from '../Header'
import {showTime} from "../../utils/index"


export const AnswerCard = ({answerObj, onPressReply, user}) => {
  const {
    _id, answer: content, answer_user_ID: username, comment: comments, create_time: datetime, votes_up_user
  } = answerObj
  return <View style={styles.cardContainer}>
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
      <View style={[styles.title]}>
        <Text style={{fontSize: 20}}>{username}</Text>
      </View>

      <View style={styles.title}>
        <Text style={{fontSize: 15}}>{content}</Text>
      </View>

      <View style={{height: 1, backgroundColor: "black"}}/>
      {
        comments.map(comment => {
          const {comments: commentText, comments_user_id, create_time, _id} = comment
          return <Text key={_id}>
            {commentText} - {comments_user_id} at {showTime(create_time)}
          </Text>
        })
      }

      <View style={styles.datetime}>
        <Text style={{color: 'grey'}}>{showTime(datetime)}</Text>
        <TouchableOpacity onPress={onPressReply} style={{marginLeft: 20}}>
          <Text>
            回复
          </Text>
        </TouchableOpacity>
      </View>

      <HearderRight onPressFavor={()=>{}} isFavor={false} starNum={0} favorNum={0}/>

    </View>
  </View>
}

AnswerCard.propTypes = {
  // username: PropTypes.string.isRequired,
  // content: PropTypes.string.isRequired,
  // datetime: PropTypes.string.isRequired,
  // onPressReply: PropTypes.func,
}
AnswerCard.defaultProps = {
  // username: '用户名',
  // content: '评论内容',
  // datetime: 0,

}

const styles = StyleSheet.create({
  cardContainer: {
    // flex:1,
    // margin: 8,

    // display: 'flex',
    // padding: 3,
    // alignItems: 'center',
    backgroundColor: 'white',
    //
    // borderColor: "grey",
    // borderWidth: 0.5,
    // borderRadius: 5,
    // boxShadow: "10px 10px 5px #888888"

    // shadowColor: 'grey',
    // shadowOffset: {h: 2, w: 2},
    // shadowRadius: 8,
    // shadowOpacity: 0.5,
    flexDirection: "row"
  },
  title: {
    padding: 5,
    // marginTop: -10
  },

  datetime: {
    padding: 10,
    flexDirection: "row"
  },
})
