/**
 * Created by zhaofengli on 03/05/2017.
 */
import { message } from 'antd'

import Constants from './Constants'

const URL = Constants.url
const alertMessage = Constants.alertMessage

const onSuccessDef = function(response) {}

const onErrorDef = function(error) {}

/* example:
 getWithToken(`/warnings/count_warnings_prediction?parent_name=${this.parent.replace(/市/, '固网')}&count=total`,
 (res) =>  {
   this.setState({
     isLoading: false,
     gaugeData: res.response.count,
  });
 });

 */
/**
 *
 * @param urlTail (required) fetch url
 * @param callback (required) function deal with fetch data
 * @param onSuccess (optional) function when http code is 200
 * @param onError (optional) function when catch error
 */
export function getWithToken(
  urlTail,
  callback,
  onSuccess = onSuccessDef,
  onError = onErrorDef
) {
  fetch(`${URL}${urlTail}`, {
    method: 'get',
    headers: {
      Authorization: localStorage.token,
    },
  })
    .then(response => {
      if (response.status !== 200) {
        message.error(alertMessage.FETCH_FAILED)
      } else {
        onSuccess(response)
      }

      return response.json()
    })
    .then(res => {
      callback(res)
    })
    .catch(error => {
      console.log('error message: ', {
        errorURL: urlTail,
        errorContent: error,
      })

      onError(error)
    })
}
