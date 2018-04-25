import request, {} from '../utils/request'

const prefix = '/request_answer'

export const getRequestAnswer = (payload) => {
  return request(`${prefix}?user_request_id=${payload.requestId}`)
}


export function acceptAnswer(payload) {
  return request(`${prefix}/accept`, {
    method: 'put',
    body: {
      user_request_id: payload.user_request_id,
      request_answer_id: payload.request_answer_id
    },
  })
}
