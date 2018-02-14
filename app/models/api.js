import {createAction, NavigationActions, Storage} from '../utils'
import * as userService from '../services/user'

export default {
  namespace: 'api',
  state: {
    name: '',
    desc: '',
  },

  reducers: {
    updateState(state, {payload}) {
      return {...state, ...payload}
    },
  },
  effects: {
    * favorApi({payload}, {call, put, select}) {
      const user_ID = yield select()
      const login = yield call(userService.favorApi, {
        ...payload,
        user_ID
      })

    }
  }
}
