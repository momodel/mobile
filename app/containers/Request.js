import React, {Component} from 'react'
import {StyleSheet, View, Image, Text, ScrollView, TouchableOpacity} from 'react-native'
import {InputItem, List, Tabs} from 'antd-mobile'
import {connect} from 'react-redux'
import {CommentCard} from "../components/Item/CommentItem"
import {AnswerCard} from "../components/Item/AnswerItem"
import {RequestHeaderCard} from '../components/RequestHeader'
import { createAction, NavigationActions, Storage } from '../utils'

const tabs = [
  {title: "回答"},
  {title: "评论"},
]


@connect(({request}) => ({...request}))
export default class Request extends Component {
  constructor(props) {
    super(props)
    this.state = {
      comment: null,
      reply: null,
      showReplyTextSend: false,
      showCommentTextSend: false,
      focusAnswerId: null,
      showMore: false
    }
  }

  componentDidMount() {
    const requestId = this.props.navigation.state.params.request._id
    // 通过id 重新获取 request
    this.props.dispatch({
      type: 'request/getRequest',
      payload: {requestId}
    })

    // 通过id 获取 comments
    this.props.dispatch({
      type: 'request/getComments',
      payload: {requestId}
    })

    // 通过id 获取 answer
    this.props.dispatch({
      type: 'request/getAnswers',
      payload: {requestId}
    })

  }

  render() {
    const {title, description, input, output, comments, answers} = this.props

    return (
      <View style={{flex: 1}}>
        <ScrollView
          keyboardShouldPersistTaps="always"
          style={{
            flex: 1 // 不加 List 和 Tabs 冲突
          }}
          onScroll={() => {
            this.setState({showReplyTextSend: false})
          }}
        >
          <RequestHeaderCard request={this.props}
                             showMore={this.state.showMore}
                             onPress={() => this.setState({showMore: true})}
                             onPressEdit={()=> {this.props.dispatch(NavigationActions.navigate({ routeName: "RequestEdit" }))}}
          />
          <Tabs tabs={tabs}
                initialPage={0}
                style={{marginTop: 10}}
                onTabClick={(tab, index) => {
                  if (index === 1) {
                    this.setState({
                      showReplyTextSend: false,
                      showCommentTextSend: true,
                    })
                  }
                  if (index === 0) {
                    this.setState({
                      showCommentTextSend: false,
                    })
                  }
                }}
          >
            <View style={{
              flex: 1
            }}>
              <View
              >
                {
                  answers.map(answerObj => {
                    return <AnswerCard
                      key={answerObj._id}
                      answerObj={answerObj}
                      onPressReply={() => this.setState({showReplyTextSend: true, focusAnswerId: answerObj._id})}
                    />
                  })
                }
              </View>
            </View>

            <Comments
              {...{comments}}
            />

          </Tabs>

        </ScrollView>
        {
          this.state.showReplyTextSend ?
            <TextSend
              onChangeCommentText={value => {
                this.setState({
                  comment: value,
                })
              }}
              onPressSend={() => {
                this.props.dispatch({
                  type: "request/sendAnswerComment",
                  payload: {
                    comments: this.state.reply,
                    request_answer_id: this.state.focusAnswerId
                  }
                })
                this.setState({
                  reply: "",
                  showReplyTextSend: false
                })
              }}
              commentText={this.state.reply}
              placeholder="输入回复"
            /> : null

        }

        {
          this.state.showCommentTextSend && <TextSend
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
        }

      </View>
    )
  }
}

const Comments = ({comments, onChangeCommentText, onPressSend, commentText}) => {
  return (
    <View style={{flex: 1}}>
      <View
      >
        {comments.map((comment) => {
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


const styles = StyleSheet.create({

})
