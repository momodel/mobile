import request from '../utils/request'
const prefix = '/user'

// 当加入推送后 更改login
export const login = async payload => {
  const result = await request(`${prefix}/login`, {
    method: 'POST',
    body: {
      user_ID: payload.username,
      password: payload.password,
    },
  })
  return result
}

export const get_verification_code = async payload => {
  return request(`${prefix}/get_verification_code/${payload.phone}`)
}

export const login_with_phone = async payload => {
  const result = await request(`${prefix}/login_with_phone`, {
    method: 'POST',
    body: {
      phone: payload.phone,
      message_id: payload.message_id,
      code: payload.code,
    },
  })
  return result
}

// 应该用不到，不能签单检查验证成功后调用其他服务，这样其他服务无验证暴露给前端很危险
// export const verify_code = async payload => {
//   return request(`${prefix}/get_verification_code/${payload.phone}`, {
//     method: 'post',
//     body: {
//       code: payload.code,
//       message_id: payload.messageId
//     }
//   })
// }

export const resetPassword = async payload => {
  return request(`${prefix}/reset_password`, {
    method: 'post',
    body: {
      phone: payload.phone,
      message_id: payload.message_id,
      code: payload.code,
      new_password: payload.new_password,
    },
  })
}

export const register = async payload => {
  return request(`${prefix}/register`, {
    method: 'post',
    body: {
      user_ID: payload.user_ID,
      password: payload.password,
      phone: payload.phone,
    },
  })
}

export const favorApi = async payload => {
  return request(`${prefix}/favor_api`, {
    method: 'put',
    body: {
      user_ID: payload.user_ID,
      api_id: payload.api_id,
    },
  })
}

export const starApi = async payload => {
  return request(`${prefix}/star_api`, {
    method: 'put',
    body: {
      user_ID: payload.user_ID,
      api_id: payload.api_id,
    },
  })
}

// 当加入推送后启用
// export const logout = async payload => {
//   return request('/user/login_worker', {
//     method: 'POST',
//     body: {
//       email: payload.username,
//       password: payload.password,
//       registration_id: "登出"
//     }
//   })
// }
