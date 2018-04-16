import * as messageService from '../services/message'

export default {
  namespace: 'messages',
  state: {
    messages: [],
    fetching: false
  },
  reducers: {
    updateState(state, {payload}) {
      return {...state, ...payload}
    },
  },
  effects: {
    * getMessages({payload}, {call, put, select}) {
      yield put({
        type: 'updateState',
        payload: {
          fetching: true
        }
      })

      const result = yield call(messageService.getMessages, {})
      yield put({
        type: 'updateState',
        payload: {
          messages: result.response,
          fetching: false
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
