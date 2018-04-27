import React, {Component} from 'react'
import {StyleSheet, View, Image, Text, ScrollView} from 'react-native'
import {connect} from 'react-redux'
import {RequestItem} from '../components/Item'
import {NavigationActions, showTime} from '../utils'
import {CustomFlatList} from '../components/CustomFlatList'

@connect(({requests}) => ({...requests}))
export default class Requests extends Component {
  componentDidMount() {
    this.props.dispatch({
      type: "requests/getRequests",
      payload: {
        pageNo: 1
      }
    })
  }


  _renderItem = ({item}) => {
    const {_id, title, create_time, answer_number, star_user, comment_number} = item
    return <View style={styles.container} key={_id}>
      <RequestItem
        title={title}
        datetime={showTime(create_time)}
        commitNum={comment_number} answerNum={answer_number} favorNum={star_user.length}
        onPress={() => {
          this.props.dispatch(
            NavigationActions.navigate({
              routeName: 'Request',
              params: {item},
            }))
        }}
      />
    </View>
  }

  render() {
    const {requests, refreshing, loadingMore, pageNo, noMore} = this.props
    return (
      <CustomFlatList
        dataItems={requests}
        // state={this.state}
        renderItem={this._renderItem}
        noMore={noMore} loadingMore={loadingMore} refreshing={refreshing}
        onEndReached={(distanceFromEnd) => {
          console.log("distanceFromEnd", distanceFromEnd)
          this.props.dispatch({
            type: 'requests/loadingMoreRequests',
            payload: {
              pageNo: pageNo + 1
            }
          })
        }}
        onRefresh={() => this.props.dispatch({
          type: 'requests/getRequests',
          payload: {
            pageNo: 1
          }
        })}
      />
    )

  }

  // render() {
  //   const {requests} = this.props
  //   return (
  //     <ScrollView
  //       keyboardShouldPersistTaps="always">
  //       {
  //         requests.map((request) => {
  //           const {_id, title, create_time, answer_number, star_user, comment_number} = request
  //           return <View style={styles.container} key={_id}>
  //             <RequestItem
  //               title={title}
  //               datetime={showTime(create_time)}
  //               commitNum={comment_number} answerNum={answer_number} favorNum={star_user.length}
  //               onPress={() => {
  //                 this.props.dispatch(
  //                   NavigationActions.navigate({
  //                     routeName: 'Request',
  //                     params: {request},
  //                   }))
  //               }}
  //             />
  //           </View>
  //         })
  //       }
  //     </ScrollView>
  //   )
  // }
}

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    // alignItems: 'center',
    // justifyContent: 'center',
  },
})
