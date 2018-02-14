import request, { customRequest } from '../utils/request'

import { MOCK } from '../Global'
import { apiList } from './mockData'

const prefix = '/user_request'


// 新建 request
export function createNewUserRequest(payload) {
  const {callback, onSuccess, onError} = payload

  // let category = encodeURIComponent(payload.category)
  // payload.user_ID = localStorage.getItem('user_ID')
  // noinspection JSAnnotator
  return customRequest(`${prefix}`, {
    method: 'post',
    body: {
      user_id:payload.user_ID,
      request_title:payload.requestTitle,
      request_input:payload.requestInput,
      request_output:payload.requestOutput,
      request_description:payload.requestDescription,
      request_tags:payload.requestTags,
      request_category:payload.requestCategory,
      request_dataset:payload.requestDataset,
    },
  }, callback, onSuccess, onError);
}
