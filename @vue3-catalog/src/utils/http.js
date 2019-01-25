import axios     from 'axios'
import { Toast } from 'vant'

const accessToken = () => {
  return window.localStorage.getItem('accessToken');
}
/**
 * ajax 拦截器
 */
axios.defaults.timeout = 10000;
axios.defaults.headers.post[ 'Content-Type' ] = 'application/x-www-form-urlencoded;charset=UTF-8';

(function () {
  // cookies
  // axios.defaults.withCredentials = true;
  
  //请求拦截
  axios.interceptors.request.use(
    ( request ) => {
      // console.log(request)
      return request;
    },
    ( error ) => {
      //...
    });
  //响应拦截
  axios.interceptors.response.use(
    ( response ) => {
      // console.log(response);
      return response;
    },
    ( error ) => {
      if ( error.response ) {
        if ( error.response.status == 401 ) {
        
        }
      }
    });
})()

/*
* GET 请求
* */
export const GetData = (url, params) =>{
  //时间戳，防止加载缓存
  let nowTimestamp = new Date().getTime();
  //如果有token 判断不为空值时 加入token
  if(accessToken() != ''){
  
  }
  if (typeof(params) == "object") {
    params["timestamp"] = nowTimestamp;
  } else {
    params = {
      timestamp: nowTimestamp
    };
  }
  return axios({
    method:'get',
    url:url,
    params:params
  })
}
/*
* POST 请求
* */
export const PostData = (url, data, params) =>{
  //时间戳，防止加载缓存
  let nowTimestamp = new Date().getTime();
  //如果有token 判断不为空值时 加入token
  if(accessToken() != ''){
  
  }
  if (typeof(params) == "object") {
    params["timestamp"] = nowTimestamp;
  } else {
    params = {
      timestamp: nowTimestamp
    };
  }
  return axios({
    method:'post',
    url:url,
    params:params,
    data: data
  })
}
