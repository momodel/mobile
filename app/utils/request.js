// import fetch from 'dva/fetch';
// import { notification } from 'antd';
import { Toast } from 'antd-mobile'
import { Storage } from '../utils'
import { URL } from '../Global'

function checkStatus(response) {
  console.log("response ", response)

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

/**
 * Requests a URL, returning a promise.
 *
 * @param  {string} url       The URL we want to request
 * @param  {object} [options] The options we want to pass to "fetch"
 * @return {object}           An object containing either "data" or "err"
 */
export default async function request(url, options) {
  // concat url
  const newUrl = `${URL}${url}`

  // get token from storage
  const token = await Storage.get('token', '')

  const defaultOptions = {
    credentials: 'include',
  }
  const newOptions = { ...defaultOptions, ...options }
  if (newOptions.method === 'POST' || newOptions.method === 'PUT'||
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

  console.log('newUrl, newOptions')
  console.log(newUrl, newOptions)

  return fetch(newUrl, newOptions)
    .then(checkStatus)
    .then(response => response.json())
  // .catch(error => {
  //   if (error.code) {
  //     Toast.fail(`请求错误 Load failed !!! ${error.name} ${error.message}`, 1)
  //     return Promise.reject(error)
  //     // notification.error({
  //     //   message: error.name,
  //     //   description: error.message,
  //     // });
  //   }
  //   if ('stack' in error && 'message' in error) {
  //     Toast.fail(`请求错误 Load failed !!! ${error.name} ${error.message}`, 1)
  //     return Promise.reject(error)
  //     // notification.error({
  //     //   message: `请求错误: ${url}`,
  //     //   description: error.message,
  //     // });
  //   }
  //   return error
  // })
}

/**************************** 分割线 ****************************/

const onSuccessDef = function(response) {}

const onErrorDef = function(error) {}

const callbackDef = function(response) {}

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
export async function customRequest(
  url,
  options,
  callback = callbackDef,
  onSuccess = onSuccessDef,
  onError = onErrorDef
) {
  // concat url
  const newUrl = `${URL}${url}`

  // get token from storage
  const token = await Storage.get('token', '')

  const defaultOptions = {
    credentials: 'include',
  }
  const newOptions = { ...defaultOptions, ...options }
  if (newOptions.method === 'POST' || newOptions.method === 'PUT' ||
    newOptions.method === 'post' || newOptions.method === 'put'

  ) {
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

  console.log('newUrl, newOptions')
  console.log(newUrl, newOptions)
  console.log(JSON.stringify(newUrl))
  console.log(JSON.stringify(newOptions))


  return fetch(newUrl, newOptions)
    .then(checkStatus)
    // .then(response => response.json())
    .then(response => {
      if (response.status !== 200) {
        Toast.fail('请求错误!!!', 1)
      } else {
        return response.json()
      }
    })
    .then(res=> {
      onSuccess(res)
    })
    .then(res => {
      callback(res)
    })
    .catch(error => {
      console.log('error message: ', {
        // errorURL: urlTail,
        errorContent: error,
      })
      onError(error)
    })
}
