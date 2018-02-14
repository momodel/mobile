import * as authService from '../services/auth'
import { createAction, NavigationActions, Storage } from '../utils'


export default {
  namespace: 'auth',
  state: {
    phone: null,
    message_id: null,
  },
  reducers: {
    updateState(state, { payload }) {
      return { ...state, ...payload }
    },
  },

  effects: {
    // 获取验证码
    * getVerificationCode({payload}, { call, put }){
      // 发送验证码请求
      const result = yield call(authService.get_verification_code, payload)

      // 请求成功后跳转页面
      yield put(NavigationActions.navigate({ routeName: 'ResetPassword' }))
    }


  }

}
