import moment from 'moment';

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
//   console.log("strTime", strTime)
//   let date = new Date(strTime);
//   let localeString = date.toLocaleString();
//   console.log("localeString", localeString)
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

