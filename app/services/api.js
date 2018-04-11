import request, {customRequest} from '../utils/request'
import {formatParam} from '../utils'
import {MOCK} from '../Global'
import {apiList} from './mockData'

const prefix = '/apps'
const defaultPageSize = 5
const defaultPageNo = 1


export const getApi = async payload => {
  return await request(`${prefix}/${payload.api_id}?yml=true`)
}

export const getApiList = async (payload, callback, onSuccess, onError) => {
  const {
    keyword: search_query,
    pageNo: page_no,
    pageSize: page_size,
    maxScore: max_score
  } = payload
  // if (MOCK) {
  //   let apiList_1 = pagination(pageNo, pageSize, apiList)
  //   onSuccess && onSuccess({response: apiList_1})
  //   return {response: apiList_1}
  // }
  return await customRequest(
    `${prefix}/chat?${formatParam({search_query, page_no, page_size, max_score,
      privacy: "public"
    })}`,
    {},
    callback,
    onSuccess,
    onError
  )
}
// export const getApiList = async (payload, callback, onSuccess, onError) => {
//   const {
//     keyword: search_query,
//     pageNo: page_no,
//     pageSize: page_size,
//     user_ID,
//     get_type
//   } = payload
//
//   if (MOCK) {
//     let apiList_1 = pagination(pageNo, pageSize, apiList)
//     onSuccess && onSuccess({response: apiList_1})
//     return {response: apiList_1}
//   }
//   return await customRequest(
//     `${prefix}?${formatParam({search_query, get_type, user_ID, page_no, page_size})}`,
//     {},
//     callback,
//     onSuccess,
//     onError
//   )
// }

// const getFavorApiList = async ({keyword, pageNo = defaultPageNo, pageSize = defaultPageSize, user_ID},
//                                callback,
//                                onSuccess,
//                                onError) => {
//   if (MOCK) {
//     let apiList_1 = pagination(pageNo, pageSize, apiList)
//     onSuccess && onSuccess(apiList_1)
//     return apiList_1
//   }
//   return await customRequest(
//     `${prefix}get_matched_apis?search_query=${keyword}&get_type=favor
//   $user_ID=${user_ID}
//   &page_no=${pageNo}
//   &page_size=${pageSize}`,
//     {},
//     callback,
//     onSuccess,
//     onError
//   )
// }

export const runApi = async payload => {
  return request(`${prefix}/run/${payload.app_id}`, {
    method: 'post',
    body: {
      app: payload.app,
    },
  })
}


