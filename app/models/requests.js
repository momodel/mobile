import * as userRequestService from '../services/userRequest'

export default {
  namespace: 'requests',
  state: {
    requests: []
  },

  reducers: {
    updateState(state, {payload}) {
      return {...state, ...payload}
    },

  },
  effects: {
    // 获取用户发布的requests
    * getRequests({payload}, {call, put, select}) {
      const user_ID = yield select(state=>state.app.username)

      const result = yield call(userRequestService.getRequests, {
        user_ID
      })
      console.log("result", result)

      yield put({
        type: 'updateState',
        payload: {
          requests: result.response.user_request
        }
      })

    },

  }
}
