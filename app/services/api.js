import request, { customRequest } from '../utils/request'

import { MOCK } from '../Global'
import { apiList } from './mockData'

const prefix = '/api'
const defaultPageSize = 5
const defaultPageNo = 1

const getApiList = async (
  { keyword, pageNo = defaultPageNo, pageSize = defaultPageSize, user_ID },
  callback,
  onSuccess,
  onError
) => {
  if (MOCK) {
    let apiList_1 = pagination(pageNo, pageSize, apiList)
    onSuccess && onSuccess(apiList_1)
    return apiList_1
  }
  return await customRequest(
    `${prefix}get_matched_apis?
  search_query=${keyword}
  &get_type=chat
  $user_ID=${user_ID}
  &page_no=${pageNo}
  &page_size=${pageSize}`,
    {},
    callback,
    onSuccess,
    onError
  )
}

const getFavorApiList = async (
  { keyword, pageNo = defaultPageNo, pageSize = defaultPageSize, user_ID },
  callback,
  onSuccess,
  onError
) => {
  if (MOCK) {
    let apiList_1 = pagination(pageNo, pageSize, apiList)
    onSuccess && onSuccess(apiList_1)
    return apiList_1
  }
  return await customRequest(
    `${prefix}get_matched_apis?
  search_query=${keyword}
  &get_type=favor
  $user_ID=${user_ID}
  &page_no=${pageNo}
  &page_size=${pageSize}`,
    {},
    callback,
    onSuccess,
    onError
  )
}

const runApi = async payload => {
  return request(`${prefix}/run`, {
    method: 'post',
    body: {
      user_ID: payload.user_ID,
      api: payload.api,
    },
  })
}


