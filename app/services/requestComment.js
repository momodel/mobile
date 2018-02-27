import request, { customRequest } from '../utils/request'

const prefix = '/user_request_comments'

export const getRequestComments = (payload) => {
  return request(`${prefix}?user_request_id=${payload.requestId}`)
}
