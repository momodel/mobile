import * as messageService from '../services/message'

export default {
  namespace: 'messages',
  state: {
    messages: []
  },
  reducers: {
    updateState(state, {payload}) {
      return {...state, ...payload}
    },
  },
  effects: {
    * getMessages({payload}, {call, put, select}) {
      const result = yield call(messageService.getMessages, {})
      yield put({
        type: 'updateState',
        payload: {
          messages: result.response
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
