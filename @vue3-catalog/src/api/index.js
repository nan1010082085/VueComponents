import {DOMAIN_URL,WEIXIN_CONFIG_URL} from '../api/config.js'
import {GetData,PostData} from "../utils";

//示例
// export const newLogin = (params) => PostData(DOMAIN_URL + 'v3/account/login', params)

//微信签证接口
export const wx_config = (params) => PostData(WEIXIN_CONFIG_URL, params);