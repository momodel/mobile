import * as userRequestService from '../services/userRequest'
import {getObjects, loadMoreObjects, reducersLoadMoreObjects, refreshObjects} from "./messages"
import * as messageService from "../services/message"

export default {
  namespace: 'requests',
  state: {
    requests: null,

    pageNo: null,
    refreshing: false,
    loadingMore: false,
    total_number: null,
    noMore: false
  },

  reducers: {
    updateState(state, {payload}) {
      return {...state, ...payload}
    },

    // 空的就覆盖， 有就加到前面
    refreshMessages(state, {payload}) {
      return refreshObjects(state, {payload, extra: {objectsName: 'requests'}})
    },

    // 加到后面
    loadingMoreMessages(state, {payload}) {
      return reducersLoadMoreObjects(state, {payload, extra: {objectsName: 'requests'}})
      // const {messages} = state
      // return {...state, messages: messages.concat(payload.messages), pageNo: payload.pageNo}
    },

  },
  effects: {
    * getRequests({payload}, {call, put, select}) {
      const user_ID = yield select(state => state.app.username)
      const newPayload = {...payload, user_ID}
      yield call(getObjects, {
        payload: newPayload,
        extra: {
          objectsName: "requests",
          services: userRequestService.getRequests,
          responseField: "user_request"
        }
      }, {call, put, select})
    },

    * loadingMoreRequests({payload}, {call, put, select}) {
      const user_ID = yield select(state => state.app.username)
      const newPayload = {...payload, user_ID}

      yield call(loadMoreObjects, {
        payload: newPayload, extra: {
          objectsName: "requests",
          stateName: 'requests',
          services: userRequestService.getRequests,
          responseField: "user_request"
        }
      }, {call, put, select})
    },


  }
}
