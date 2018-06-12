import React, {Component} from 'react'
import {connect} from "react-redux"
import {StyleSheet, View, Image, Text, ScrollView, TouchableOpacity} from 'react-native'
import {InputItem, List} from 'antd-mobile'
import {CommentCard} from "../components/Item/CommentItem"
import {showTime} from "../utils"


@connect(({request}) => ({...request}))
export default class CommentsPage extends Component {
  state = {
    comment: null
  }

  render() {
    const {comments} = this.props
    return (
      <View style={{
        overflow: "hidden",
        height: "100%",
        width: "100%"
      }}>
        <ScrollView>
          {comments && comments.length !== 0 ?
            <View>
              {comments.map((comment) => {
                const {
                  comments, comments_type, comments_user_id, create_time,
                  reply_number, _id
                } = comment
                return <CommentCard
                  key={_id}
                  username={comments_user_id}
                  content={comments}
                  datetime={showTime(create_time)}
                />
              })}
            </View>
            : <View style={{minHeight: 200, alignItems: "center", justifyContent: "center"}}>
              <Text>
                暂无信息
              </Text>
            </View>
          }

        </ScrollView>

        <TextSend
          onChangeCommentText={value => {
            this.setState({
              comment: value,
            })
          }}
          onPressSend={() => {
            this.props.dispatch({
              type: "request/sendComment",
              payload: {
                comments: this.state.comment,

              }
            })
            this.setState({
              comment: ""
            })
          }}
          commentText={this.state.comment}
          placeholder="输入评论"
        />
      </View>
    )
  }
}

const Comments = ({comments, onChangeCommentText, onPressSend, commentText}) => {
  return (
    <View>
      <ScrollView
      >
        <View style={{flex: 1}}>
          <View
          >
            {comments.map((comment) => {
              console.log("comment", comment)
              const {
                comments, comments_type, comments_user_id, create_time,
                reply_number, _id
              } = comment
              return <CommentCard
                key={_id}
                username={comments_user_id}
                content={comments}
                datetime={create_time}
              />
            })}
          </View>
        </View>
      </ScrollView>

    </View>
  )
}


const TextSend = ({onChangeCommentText, commentText, onPressSend, placeholder}) => {
  return <View style={{flexDirection: "row"}}>
    <List style={{flex: 1}}>
      <InputItem
        type="text"
        placeholder={placeholder}
        onChange={onChangeCommentText}
        value={commentText}
      />
    </List>

    <View
      style={{
        width: 40,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "white"
      }}
    >
      <TouchableOpacity
        onPress={onPressSend}
      >
        <Image
          style={{
            height: 30, width: 30,
          }}
          source={require('./../images/icons/message.png')}
        />
      </TouchableOpacity>
    </View>
  </View>
}

