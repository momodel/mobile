import React, {Component} from 'react'
import {StyleSheet, View, Image, Text, ScrollView} from 'react-native'
import {connect} from 'react-redux'

import {createAction, NavigationActions} from '../utils'
import {MessageItem} from '../components/Item'
import {avatarList} from '../Global'

@connect(({messages}) => ({...messages}))
class Message extends Component {
  componentDidMount() {
    this.props.dispatch({
      type: 'messages/getMessages'
    })
  }

  toMessage = (user_request, receiver_id) => {
    this.props.dispatch(
      NavigationActions.navigate({
        routeName: 'Request',
        params: {
          request: {
            _id: user_request
          }
        },
      }))

    this.props.dispatch({
      type: 'messages/readMessage',
      payload: {receiver_id: receiver_id},
    })
  }

  render() {
    const {messages} = this.props

    return (
      <ScrollView style={styles.container}
                  keyboardShouldPersistTaps="always"
      >
        {
          messages.length === 0 ? <InfoPage text="暂无信息"/> :
            messages.map(message => {
                const {
                  _id, create_time, is_read, sender, user_request,
                  user_ID, user_request_title, receiver_id
                } = message
                const content = `${user_ID}评论了您关注的需求${user_request_title}`
                const picNumber = parseInt(sender.slice(20)) % 6
                const source = avatarList[picNumber]
                return <MessageItem
                  key={_id}
                  content={content}
                  sender={"system"}
                  datetime={create_time}
                  onPress={() => {
                    this.toMessage(user_request, receiver_id)
                  }
                  }
                  isRead={is_read}
                  source={source}
                />
              }
            )
        }
      </ScrollView>
    )
  }
}

const InfoPage = ({text}) => {
  return (
    <View style={{alignItems: "center", justifyContent: "center"}}>
      <Text>
        {text}
      </Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {},
  icon: {
    width: 32,
    height: 32,
  },
})

export default Message
