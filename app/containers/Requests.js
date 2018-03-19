import React, {Component} from 'react'
import {StyleSheet, View, Image, Text, ScrollView} from 'react-native'
import {connect} from 'react-redux'
import {RequestItem} from '../components/Item'
import {NavigationActions, showTime} from '../utils'

@connect(({requests}) => ({...requests}))
export default class Requests extends Component {
  componentDidMount() {
    this.props.dispatch({
      type: "requests/getRequests"
    })
  }

  render() {

    const {requests} = this.props
    return (
      <ScrollView
        keyboardShouldPersistTaps="always">
        {
          requests.map((request) => {
            const {_id, title, create_time, answer_number, star_user} = request
            return <View style={styles.container} key={_id}>
              <RequestItem
                title={title}
                datetime={showTime(create_time)}
                commitNum={"暂无"} answerNum={answer_number} favorNum={star_user.length}
                onPress={() => {
                  this.props.dispatch(
                    NavigationActions.navigate({
                      routeName: 'Request',
                      params: {request},
                    }))
                }}
              />
            </View>
          })
        }
      </ScrollView>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    // alignItems: 'center',
    // justifyContent: 'center',
  },
})
