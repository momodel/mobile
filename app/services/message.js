import request, {customRequest} from '../utils/request'
const prefix = '/message'

export const getMessages = async payload => {
  return await request(`${prefix}`)
}

// 更改message的状态为已读
export function readMessage(payload) {
  return request(`/message/read`, {
    method: 'put',
    body: {
      receiver_id: payload.receiver_id,
    },
  })
}
