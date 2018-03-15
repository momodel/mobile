import React, {Component} from 'react'
import {StyleSheet, View, Image, Text, ScrollView, TouchableOpacity} from 'react-native'
import {InputItem, List, Tabs} from 'antd-mobile'
import {connect} from 'react-redux'
import {CommentCard} from "../components/Item/CommentItem"
import {AnswerCard} from "../components/Item/AnswerItem"
import {RequestHeaderCard} from '../components/RequestHeader'

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
    // const requestId = "5a91266739b6bd4e0cc199d2" //
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
          />
          <Tabs tabs={tabs}
                initialPage={0}
                style={{marginTop: 10}}
                onTabClick={(tab, index) => {
                  console.log('onTabClick', index, tab)
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
        // ref={el => this.autoFocusInst = el}
      />
    </List>

    <View
      style={{
        width: 40,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "white"
      }}
      // keyboardShouldPersistTaps="always"
    >
      <TouchableOpacity
        onPress={onPressSend}
      >
        <Image
          style={{
            height: 30, width: 30,
            // justifyContent: "center",
            // alignItems: "center",
            // backgroundColor: "white"
          }}
          source={require('./../images/icons/message.png')}
        />
      </TouchableOpacity>
    </View>
  </View>
}


const styles = StyleSheet.create({
  // container: {
  //   // flex: 1,
  //   alignItems: 'center',
  //   justifyContent: 'center',
  // },
})

// const request_tmp = {
//   "_id": "5a91266739b6bd4e0cc199d2",
//   "accept_answer": "5a91282939b6bd4e0cc199db",
//   "category": [
//     "Business",
//     "Government"
//   ],
//   "create_time": "2018-02-24 08:56:52.084000",
//   "description": "I just got an Oops! Something Bad Happened! error, while opening this question. This question works now, it was only a temporary problem.\n\nHowever, when this happens, you get redirected to this URL. From there, you can't hit F5 (refresh) to try to reload the question. You have to find and open the original link to the question again.\n\nIt would be nice, if the URL would not be altered, so that F5 works (or a refresh of the error page tries to redirect to the original question, if available).",
//   "input": "a picture",
//   "output": "some description of the pic",
//   "star_user": [
//     "5a01c3ff0c11f3291b0e5ca9",
//     "59c08c950c11f387a185cce6"
//   ],
//   "status": 0,
//   "tags": [
//     "cnn",
//     "lstm",
//     "tag"
//   ],
//   "title": "superuser的提问2",
//   "user_id": "super_user",
//   "votes_up_user": []
// }
