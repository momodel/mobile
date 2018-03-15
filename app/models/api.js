import {createAction, NavigationActions, Storage} from '../utils'
import * as userService from '../services/user'
import * as apiService from '../services/api'


export default {
  namespace: 'api',
  state: {
    app: {},
    api_response: null,

    // favor_users: [],
    // tags: [],
    // input_type: [],
    // output_type: [],
    // category: [],
    // args: null,


    // name: '',
    // desc: '',

    // apiDetail: null

    // isUp: false,
    // isStar: false,
    // upNum: 0,
    // startNum: 0,


  },

  reducers: {
    updateState(state, {payload}) {
      return {...state, ...payload}
    },

    // updateApi(state, {payload}) {
    //   return {
    //     ...state,
    //     ...payload
    //   }
    // }

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


    * favorApi({payload}, {call, put, select}) {
      // const user_ID = yield select(state => state.app.username)
      const result = yield call(userService.favorApi, {
        ...payload,
        // user_ID
      })

      yield put({
        type: 'updateState',
        payload: {
          app: result.response.entity
        }
      })
      // yield put({
      //   type: 'updateState',
      //   payload: {apiDetail: result.response}
      // })

    },


    * runApi({payload}, {call, put, select}) {
      // const user_ID = yield select(state => state.app.username)
      const result = yield call(apiService.runApi, {
        ...payload,
      })
      yield put({
        type: 'updateState',
        payload: {
          api_response: result.response
        }
      })
    }





  }
}
