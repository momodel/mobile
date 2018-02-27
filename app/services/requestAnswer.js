import request, { customRequest } from '../utils/request'

const prefix = '/request_answer'

export const getRequestAnswer = (payload) => {
  return request(`${prefix}?user_request_id=${payload.requestId}`)
}
