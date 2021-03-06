import { createAction, NavigationActions, Storage } from '../utils'
import { register, send_verification_code } from '../services/user'
import { Toast } from 'antd-mobile'

export default {
  namespace: 'register',

  state: {
    status: undefined,
  },

  effects: {
    *submit({ payload }, { call, put }) {
      yield put({
        type: 'changeSubmitting',
        payload: true,
      })
      const response = yield call(register, payload)

      if(response.status === 200){
        Toast.success('Register Success!', 1)
        yield put({
          type: 'registerHandle',
          payload: {status: response.status===200?"ok":"failed"},
        })
        yield put({
          type: 'changeSubmitting',
          payload: false,
        })
        yield put(NavigationActions.navigate({ routeName: 'Login' }))

      }else{
        let message = response.data.error.message
        Toast.fail(message, 1)
      }

    },

    *sendVerificationCode({ payload }, { call, put }) {
      const response = yield call(send_verification_code, payload)
      if(response.status === 200){
        Toast.success('验证码发送成功!', 1)
      }else{
        let message = response.response.error.message
        Toast.fail(message, 1)
      }

    }
  },

  reducers: {
    registerHandle(state, { payload }) {
      return {
        ...state,
        status: payload.status,
      }
    },
    changeSubmitting(state, { payload }) {
      return {
        ...state,
        submitting: payload,
      }
    },
  },
}
