import React, {Component} from 'react'
import {StyleSheet, View, Image, Text, ScrollView, TouchableOpacity} from 'react-native'
import {InputItem, List, Tabs} from 'antd-mobile'
import {connect} from 'react-redux'
import {CommentCard} from "../components/CommentCard"
import {AnswerCard} from "../components/AnswerCard"

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

      showReplyTextSend: false,
      focusAnswerId: null
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
      <View style={{
        flex: 1 // 不加 List 和 Tabs 冲突
      }}>

        <RequestInfo {...{title, description, input, output}}/>

        <Tabs tabs={tabs}
              initialPage={0}
          // onChange={(tab, index) => {
          //   console.log('onChange', index, tab)
          // }}
          // onTabClick={(tab, index) => {
          //   console.log('onTabClick', index, tab)
          // }}
              style={{
                marginTop: 10
              }}
        >

          <View style={{
            flex: 1
          }}>
            <ScrollView
              showsHorizontalScrollIndicator={false}
              keyboardShouldPersistTaps="always"
              onScroll={() => {
                this.setState({showReplyTextSend: false})
              }}
            >
              {

                answers.map(answerObj => {
                  console.log("answerObj", answerObj)
                  const {
                    _id, answer, answer_user_id, comment, create_time, votes_up_user
                  } = answerObj
                  return <AnswerCard
                    key={_id}
                    username={answer_user_id}
                    content={answer}
                    datetime={create_time}
                    comments={comment}
                    onPressReply={() => this.setState({showReplyTextSend: true, focusAnswerId: _id})}
                  />
                })
              }
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
                        comments: this.state.comment,
                        request_answer_id: this.state.focusAnswerId
                      }
                    })
                    this.setState({
                      comment: "",
                      showReplyTextSend: false
                    })
                  }}
                  commentText={this.state.comment}/> : null
            }

          </View>

          <Comments
            {...{comments}}
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
          />

        </Tabs>

      </View>
    )
  }
}

const Comments = ({comments, onChangeCommentText, onPressSend, commentText}) => {
  return (
    <View style={{flex: 1}}>
      <ScrollView
        showsHorizontalScrollIndicator={false}
        keyboardShouldPersistTaps="always"
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
      </ScrollView>

      <TextSend {...{onChangeCommentText, onPressSend, commentText}}/>
    </View>
  )
}

const TextSend = ({onChangeCommentText, commentText, onPressSend}) => {
  return <View style={{flexDirection: "row"}}>
    <List style={{flex: 1}}>
      <InputItem
        type="text"
        placeholder="输入评论"
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
      keyboardShouldPersistTaps="always"
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

const RequestInfo = ({title, description, input, output}) => {
  return <List style={{
    marginTop: 10
  }}>
    <InputItem
      type="text"
      disabled
      editable={false}
      value={title}
    >
      名称
    </InputItem>

    <InputItem
      type="text"
      disabled
      editable={false}
      value={description}
    >
      描述
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

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
})

const request_tmp = {
  "_id": "5a91266739b6bd4e0cc199d2",
  "accept_answer": "5a91282939b6bd4e0cc199db",
  "category": [
    "Business",
    "Government"
  ],
  "create_time": "2018-02-24 08:56:52.084000",
  "description": "I just got an Oops! Something Bad Happened! error, while opening this question. This question works now, it was only a temporary problem.\n\nHowever, when this happens, you get redirected to this URL. From there, you can't hit F5 (refresh) to try to reload the question. You have to find and open the original link to the question again.\n\nIt would be nice, if the URL would not be altered, so that F5 works (or a refresh of the error page tries to redirect to the original question, if available).",
  "input": "a picture",
  "output": "some description of the pic",
  "star_user": [
    "5a01c3ff0c11f3291b0e5ca9",
    "59c08c950c11f387a185cce6"
  ],
  "status": 0,
  "tags": [
    "cnn",
    "lstm",
    "tag"
  ],
  "title": "superuser的提问2",
  "user_id": "super_user",
  "votes_up_user": []
}
