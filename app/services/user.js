import request, {customRequest} from '../utils/request'

const prefix = '/user'
import {formatParam} from '../utils'

// 当加入推送后 更改login
export const login = payload => {
  const result = request(`${prefix}/login`, {
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

// export const register = async payload => {
//   return request(`${prefix}/register`, {
//     method: 'post',
//     body: {
//       user_ID: payload.user_ID,
//       password: payload.password,
//       phone: payload.phone,
//     },
//   })
// }

export async function register(params) {
  return request(`${prefix}/register`, {
    method: 'POST',
    body: {...params, captcha: params.code},
  });
}


export async function send_verification_code(params) {
  return request(`${prefix}/send_verification_code/${params.phone}`, {
    method: 'GET',
  });
}

export const starApi = async payload => {
  return request(`${prefix}/action_entity/${payload.api_id}`, {
    method: 'put',
    body: {
      action: "star",
      entity: "app"
    },
  })
}

export const favorApi = async payload => {
  return request(`${prefix}/action_entity/${payload.api_id}`, {
    method: 'put',
    body: {
      action: "favor",
      entity: "app"
    },
  })
}

export const getfavorApps = async (payload, callback, onSuccess, onError) => {
  // return request(`${prefix}/favor_apps`, {
  //   method: 'get',
  // })
  const {pageNo: page_no, pageSize: page_size} = payload
  return await customRequest(
    `${prefix}/action_entity?${formatParam({page_no, page_size, action_entity: "favor_apps"})}`,
    {},
    callback,
    onSuccess,
    onError
  )
  //
  // return await customRequest(
  //   `${prefix}/favor_apps?${formatParam({page_no, page_size})}`,
  //   {},
  //   callback,
  //   onSuccess,
  //   onError
  // )
}

export const getUsedApps = async payload => {
  const {pageNo: page_no, pageSize: page_size} = payload
  return await request(
    `${prefix}/statistics?${formatParam({page_no, page_size, action: "use", entity_type: "app"})}`,)
}


export const updateUser = async payload => {
  // const {} = payload
  return await request(`${prefix}`, {
    method: "put",
    body: payload
  })
}

export const getUserInfo = async payload => {
  // const {} = payload
  return await request(`${prefix}/profile/${payload.user_ID}`)
}


// export const starApi = async payload => {
//   return request(`${prefix}/star_api`, {
//     method: 'put',
//     body: {
//       user_ID: payload.user_ID,
//       api_id: payload.api_id,
//     },
//   })
// }

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
