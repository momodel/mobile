import { createAction, NavigationActions, Storage } from '../utils'
import * as authService from '../services/auth'

export default {
  namespace: 'api',
  state: {
    name: '',
    desc: '',
  },
}
