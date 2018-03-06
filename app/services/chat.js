/**
 * 1. 获取intent
 * 2. 获取 api list
 */
import request, { customRequest } from '../utils/request'
import { MOCK } from '../Global'
import { apiList } from './mockData'
const prefix = '/chat'
const defaultPageSize = 5
const defaultPageNo = 1

/**
 * 为模拟数据写的分页机制
 * @param pageNo
 * @param pageSize
 * @param array
 * @returns {*}
 */
function pagination(pageNo, pageSize, array) {
  let offset = (pageNo - 1) * pageSize
  return offset + pageSize >= array.length
    ? array.slice(offset, array.length)
    : array.slice(offset, offset + pageSize)
}
/**
 * 获取用户意图
 * @param payload 包含用户输入内容
 * @returns {Promise.<Object>} 用户意图
 */
const getIntent = async payload => {
  const {content, IntentList, callback, onSuccess, onError} = payload
  return customRequest(`${prefix}/intent`, {
    method: 'post',
    body: {
      content: payload.content,
      intent_list: payload.IntentList,
    },
  }, callback, onSuccess, onError)
}

/**
 * 获取用户api列表
 * @param payload keyword 用户输入内容
 * @param payload pageNo 页码
 * @param payload pageSize 页面包含api个数
 * @returns {Promise.<Object>} api列表
 */
// export const getApiList = async ({keyword, pageNo=pageNo, pageSize=pageSize}) => {
//   return await request(`${prefix}get_matched_apis?
//   content=${keyword}&page_no=${pageNo}&page_size=${pageSize}`)
// }
const getApiList = async (
  { keyword, pageNo = defaultPageNo, pageSize = defaultPageSize, get_type, user_ID },
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
    `${prefix}/get_matched_apis?
  content=${keyword}&page_no=${pageNo}&page_size=${pageSize}&get_type=${get_type}&user_ID=${user_ID}`,
    {},
    callback,
    onSuccess,
    onError
  )
}

// 获取单个api

/**
 * 执行api
 * @param input 参数内容
 * @param apiId id
 * @returns {Promise.<Object>} 执行结果
 */
const apiPredict = async ({ input, apiId }) => {
  return request(`${prefix}/api_predict`, {
    method: 'POST',
    body: {
      input,
      api_id: apiId,
    },
  })
}

export { getApiList, getIntent }
