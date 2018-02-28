import request, { customRequest } from '../utils/request'

const prefix = '/user_request_comments'

export const getRequestComments = (payload) => {
  return request(`${prefix}?user_request_id=${payload.requestId}`)
}

export const createUserRequestComments = (payload) => {
  return request(`${prefix}`, {
    method: "post",
    body: {
      comments: payload.comments,
      user_request_id: payload.user_request_id,
      user_id: payload.user_id,
      comments_type: "request",
      // request_answer_id:,
    }
  })
}

export const createUserRequestAnswerComments = (payload) => {
  return request(`${prefix}`, {
    method: "post",
    body: {
      comments: payload.comments,
      user_request_id: payload.user_request_id,
      user_id: payload.user_id,
      comments_type: "answer",
      request_answer_id: payload.request_answer_id,
    }
  })
}
