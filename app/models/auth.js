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
}
