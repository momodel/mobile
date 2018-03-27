import { createAction, NavigationActions, Storage } from '../utils'

import * as userRequestService from '../services/userRequest'
import * as requestCommentService from '../services/requestComment'
import * as requestAnswerService from '../services/requestAnswer'

export default {
  namespace: 'request',
  state: {
    title: null,
    _id: null,

    comments: [],
    answers: []
  },

  reducers: {
    updateState(state, {payload}) {
      return {...state, ...payload}
    },

    updateComments(state, {payload}) {

      return {
        ...state,
        comments: state.comments.push(payload.comment)
      }
    }

  },
  effects: {
    * getRequest({payload}, {call, put, select}) {
      // yield put({
      //   type: 'updateState',
      //   payload: {
      //     _id: payload.requestId
      //   }
      // })

      const result = yield call(userRequestService.getRequest, {
        ...payload,
      })
      console.log("result", result)

      yield put({
        type: 'updateState',
        payload: {
          ...result.response
        }
      })

    },


    * getComments({payload}, {call, put, select}) {
      // const requestId = yield select(state=>state.request._id)

      const result = yield call(requestCommentService.getRequestComments, {
        ...payload,
        // requestId
      })
      console.log("result", result)

      yield put({
        type: 'updateState',
        payload: {
          comments: result.response
        }
      })

    },

    * getAnswers({payload}, {call, put, select}) {
      const result = yield call(requestAnswerService.getRequestAnswer, {
        ...payload,
      })
      console.log("result", result)

      yield put({
        type: 'updateState',
        payload: {
          answers: result.response
        }
      })

    },


    * sendComment({payload}, {call, put, select}) {
      const user_request_id = yield select((state)=>state.request._id)
      const user_id = yield select(state=>state.app.username)

      const result = yield call(requestCommentService.createUserRequestComments, {
        ...payload,
        user_request_id,
        user_id
      })
      console.log("result", result)
      // 如果成功， 提示成功，更新 comments
      if(result.response === "create user_request_comments success"){
        // 重新获取comments
        yield put({
          type: "getComments",
          payload: {
            requestId: user_request_id
          }
        })
      }

      // yield put({
      //   type: 'updateComments',
      //   payload: {
      //     comment: result.response[0]
      //   }
      // })
    },

    * sendAnswerComment({payload}, {call, put, select}) {
      const user_request_id = yield select((state)=>state.request._id)
      const user_id = yield select(state=>state.app.username)

      const result = yield call(requestCommentService.createUserRequestAnswerComments, {
        ...payload,
        user_request_id,
        user_id
      })
      console.log("result", result)
      // 如果成功， 提示成功，更新 comments
      if(result.response === "create user_request_comments success"){
        // 重新获取comments
        yield put({
          type: "getAnswers",
          payload: {
            requestId: user_request_id
          }
        })
      }

      // yield put({
      //   type: 'updateComments',
      //   payload: {
      //     comment: result.response[0]
      //   }
      // })
    },

    * updateUserRequest({payload}, {call, put, select}) {
      const result = yield call(userRequestService.updateUserRequest, {
        ...payload,
      })

      console.log("result", result)

      yield put({
        type: 'updateState',
        payload: {
          ...result.response
        }
      })

      yield put(NavigationActions.back())


    }







  }
}
