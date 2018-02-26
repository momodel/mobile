import { createAction, NavigationActions, Storage } from '../utils'
// import * as authService from '../services/auth'

export default {
  namespace: 'apiList',
  state: {
    content: '',
    pageNo: 1,
  },
  reducers: {
    updateState(state, { payload }) {
      return { ...state, ...payload }
    },


  },
  effects: {

  }
}
