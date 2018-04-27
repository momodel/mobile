import {reducersLoadMoreObjects, refreshObjects} from "./messages"
import * as userService from "../services/user"

// effects
export function* getObjects({payload, extra: {objectsName, services}}, {call, put, select}) {
  yield put({
    type: 'updateState',
    payload: {
      refreshing: true
    }
  })
  const result = yield call(services, payload)
  yield put({
    type: 'refreshMessages',
    payload: {
      [objectsName]: result.response.objects,

    }
  })
  yield put({
    type: 'updateState',
    payload: {
      // messages: result.response,
      refreshing: false,
      total_number: result.response.count,
      pageSize: result.response.page_size,
      pageNo: result.response.page_no,
    }
  })
}

export function* loadMoreObjects({payload, extra: {objectsName, stateName, services}}, {call, put, select}) {
  const loadingMore = yield select((state) => state[stateName].loadingMore)
  const total_number = yield select((state) => state[stateName].total_number)
  const pageSize = yield select((state) => state[stateName].pageSize)

  if (loadingMore) {
    return
  }
  // 判断是否还有更多
  if ((payload.pageNo-1)*pageSize > total_number ) {
    yield put({
      type: 'updateState',
      payload: {
        noMore: true
      }
    })
    return
  }else{
    yield put({
      type: 'updateState',
      payload: {
        noMore: false
      }
    })
  }
  yield put({
    type: 'updateState',
    payload: {
      loadingMore: true
    }
  })
  const result = yield call(services, payload)
  // const messages = yield select((state) => state.messages.messages)
  yield put({
    type: 'loadingMoreMessages',
    payload: {
      [objectsName]: result.response.objects,
      pageNo: payload.pageNo
    }
  })
  yield put({
    type: 'updateState',
    payload: {
      // messages: messages.concat(result.response),
      loadingMore: false,
      total_number: result.response.count,
      pageSize: result.response.page_size
    }
  })
}

export default {
  namespace: 'favorApps',
  state: {
    favorApps: null,
    // fetching: false,

    // 现有messages的页码
    pageNo: null,
    refreshing: false,
    loadingMore: false,
    total_number: null,
    noMore: false
  },
  reducers: {
    updateState(state, {payload}) {
      return {...state, ...payload}
    },

    // 空的就覆盖， 有就加到前面
    refreshMessages(state, {payload}) {
      return refreshObjects(state, {payload, extra: {objectsName: 'favorApps'}})
    },

    // 加到后面
    loadingMoreMessages(state, {payload}) {
      return reducersLoadMoreObjects(state, {payload, extra: {objectsName: 'favorApps'}})
      // const {messages} = state
      // return {...state, messages: messages.concat(payload.messages), pageNo: payload.pageNo}
    },
  },
  effects: {
    * getFavorApps({payload}, {call, put, select}) {
      yield call(getObjects, {payload, extra: {objectsName: "favorApps", services: userService.getfavorApps}}, {call, put, select})
    },

    * loadingMoreFavorApps({payload}, {call, put, select}) {
      yield call(loadMoreObjects, {
        payload, extra: {
          objectsName: "favorApps",
          stateName: 'favorApps',
          services: userService.getfavorApps
        }
      }, {call, put, select})
    },
  }

}
