import { createAction, NavigationActions, Storage } from '../utils'
import * as userService from '../services/user'

export default {
  namespace: 'appList',
  state: {
    // apps 使用记录
    usedApps: [],
    // 收藏的 apps
    favorApps: [],
  },
  reducers: {
    updateState(state, { payload }) {
      return { ...state, ...payload }
    },

  },
  effects: {
    * getUsedApps({payload}, {call, put, select}) {
      // const result = yield call(userService.getUsedApps, {})
      // yield put({
      //   type: 'updateState',
      //   payload: {
      //     usedApps: result.response.objects
      //   }
      // })
    },

    * getFavorApps({payload}, {call, put, select}) {
      const result = yield call(userService.getfavorApps, payload)
      console.log("result", result)

      yield put({
        type: 'updateState',
        payload: {
          favorApps: result.response.objects
        }
      })
    }
  }
}
