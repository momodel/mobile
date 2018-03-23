import request, { customRequest } from '../utils/request'

import { MOCK } from '../Global'
import { apiList } from './mockData'

const prefix = '/user_requests'


// 新建 request
export function createNewUserRequest(payload) {
  const {callback, onSuccess, onError} = payload

  // let category = encodeURIComponent(payload.category)
  // payload.user_ID = localStorage.getItem('user_ID')
  // noinspection JSAnnotator
  return customRequest(`${prefix}`, {
    method: 'post',
    body: {
      // user_id:payload.user_ID,
      title:payload.requestTitle,
      // input:payload.requestInput,
      // output:payload.requestOutput,
      description:payload.requestDescription,
      // tags:payload.requestTags,
      // category:payload.requestCategory,
      // request_dataset:payload.requestDataset,
      type: payload.type
    },
  }, callback, onSuccess, onError);
}

export const getRequest = (payload) => {
  return request(`${prefix}/${payload.requestId}`)
}

export const getRequests = (payload) => {
  return request(`${prefix}?user_ID=${payload.user_ID}`)
}
