import { createAction, NavigationActions, Storage } from '../utils'
import * as authService from '../services/user'
import { Toast } from 'antd-mobile'

export default {
  namespace: 'app',
  state: {
    login: false,
    loading: true,
    fetching: false,

    username: '',
    password: '',
    token: '',
    registration_id: '',
  },
  reducers: {
    updateState(state, { payload }) {
      return { ...state, ...payload }
    },
  },
  effects: {
    *loadStorage(action, { call, put }) {
      const login = yield call(Storage.get, 'login', false)
      const username = yield call(Storage.get, 'username', '')
      const password = yield call(Storage.get, 'password', '')
      const token = yield call(Storage.get, 'token', '')

      yield put(
        createAction('updateState')({
          login,
          username,
          password,
          token,
          loading: false,
        })
      )
    },
    *login({ payload }, { call, put }) {
      const {username, password} = payload
      yield put(createAction('updateState')({ fetching: true }))
      const login = yield call(authService.login, payload)
      if (!(login instanceof Error ) && login.status === 200) {
        // 将 username password token存起来
        yield call(Storage.set, 'username', payload.username)
        yield call(Storage.set, 'password', payload.password)
        yield call(Storage.set, 'token', login.response.token)
        yield put(NavigationActions.navigate({ routeName: 'Main' }))
        yield put(createAction('updateState')({ login, username, password,fetching: false }))
        yield call(Storage.set, 'login', login)
      }
    },

    *loginWithPhone({ payload }, { call, put }) {
      // const {username, password} = payload
      yield put(createAction('updateState')({ fetching: true }))
      const response = yield call(authService.login_with_phone, payload)
      console.log("response", response)
      if(!(response instanceof Error ) && response.status === 200){
        yield call(Storage.set, 'token', response.response.token)
        yield put(NavigationActions.navigate({ routeName: 'Main' }))
        yield put(createAction('updateState')({ login: response, username: response.response.user.user_ID,fetching: false }))
        yield call(Storage.set, 'login', response)
      } else{
        let errorMessage = response.data.error.message
        Toast.fail(errorMessage, 1)
      }

    },


    *logout(action, { call, put }) {
      yield call(Storage.set, 'login', false)
      yield call(Storage.set, 'username', '')
      yield call(Storage.set, 'password', '')
      yield call(Storage.set, 'token', '')
      yield put(
        createAction('updateState')({
          login: false,
          username: '',
          password: '',
          token: '',
        })
      )

      yield put(NavigationActions.navigate({ routeName: 'Login' }))
      // yield put(
      //   NavigationActions.reset({
      //     index: 0,
      //     actions: [NavigationActions.navigate({ routeName: 'Login' })],
      //   })
      // )
    },
  },
  subscriptions: {
    setup({ dispatch }) {
      dispatch({ type: 'loadStorage' })
    },
  },
}
