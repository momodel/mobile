import fetch from 'dva/fetch'
import { message } from 'antd'

function checkStatus(response) {
  if (response.status >= 200 && response.status < 300) {
    // message.success('This is a message of success');
    return response
  }
  const error = new Error(response.statusText)
  error.response = response
  message.error('This is a message of error: ' + response.statusText)
  // throw error
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
  const newUrl = `/pyapi${url}`

  // get token from storage
  // const token = await Storage.get('token', '')

  const defaultOptions = {
    credentials: 'include',
  }
  const newOptions = { ...defaultOptions, ...options }
  if (newOptions.method === 'POST' || newOptions.method === 'PUT') {
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
    // Authorization: token,
    ...newOptions.headers,
  }

  const response = await fetch(newUrl, newOptions)

  const newRes = checkStatus(response)
  const data = await newRes.json()

  const ret = {
    data: data.response,
    res: data,
    headers: {},
    status: response.status,
  }

  if (response.headers.get('x-total-count')) {
    ret.headers['x-total-count'] = response.headers.get('x-total-count')
  }
  return ret
}
