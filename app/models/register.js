import { message } from 'antd'
import { routerRedux } from 'dva/router'
import { register, send_verification_code } from '../services/register'

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
        message.success('Register Success!')
        yield put({
          type: 'registerHandle',
          payload: {status: response.status===200?"ok":"failed"},
        })
        yield put({
          type: 'changeSubmitting',
          payload: false,
        })
        yield put(routerRedux.push('/user/login'))
      }else{
        let message = response.data.error.message
        message.error(message)
      }

    },

    *sendVerificationCode({ payload }, { call, put }) {
      const response = yield call(send_verification_code, payload)
      console.log("response", response)
      if(response.status === 200){
        message.success('验证码发送成功!')
      }else{
        let message = response.data.error.message
        message.error(message)
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
