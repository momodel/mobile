
import * as userRequestService from '../services/userRequest'
import * as requestCommentService from '../services/requestComment'
import * as requestAnswerService from '../services/requestAnswer'

export default {
  namespace: 'request',
  state: {
    title: null,

    comments: [],
    answers: []
  },

  reducers: {
    updateState(state, {payload}) {
      return {...state, ...payload}
    },

  },
  effects: {
    * getRequest({payload}, {call, put, select}) {
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
      const result = yield call(requestCommentService.getRequestComments, {
        ...payload,
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


  }
}
