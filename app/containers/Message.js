import React, {Component} from 'react'
import {StyleSheet, View, Image, Text} from 'react-native'
import {connect} from 'react-redux'
import {createAction, NavigationActions, objectIdToImg, messageObjToContent} from '../utils'
import {MessageItem} from '../components/Item'
import {CustomFlatList} from '../components/CustomFlatList'

@connect(({messages}) => ({...messages}))
class Message extends Component {
  componentDidMount() {
    this.props.dispatch({
      type: 'messages/getMessages',
      payload: {
        pageNo: 1
      }
    })
  }

  toMessage = (message) => {
    const { user_request, receiver_id, message_type, project_type, project_id }= message
    if (message_type === 'answer' || message_type === "comment") {
      this.props.dispatch(
        NavigationActions.navigate({
          routeName: 'Request',
          params: {
            request: {
              _id: user_request
            }
          },
        }))
    }else if(message_type==="commit" && project_type==="app"){
      this.props.dispatch(
        NavigationActions.navigate({
          routeName: 'AppDetail',
          params: {api: {_id: project_id}},
        }))
    }
    this.props.dispatch({
      type: 'messages/readMessage',
      payload: {receiver_id: receiver_id},
    })
  }

  _renderItem = ({item}) => {
    const message = item
    const {
      _id, create_time, is_read, sender, user_request,
      user_ID, user_request_title, receiver_id, message_type
    } = message
    const content = messageObjToContent(message)
    //`${user_ID}评论了您关注的需求${user_request_title}`

    return <MessageItem
      key={_id}
      content={content}
      sender={"system"}
      datetime={create_time}
      onPress={() => {
        this.toMessage(message)}}
      isRead={is_read}
      source={objectIdToImg(sender)}
    />
  }

  render() {
    const {messages, refreshing, loadingMore, pageNo, noMore} = this.props
    return (
      <CustomFlatList
        dataItems={messages}
        state={this.state}
        renderItem={this._renderItem}
        noMore={noMore} loadingMore={loadingMore} refreshing={refreshing}
        onEndReached={(distanceFromEnd) => {
          // console.log("onEndReached", distanceFromEnd)
          this.props.dispatch({
            type: 'messages/loadingMoreMessage',
            payload: {
              pageNo: pageNo + 1
            }
          })
        }}
        onRefresh={() => this.props.dispatch({
          type: 'messages/getMessages',
          payload: {
            pageNo: 1
          }
        })}
      />
    )
  }
}


const styles = StyleSheet.create({
  container: {},
  icon: {
    width: 32,
    height: 32,
  },

})

export default Message
