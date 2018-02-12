import { createAction, NavigationActions, Storage } from '../utils'
import * as authService from '../services/auth'

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
      yield put(createAction('updateState')({ fetching: true }))
      const login = yield call(authService.login, payload)

      if (!(login instanceof Error)) {
        // 将 username password token存起来
        yield call(Storage.set, 'username', payload.username)
        yield call(Storage.set, 'password', payload.password)
        yield call(Storage.set, 'token', login.response.token)
        yield put(
          NavigationActions.reset({
            index: 0,
            actions: [NavigationActions.navigate({ routeName: 'Main' })],
          })
        )
      }
      yield put(createAction('updateState')({ login, fetching: false }))
      Storage.set('login', login)
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
