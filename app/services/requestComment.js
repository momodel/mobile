import request, {  } from '../utils/request'

const prefix = '/comments'

export const getRequestComments = (payload) => {
  return request(`${prefix}?_id=${payload.requestId}&comments_type=request`)
}

export const createUserRequestComments = (payload) => {
  return request(`${prefix}`, {
    method: "post",
    body: {
      comments: payload.comments,
      _id: payload.user_request_id,
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
