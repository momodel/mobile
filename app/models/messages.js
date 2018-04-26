import * as messageService from '../services/message'

export default {
  namespace: 'messages',
  state: {
    messages: null,
    // fetching: false,

    // 现有messages的页码
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
      if (state.messages === null) {
        return {...state, messages: payload.messages, pageNo: 1}
      } else {
        const {messages} = state
        payload.messages.concat(messages)
        return {...state, messages}
      }
    },

    // 加到后面
    loadingMoreMessages(state, {payload}) {
      const {messages} = state
      return {...state, messages: messages.concat(payload.messages), pageNo: payload.pageNo}
    },
  },
  effects: {
    * getMessages({payload}, {call, put, select}) {
      yield put({
        type: 'updateState',
        payload: {
          refreshing: true
        }
      })
      const result = yield call(messageService.getMessages, payload)

      yield put({
        type: 'refreshMessages',
        payload: {
          messages: result.response.messages,
        }
      })
      yield put({
        type: 'updateState',
        payload: {
          // messages: result.response,
          refreshing: false,
          total_number: result.response.total_number
        }
      })
    },

    * loadingMoreMessage({payload}, {call, put, select}) {
      const loadingMore = yield select((state) => state.messages.loadingMore)
      const total_number = yield select((state) => state.messages.total_number)

      if(loadingMore){
        return
      }

      if(payload.pageNo > total_number/10){
        yield put({
          type: 'updateState',
          payload: {
            noMore: true
          }
        })
        return
      }

      yield put({
        type: 'updateState',
        payload: {
          loadingMore: true
        }
      })
      const result = yield call(messageService.getMessages, payload)
      // const messages = yield select((state) => state.messages.messages)
      yield put({
        type: 'loadingMoreMessages',
        payload: {
          messages: result.response.messages,
          pageNo: payload.pageNo
        }
      })
      yield put({
        type: 'updateState',
        payload: {
          // messages: messages.concat(result.response),
          loadingMore: false,
          total_number: result.response.total_number
        }
      })

    },

    * readMessage(action, {call, put, select}) {
      let payload = action.payload
      yield call(messageService.readMessage, payload)
      yield put({
        type: 'changeMessageState',
        payload: {receiver_id: payload.receiver_id}
      })
    },
  }

}
