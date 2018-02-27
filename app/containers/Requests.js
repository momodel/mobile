import React, {Component} from 'react'
import {StyleSheet, View, Image, Text} from 'react-native'
import {connect} from 'react-redux'
import {RequestCard} from '../components/RequestCard'
import {NavigationActions} from '../utils'

function FormatDate (strTime) {
  var date = new Date(strTime);
  return date.getFullYear()+"-"+(date.getMonth()+1)+"-"+date.getDate();
}
FormatDate("Tue Jul 16 01:07:00 CST 2013");

const requests = [
  {
    "_id": "5a9364bdd845c01eaf673d2f",
    "answer_number": 0,
    "category": [],
    "create_time": "2018-02-26 01:37:01.439000",
    "description": "`1`1`",
    "star_user": [],
    "status": 0,
    "tags": [],
    "title": "App request",
    "user_id": "bingwei",
    "votes_up_user": []
  },
  {
    "_id": "5a91266739b6bd4e0cc199d2",
    "accept_answer": "5a91282939b6bd4e0cc199db",
    "answer_number": 3,
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
  }]

@connect(({app}) => ({...app}))
export default class Requests extends Component {

  render() {

    return requests.map((request)=> {
      const {_id, title, create_time, answer_number, star_user} = request

      return <View style={styles.container}>
        <RequestCard title={title}
                     key={_id}
                     // title="我想找到和我最有夫妻脸的用户"
                     datetime={FormatDate(create_time)}
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
    }
    )
  }
}

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    // alignItems: 'center',
    // justifyContent: 'center',
  },
  // icon: {
  //   width: 32,
  //   height: 32,
  // },
})
