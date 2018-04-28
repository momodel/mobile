// import fetch from 'dva/fetch';
// import { notification } from 'antd';
import {Toast} from 'antd-mobile'
import {Storage} from '../utils'
import {URL} from '../Global'

function checkStatus(response) {
  if (response.status >= 200 && response.status < 300) {
    return response
  }

  // Toast.fail('请求错误 Load failed !!!', 1)
  // notification.error({
  //   message: `请求错误 ${response.status}: ${response.url}`,
  //   description: response.statusText,
  // });
  const error = new Error(response.statusText)
  error.response = response
  throw error
}

function checkStatus1({data, customErrorMsg, newRes}) {
  if (newRes.status >= 200 && newRes.status < 300) {
    return true
  }
  if (customErrorMsg) {
    Toast.fail(data.response, 1)
  }
  return false
}


/**
 * Requests a URL, returning a promise.
 *
 * @param  {string} url       The URL we want to request
 * @param  {object} [options] The options we want to pass to "fetch"
 * @param  {object} [kwargs]  The kwargs to determine whether notification
 * @return {object}           An object containing either "data" or "err"
 */
export default async function request(url, options, kwargs = {}) {
  const {
    customErrorMsg = false,
    onSuccess ,
    onError
  } = kwargs

  try {
    // concat url
    const newUrl = `${URL}${url}`
    // get token from storage
    const token = await Storage.get('token', '')
    const defaultOptions = {
      credentials: 'include',
    }
    const newOptions = {...defaultOptions, ...options}
    if (newOptions.method === 'POST' || newOptions.method === 'PUT' ||
      newOptions.method === 'post' || newOptions.method === 'put') {
      newOptions.headers = {
        Accept: 'application/json',
        'Content-Type': 'application/json; charset=utf-8',
        ...newOptions.headers,
      }

      if (newOptions.headers['Content-Type'] !== 'multipart/form-data') {
        newOptions.body = JSON.stringify(newOptions.body)
      }
    }
    newOptions.headers = {
      // 添加 token
      Authorization: "Bearer " + token,
      ...newOptions.headers,
    }

    console.log("newUrl", newUrl)
    console.log("newOptions", newOptions)

    const response = await fetch(newUrl, newOptions)
    console.log("response", response)
    const newRes = response
    const data = await response.json()

    if (onSuccess) {
      await onSuccess(data)
      return null
    }

    const success = checkStatus1({data, customErrorMsg, newRes})
    return {
      ...data,
      headers: {},
      status: response.status,
      success
    }
  }catch (err) {
    console.log(url, err)
    onError && await onError(err)
  }

}

/**************************** 分割线 ****************************/

const onSuccessDef = function (response) {
}

const onErrorDef = function (error) {
}

const callbackDef = function (response) {
}

/**
 * Requests a URL, returning a promise.
 *
 * @param  {string} url       The URL we want to request
 * @param  {object} [options] The options we want to pass to "fetch"
 * @param  {function} callback callback function
 * @param  {function} onSuccess success callback function
 * @param  {function} onError error callback function
 * @return {object}           An object containing either "data" or "err"
 *
 *
 */
// export async function customRequest(url,
//                                     options,
//                                     callback = callbackDef,
//                                     onSuccess = onSuccessDef,
//                                     onError = onErrorDef) {
//   // concat url
//   const newUrl = `${URL}${url}`
//
//   // get token from storage
//   const token = await Storage.get('token', '')
//
//   const defaultOptions = {
//     credentials: 'include',
//   }
//   const newOptions = {...defaultOptions, ...options}
//   if (newOptions.method === 'POST' || newOptions.method === 'PUT' ||
//     newOptions.method === 'post' || newOptions.method === 'put'
//
//   ) {
//     newOptions.headers = {
//       Accept: 'application/json',
//       'Content-Type': 'application/json; charset=utf-8',
//       ...newOptions.headers,
//     }
//
//     if (newOptions.headers['Content-Type'] !== 'multipart/form-data') {
//       newOptions.body = JSON.stringify(newOptions.body)
//     }
//   }
//
//   newOptions.headers = {
//     // 添加 token
//     Authorization: "Bearer " + token,
//     ...newOptions.headers,
//   }
//
//
//
//   return fetch(newUrl, newOptions)
//     .then(checkStatus)
//     // .then(response => response.json())
//     .then(response => {
//       if (response.status !== 200) {
//         Toast.fail('请求错误!!!', 1)
//       } else {
//         return response.json()
//       }
//     })
//     .then(res => {
//       onSuccess(res)
//     })
//     .then(res => {
//       callback(res)
//     })
//     .catch(error => {
//       console.log('error message: ', {
//         // errorURL: urlTail,
//         errorContent: error,
//       })
//       onError(error)
//     })
// }


// 将所有 request 更改所有requestV2
export async function requestV2({url, options, customErrorMsg, onSuccess, onError}) {
  try {
    // concat url
    const newUrl = `${URL}${url}`
    // get token from storage
    const token = await Storage.get('token', '')
    const defaultOptions = {
      credentials: 'include',
    }
    const newOptions = {...defaultOptions, ...options}
    if (newOptions.method === 'POST' || newOptions.method === 'PUT' ||
      newOptions.method === 'post' || newOptions.method === 'put') {
      newOptions.headers = {
        Accept: 'application/json',
        'Content-Type': 'application/json; charset=utf-8',
        ...newOptions.headers,
      }

      if (newOptions.headers['Content-Type'] !== 'multipart/form-data') {
        newOptions.body = JSON.stringify(newOptions.body)
      }
    }
    newOptions.headers = {
      // 添加 token
      Authorization: "Bearer " + token,
      ...newOptions.headers,
    }

    const response = await fetch(newUrl, newOptions)
    const newRes = response
    const data = await response.json()

    if (onSuccess) {
      await onSuccess(data)
      return null
    }

    const success = checkStatus1({data, customErrorMsg, newRes})
    return {
      ...data,
      headers: {},
      status: response.status,
      success
    }
  } catch (err) {
    console.log(url, err)
    onError && await onError(err)
  }


}
