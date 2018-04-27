import * as messageService from '../services/message'
const pageSize=10
// 用于其他几个model的分页
// reducers
export function refreshObjects(state, {payload, extra: {objectsName}}) {
  if (state[objectsName] === null) {
    return {...state, [objectsName]: payload[objectsName], pageNo: 1}
  } else {
    return {...state, [objectsName]: payload[objectsName]}
  }
  // if (state[objectsName] === null) {
  //   return {...state, messages: payload.messages, pageNo: 1}
  // } else {
  //   const {messages} = state
  //   // 如果payload message不在messages里，则添加
  //   // payload.messages.concat(messages)
  //   return {...state, messages: payload.messages}
  // }
}

export function reducersLoadMoreObjects(state, {payload, extra: {objectsName}}) {
  const {[objectsName]: obj} = state
  return {...state, [objectsName]: obj.concat(payload[objectsName]), pageNo: payload.pageNo}
}

// effects
export function* getObjects({payload, extra: {objectsName, services, responseField}}, {call, put, select}) {
  yield put({
    type: 'updateState',
    payload: {
      refreshing: true
    }
  })
  const result = yield call(services, payload)
  console.log("result", result)
  console.log("responseField", responseField)

  yield put({
    type: 'refreshMessages',
    payload: {
      [objectsName]: result.response[responseField?responseField:objectsName],
    }
  })
  yield put({
    type: 'updateState',
    payload: {
      // messages: result.response,
      refreshing: false,
      total_number: result.response.total_number
    }
  })
}

export function* loadMoreObjects({payload, extra: {objectsName, stateName, services, responseField}}, {call, put, select}) {
  const loadingMore = yield select((state) => state[stateName].loadingMore)
  const total_number = yield select((state) => state[stateName].total_number)
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
      [objectsName]: result.response[responseField?responseField:objectsName],
      pageNo: payload.pageNo
    }
  })
  yield put({
    type: 'updateState',
    payload: {
      // messages: messages.concat(result.response),
      loadingMore: false,
      total_number: result.response.total_number
    }
  })
}

export default {
  namespace: 'messages',
  state: {
    messages: null,
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
      return refreshObjects(state, {payload, extra: {objectsName: 'messages'}})
    },

    // 加到后面
    loadingMoreMessages(state, {payload}) {
      return reducersLoadMoreObjects(state, {payload, extra: {objectsName: 'messages'}})
      // const {messages} = state
      // return {...state, messages: messages.concat(payload.messages), pageNo: payload.pageNo}
    },
  },
  effects: {
    * getMessages({payload}, {call, put, select}) {
      yield call(getObjects, {payload, extra: {objectsName: "messages", services: messageService.getMessages}}, {call, put, select})
    },

    * loadingMoreMessage({payload}, {call, put, select}) {
      yield call(loadMoreObjects, {
        payload, extra: {
          objectsName: "messages",
          stateName: 'messages',
          services: messageService.getMessages
        }
      }, {call, put, select})
    },

    * readMessage(action, {call, put, select}) {
      let payload = action.payload
      yield call(messageService.readMessage, payload)
      yield put({
        type: 'changeMessageState',
        payload: {receiver_id: payload.receiver_id}
      })
    },
  }

}
