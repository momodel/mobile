import React, {Component} from 'react'
import {StyleSheet, View, Image, Text, ScrollView, FlatList, RefreshControl} from 'react-native'
import {connect} from 'react-redux'
import {ActivityIndicator} from 'antd-mobile'

import {createAction, NavigationActions, objectIdToImg, messageObjToContent} from '../utils'
import {MessageItem} from '../components/Item'

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


  _renderItem = ({item}) => {

    // return <Text>
    // </Text>
    const message = item
    const {
      _id, create_time, is_read, sender, user_request,
      user_ID, user_request_title, receiver_id, message_type
    } = message
    const content = messageObjToContent(message)
    //`${user_ID}评论了您关注的需求${user_request_title}`

    return <MessageItem
      key={_id}
      content={_id}
      sender={"system"}
      datetime={create_time}
      onPress={() => {
        if(message_type === 'answer' || message_type === "comment"){
          this.toMessage(user_request, receiver_id)
        }
      }
      }
      isRead={is_read}
      source={objectIdToImg(sender)}
    />
  }

  _keyExtractor = (item, index) => item._id;

  _renderFooter = () => {
    console.log("loadingMore", this.props.loadingMore)

    if (this.props.loadingMore) {
      return (
        <View
          style={{paddingVertical: 10, justifyContent: 'center', alignItems: 'center'}}
        >
          <Text>加载中...</Text>
        </View>
      )
    }
    return null
  }

  // renderFooter = () => {
  //   let footer = null;
  //   if (typeof this.props.refreshing !== "boolean" && this.props.refreshing === FlatListState.LoadMore) {
  //     footer = (
  //       <View style={styles.footerStyle}>
  //         <ActivityIndicator size="small" color="#888888"/>
  //         <Text style={styles.footerText}>数据加载中…</Text>
  //       </View>
  //     )
  //   }
  //   return footer;
  // }

  render() {
    const {messages, refreshing, loadingMore, pageNo} = this.props

    return (
      !messages ? <ActivityIndicator /> :
        (
          messages.length === 0 ? <InfoPage text="暂无信息"/> :
            <FlatList
              data={messages}
              extraData={this.state}
              keyExtractor={this._keyExtractor}
              renderItem={this._renderItem}
              ListFooterComponent={this._renderFooter}
              ListEmptyComponent={emptyComponent}

              onEndReachedThreshold={0.1}
              onEndReached={(distanceFromEnd)=>{
                console.log("onEndReached", distanceFromEnd)
                this.props.dispatch({
                  type: 'messages/loadingMoreMessage',
                  payload: {
                    pageNo: pageNo + 1
                  }
                })
              }}

              refreshing={refreshing}
              onRefresh={()=>this.props.dispatch({
                type: 'messages/getMessages',
                payload: {
                  pageNo: 1
                }
              })}
              // refreshControl={
              //   <RefreshControl
              //     refreshing={refreshing}
              //     onRefresh={()=>this.props.dispatch({
              //       type: 'messages/getMessages',
              //       payload: {
              //         pageNo: 1
              //       }
              //     })
              //     }
              //     tintColor={"grey"}
              //     title="加载中..."
              //     titleColor={"grey"}
              //     colors={['#ff0000', '#00ff00', '#0000ff']}
              //     progressBackgroundColor="#ffff00"
              //   />
              // }
            />
        )
    )





    // return (
    //   fetching ? <ActivityIndicator /> :
    //   <ScrollView style={styles.container}
    //               keyboardShouldPersistTaps="always"
    //   >
    //     {
    //       messages.length === 0 ? <InfoPage text="暂无信息"/> :
    //         messages.map(message => {
    //             const {
    //               _id, create_time, is_read, sender, user_request,
    //               user_ID, user_request_title, receiver_id, message_type
    //             } = message
    //             const content = messageObjToContent(message)
    //           //`${user_ID}评论了您关注的需求${user_request_title}`
    //
    //             return <MessageItem
    //               key={_id}
    //               content={content}
    //               sender={"system"}
    //               datetime={create_time}
    //               onPress={() => {
    //                 if(message_type === 'answer' || message_type === "commit"){
    //                   this.toMessage(user_request, receiver_id)
    //                 }
    //
    //               }
    //               }
    //               isRead={is_read}
    //               source={objectIdToImg(sender)}
    //             />
    //           }
    //         )
    //     }
    //   </ScrollView>
    // )
  }
}

const InfoPage = ({text}) => {
  return (
    <View style={{minHeight: 200, alignItems: "center", justifyContent: "center"}}>
      <Text>
        {text}
      </Text>
    </View>
  )
}

const emptyComponent = () => {
  return <View style={{
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  }}>
    <Text style={{
      fontSize: 16
    }}>暂无数据下拉刷新</Text>
  </View>
}



const styles = StyleSheet.create({
  container: {},
  icon: {
    width: 32,
    height: 32,
  },


  // remove
  footerStyle: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
    height: 44,
  },
  footerText: {
    fontSize: 14,
    color: '#555555',
    marginLeft: 7
  },
  emptyText: {
    fontSize: 17,
    color: '#666666'
  }
})

export default Message
