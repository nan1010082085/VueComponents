//axios js 封装
import { GetData, PostData } from "./http";


/**
 * 获取地址栏参数
 * @param name 可用
 * @returns {*} value
 */
function GetHrefQueryString ( name ) {
  var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
  // var r = window.location.search.substr(1).match(reg);
  var r = window.location.hash.split('?')[ 1 ].match(reg);
  if ( r != null ) return unescape(r[ 2 ]);
  return null;
  if ( r != null ) return decodeURIComponent(r[ 2 ]);
  return null;
}

/** 获取地址string指定参数 **/
function GetQueryString ( url, name ) {
  let reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
  let r = url.split('?')[ 1 ].substr(1).match(reg);
  if ( r != null ) return unescape(r[ 2 ]);
  return false;
}

/**
 * 设置cookie 值
 * @param name  key
 * @returns value value
 */
function setCookie ( name, value ) {
  // var exp = new Date(Date.parse(timeStr));
  document.cookie = name + "=" + escape(value) + ";expires=" + new Date().toLocaleString();
}

/**
 * 获取cookie 值
 * @param c_name  key
 * @returns value
 */
function getCookie ( c_name ) {
  if ( document.cookie.length > 0 ) {
    var c_start = document.cookie.indexOf(c_name + "=");
    if ( c_start != -1 ) {
      c_start = c_start + c_name.length + 1;
      var c_end = document.cookie.indexOf(";", c_start);
      if ( c_end == -1 ) {
        c_end = document.cookie.length;
      }
      return unescape(document.cookie.substring(c_start, c_end))
    }
  }
  return null;
}

/**
 * @param date 日期
 * @param fmt  需要格式化的形式
 * @returns {*}
 *  将 Date 转化为指定格式的String
 *  月(M)、日(d)、小时(h)、分(m)、秒(s) 可以用 1-2 个占位符
 *  年(y)可以用 1-4 个占位符，毫秒(S)只能用 1 个占位符(是 1-3 位的数字)
 *  eg：
 *  DateFormat(new Date(), "yyyy-MM-dd HH:mm:ss.S") ==> 2006-07-02 08:09:04.423
 *  DateFormat(new Date(), "yyyy-M-d H:m:s.S")      ==> 2006-7-2 8:9:4.18
 */
function DateFormat ( date, fmt ) {
  let o = {
    'M+' : date.getMonth() + 1, // 月份
    'd+' : date.getDate(), // 日
    'H+' : date.getHours(), // 小时
    'm+' : date.getMinutes(), // 分
    's+' : date.getSeconds(), // 秒
    'q+' : Math.floor((date.getMonth() + 3) / 3), // 季度
    'S' : date.getMilliseconds() // 毫秒
  };
  if ( /(y+)/.test(fmt) ) {
    fmt = fmt.replace(RegExp.$1, (date.getFullYear() + '').substr(4 - RegExp.$1.length));
  }
  for ( var k in o ) {
    if ( new RegExp('(' + k + ')').test(fmt) ) {
      fmt = fmt.replace(RegExp.$1, (RegExp.$1.length === 1) ? (o[ k ]) : (('00' + o[ k ]).substr(('' + o[ k ]).length)));
    }
  }
  return fmt;
}

/**
 * 判断是否为空
 * @method isEmpty
 * @param  val
 * @return {boolean}
 */
function isEmpty ( val ) {
  return val === null || val === undefined || val === '' || val.length === 0 || JSON.stringify(val) === '{}'
}

/** 对象克隆 **/
function getType ( obj ) {
  //tostring会返回对应不同的标签的构造函数
  var toString = Object.prototype.toString;
  var map = {
    '[object Boolean]' : 'boolean',
    '[object Number]' : 'number',
    '[object String]' : 'string',
    '[object Function]' : 'function',
    '[object Array]' : 'array',
    '[object Date]' : 'date',
    '[object RegExp]' : 'regExp',
    '[object Undefined]' : 'undefined',
    '[object Null]' : 'null',
    '[object Object]' : 'object'
  };
  if ( obj instanceof Element ) {
    return 'element';
  }
  return map[ toString.call(obj) ];
}

function extendClone ( copyObj ) {
  var type = getType(copyObj);
  var obj;
  if ( type === 'array' ) {
    obj = [];
  } else if ( type === 'object' ) {
    obj = {};
  } else {
    //不再具有下一层次
    return copyObj;
  }
  if ( type === 'array' ) {
    for ( var i = 0, len = copyObj.length ; i < len ; i++ ) {
      obj.push(extendClone(copyObj[ i ]));
    }
  } else if ( type === 'object' ) {
    for ( var key in copyObj ) {
      obj[ key ] = extendClone(copyObj[ key ]);
    }
  }
  return obj;
}

/** 判断是否是pc **/
function IsPc () {
  let ua = window.navigator.userAgent,
    //MicroMessenger 微信
    agents = [ 'MicroMessenger', "Android", "SymbianOS", "iPhone", "iPod", "iPad", "Windows Phone", "MQQBrowser" ],
    flag = true;
  for ( let i = 0, len = agents.length ; i < len ; i++ ) {
    if ( ua.indexOf(agents[ i ]) > 0 ) {
      flag = false;
      break;
    }
  }
  return flag
}

export {
  GetData,
  PostData,
  GetHrefQueryString,
  GetQueryString,
  setCookie,
  getCookie,
  DateFormat,
  isEmpty,
  extendClone,
  IsPc
};