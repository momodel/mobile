// app 列表
import { createAction, NavigationActions, Storage } from '../utils'
import * as userService from '../services/user'

export default {
  namespace: 'appList',
  state: {
    // apps 使用记录
    usedApps: [],
    // 收藏的 apps
    fetching: false,

    favorApps: [],
    // pageNo: null,
    // refreshing: false,
    // loadingMore: false,
    // total_number: null,
    // noMore: false


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
      yield put({
        type: 'updateState',
        payload: {
          fetching: true
        }
      })
      const result = yield call(userService.getfavorApps, payload)
      yield put({
        type: 'updateState',
        payload: {
          fetching: false
        }
      })
      yield put({
        type: 'updateState',
        payload: {
          favorApps: result.response.objects
        }
      })
    }
  }
}
