import { createAction, NavigationActions, Storage } from '../utils'
import * as userService from '../services/user'

export default {
  namespace: 'appList',
  state: {
    usedApps: []
  },
  reducers: {
    updateState(state, { payload }) {
      return { ...state, ...payload }
    },

  },
  effects: {
    * getUsedApps({payload}, {call, put, select}) {
      const result = yield call(userService.getUsedApps, {})
      yield put({
        type: 'updateState',
        payload: {
          usedApps: result.response.objects
        }
      })

    },
  }
}
