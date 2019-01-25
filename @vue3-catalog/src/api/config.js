//域名接口 url config
const  DOMAIN_URL = process.env.NODE_ENV === 'production'
  ? '...'  //生产环境
  : '....'; //开发环境
//微信接口url
const WEIXIN_CONFIG_URL = '...'

export {
  DOMAIN_URL,
  WEIXIN_CONFIG_URL
}