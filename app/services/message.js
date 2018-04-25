import request, {requestV2} from '../utils/request'
const prefix = '/message'

export const getMessages = async payload => {
  return await request(`${prefix}`)
}

// export const getMessages = async payload => {
//   return await requestV2({url: `${prefix}`})
// }



// 更改message的状态为已读
export function readMessage(payload) {
  return request(`/message/read`, {
    method: 'put',
    body: {
      receiver_id: payload.receiver_id,
    },
  })
}
