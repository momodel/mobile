/**
 * Created by xiaoming on 2017/5/10.
 * Reference: fetchData(Created by zhaofengli on 03/05/2017.)
 */
import { message } from 'antd'
import { curry, get } from 'lodash'

import axios, { CancelToken } from 'general/js/axiosConfig'
import Constants from './Constants'

const source = CancelToken.source()
const URL = Constants.url
const alertMessages = Constants.alertMessage
const _ = curry.placeholder

/**
 * 对 fetch 方法的封装
 * @param {string} method 请求的方法
 * @param {{success: string, failed: string}} [alertMessage] 请求成功或失败的提示信息
 * @param {string} url 请求的 url
 * @param {object} [body] 请求时，需要传给后端的数据
 * @param {function({response})} [success] fetch 成功时的回调
 * @param {function(Error, Number)} [failed] fetch 失败时的回调, 第一个参数是后端返回的错误信息，第二个是HTTP状态码
 * @returns {Promise}
 */
function fetchCustom(method, alertMessage, url, body, success, failed) {
  const alert = alertMessage || { success: undefined, failed: undefined }
  let status = 200

  return fetch(URL + url, {
    method,
    headers: {
      Accept: 'application/json',
      'Content-type': 'application/json',
      Authorization: localStorage.token,
    },
    body: JSON.stringify(body),
  })
    .then(res => {
      status = res.status
      return res.json()
    })
    .then(res => {
      if (status === 200) {
        alert.success && message.success(alert.success)
        success && success(res)
      } else {
        throw new Error(res.message)
      }
    })
    .catch(error => {
      alert.failed && message.error(alert.failed)
      failed && failed(error, status)
      if (!failed) {
        throw error
      }
    })
}

const fetchData = curry(fetchCustom, 4) // 可以自定义提示语的 fetch 方法
const fetchNoAlert = fetchData(_, undefined) // 无提示语的 fetch 方法

const simpleGetData = fetchNoAlert('get')(_, undefined) // 无提示语的 get 方法

const getDataAlert = fetchData('get')(_, _, undefined) // 可以自定义提示语的 get 方法
const postDataAlert = fetchData('post')
const putDataAlert = fetchData('put')
const deleteDataAlert = fetchData('delete')

const getData = getDataAlert({ failed: alertMessages.FETCH_FAILED }) // 带提示语的 get 方法
const postData = postDataAlert({
  success: alertMessages.ADD_SUCCESS,
  failed: alertMessages.ADD_FAILED,
})
const putData = putDataAlert({
  success: alertMessages.UPDATE_SUCCESS,
  failed: alertMessages.UPDATE_FAILED,
})
const deleteData = deleteDataAlert({
  success: alertMessages.DELETE_SUCCESS,
  failed: alertMessages.DELETE_FAILED,
})

export {
  fetchData,
  fetchNoAlert,
  getData,
  postData,
  putData,
  deleteData,
  getDataAlert,
  postDataAlert,
  putDataAlert,
  deleteDataAlert,
  simpleGetData,
  CancelToken,
  curry,
}
