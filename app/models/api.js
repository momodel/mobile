// 单个app 正在使用

import {createAction, NavigationActions, Storage} from '../utils'
import * as userService from '../services/user'
import * as apiService from '../services/api'


export default {
  namespace: 'api',
  state: {
    app: {},
    api_response: null,
    fetch_api_response: false
  },

  reducers: {
    updateState(state, {payload}) {
      return {...state, ...payload}
    },

    updateApp(state, {payload}) {
      const {app} = payload
      return {
        ...state,
        app: {
          ...state.app,
          ...app,
        }
      }
    }
  },
  effects: {
    * getApi({payload}, {call, put, select}) {
      const result = yield call(apiService.getApi, {
        ...payload,
      })

      yield put({
        type: 'updateState',
        payload: {
          app: result.response
        }
      })

    },

    * starApi({payload}, {call, put, select}) {
      const result = yield call(userService.starApi, {
        ...payload,
      })

      yield put({
        type: 'updateApp',
        payload: {
          app: result.response.entity
        }
      })
    },

    * favorApi({payload}, {call, put, select}) {
      const result = yield call(userService.favorApi, {
        ...payload,
      })

      yield put({
        type: 'updateApp',
        payload: {
          app: result.response.entity
        }
      })
    },

    * runApi({payload}, {call, put, select}) {
      yield put({
        type: 'updateState',
        payload: {
          fetch_api_response: true
        }
      })
      // const fake_result = {
      //   "response": {
      //     "weather_prediction_out1": 1
      //   }
      // }
      // yield put({
      //   type: 'updateState',
      //   payload: {
      //     api_response: fake_result.response,
      //     fetch_api_response: false
      //   }
      // })
      // const user_ID = yield select(state => state.app.username)
      const result = yield call(apiService.runApi, {
        ...payload,
      })

      yield put({
        type: 'updateState',
        payload: {
          api_response: result.response,
          fetch_api_response: false
        }
      })
    }
  }
}
