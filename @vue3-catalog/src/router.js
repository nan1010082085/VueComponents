import Vue    from 'vue'
import Router from 'vue-router';
//微信config验证 分享等操作
import WxConfig from './router/wx.config'

Vue.use(Router);

import Home from './router/home-model'

const router = new Router({
  mode : 'history',
  base : process.env.BASE_URL,
  routes : [
    ...Home
  ]
})

router.beforeEach(( to, from, next ) => {
  //页面标题设置
  if ( to.meta && document.querySelector('title') ) {
    // console.log(to.meta)
    document.querySelector('title').innerHTML = to.meta.title
  } else {
    document.querySelector('title').innerHTML = ''
  }
  next()
})
router.afterEach(( to, from ) => {
  WxConfig(to)
})

export default router