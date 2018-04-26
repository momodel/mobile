import moment from 'moment';
import {avatarList} from "../Global"
// import {avatarList} from '../Global'
export { NavigationActions } from 'react-navigation'

export { default as Storage } from './storage'

export const delay = time => new Promise(resolve => setTimeout(resolve, time))

export const createAction = type => payload => ({ type, payload })

// export const FormatDate = (strTime) => {
//   let date = new Date(strTime);
//   return date.getFullYear()+"-"+(date.getMonth()+1)+"-"+date.getDate();
// }
//
// export const FormatDateTime = (strTime) => {
//   let date = new Date(strTime);
//   let localeString = date.toLocaleString();
//
//   return date.getFullYear()+"-"+(date.getMonth()+1)+
//     "-"+date.getDate()+ " "+date.getHours()+":"+ date.getMinutes();
// }

export function showTime(time, format = "yyyy-MM-dd hh:mm") {
  // if (typeof time === 'string' && time.toLowerCase().indexOf('z') === -1) {
  //   time = formatTimeZ(time);
  // }
  let date = moment(time).toDate().Format(format);
  return date.toLocaleString();
}

function formatTimeZ(time) {
  return time.replace(/000$/, 'Z');
}

//格式化日期
Date.prototype.Format = function (fmt) {
  var o = {
    "y+": this.getFullYear(),
    "M+": this.getMonth() + 1,                 //月份
    "d+": this.getDate(),                    //日
    "h+": this.getHours(),                   //小时
    "m+": this.getMinutes(),                 //分
    "s+": this.getSeconds(),                 //秒
    "q+": Math.floor((this.getMonth() + 3) / 3), //季度
    "S+": this.getMilliseconds()             //毫秒
  };
  for (var k in o) {
    if (new RegExp("(" + k + ")").test(fmt)) {
      if (k == "y+") {
        fmt = fmt.replace(RegExp.$1, ("" + o[k]).substr(4 - RegExp.$1.length));
      }
      else if (k == "S+") {
        var lens = RegExp.$1.length;
        lens = lens == 1 ? 3 : lens;
        fmt = fmt.replace(RegExp.$1, ("00" + o[k]).substr(("" + o[k]).length - 1, lens));
      }
      else {
        fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
      }
    }
  }
  return fmt;
}

// GET 方法添加 parameters
export const formatParam = (filter) => {
  let params = ''
  for (let key in filter) {
    if (!filter.hasOwnProperty(key)) {
      continue
    }
    if (filter[key]) {
      const value = filter[key]
      if (key === 'projectType') {
        key = 'type'
      }
      params += `&${key}=${value}`
    }
  }
  return params
}

// 检查手机号
export const checkMobile = (value) => {
  return /^1[3|4|5|7|8][0-9]\d{4,8}$/.test(value)
  // if (!(/^1[3|4|5|7|8][0-9]\d{4,8}$/.test(value))) {
  //   // alert("不是完整的11位手机号或者正确的手机号前七位");
  //   // document.mobileform.mobile.focus();
  //   return false
  // } else {
  //   return true
  // }
}

export const objectIdToImg = (objectId) => {
  const picNumber = parseInt(objectId.slice(10)) % 6
  return avatarList[picNumber]
}

export const messageObjToContent = (e) => {
  const translatorTemp = {
    app: '应用',
    module: '模块',
    dataset: '数据集'
  }
  switch(e.message_type) {
    case 'answer':
      return `${e.user_ID}回答了您关注的需求${e.user_request_title}`
    case 'commit':
      `${e.user_ID}更新了您关注的需求${e.user_request_title}的答案`
    case 'deploy':
      return `${e.user_ID}上线了您关注的${translatorTemp[e.project_type]} ${e.project_name}`
    case 'publish':
      return `${e.user_ID}发布了您关注的${translatorTemp[e.project_type]} ${e.project_name}`
    case 'deploy_request':
      return `${e.user_ID}为您的答案${e.user_request_title}上线了${translatorTemp[e.project_type]} ${e.project_name}`
    case 'publish_request':
      return `${e.user_ID}为您的答案${e.user_request_title}发布了${translatorTemp[e.project_type]} ${e.project_name}`
  }
}
