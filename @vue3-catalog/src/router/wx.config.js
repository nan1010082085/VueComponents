import {wx_config} from '../api'
import shareConfig from './share.config'
import $wx from 'weixin-js-sdk'
//微信验证
const post_wx_config = () => {
  return new Promise(( resolve, reject ) => {
    wx_config({ url : encodeURIComponent(window.location.href) }).then(res => {
      let wxInfo = res.data.data;
      $wx.config({
        debug : false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
        appId : "...", // 必填，公众号的唯一标识
        timestamp : wxInfo.timestamp, // 必填，生成签名的时间戳
        nonceStr : wxInfo.nonceStr, // 必填，生成签名的随机串
        signature : wxInfo.signature,// 必填，签名，见附录1
        jsApiList : [
          'checkJsApi',
          'onMenuShareTimeline',
          'onMenuShareAppMessage',
          'updateAppMessageShareData',
          'updateTimelineShareData',
          'hideMenuItems',
          'hideAllNonBaseMenuItem',
          'showAllNonBaseMenuItem' ] // 必填，需要使用的JS接口列表，所有JS接口列表见附录2
      });
      $wx.ready(() => {
        return resolve('ready')
      })
      $wx.error(() => {
        return reject('error')
      })
    })
  })
}
let routerDataAsyncs,routerDataAsync;
//通过 vue-router 限制分享页
const weiXinConfig = (router) =>{
  console.log(process.env,router);
  //设置当前分享路由url
  window.localStorage.setItem('ROUTE_PATH',window.location.origin + process.env.BASE_URL + router.fullPath)
  //商品详情
  if ( router.path == '/Product' ) {
    // shareConfig.share[router.path]
    routerDataAsyncs = shareConfig.share[ router.path ].getData(
      shareConfig.share[ router.path ],
      router.query.spuid,
      window.localStorage.getItem('ROUTE_PATH')
    )
  }
  //新闻
  else if(router.path == '/News') {
    routerDataAsyncs = shareConfig.share[ router.path ].getData(
      shareConfig.share[ router.path ],
      router.query.id,
      window.localStorage.getItem('ROUTE_PATH')
    )
  }else {
    routerDataAsync = () => {
      return new Promise(( resolve ) => {
        return resolve(true)
      })
    }
  }
  try {
    routerDataAsync().then(() => {
      // console.log('默认执行')
      setTimeout(() => {
        post_wx_config()
          .then(() => {
            let isShareList = shareConfig.route;
            if ( isShareList.includes(router.path) ) {
              $wx.showAllNonBaseMenuItem();
              $wx.hideMenuItems({
                menuList : [
                  "menuItem:share:qq",  //qq
                  "menuItem:share:weiboApp",  //微博
                  "menuItem:favorite",  //收藏
                  "menuItem:share:facebook",  //fb
                  "menuItem:share:QZone", //qq空间
                  "menuItem:openWithQQBrowser", //qq浏览器打开
                  "menuItem:editTag", //编辑
                  "menuItem:openWithSafari", //苹果浏览器
                  "menuItem:delete", //删除
                  "menuItem:copyUrl", //复制链接
                  "menuItem:originPage", //原网页
                  "menuItem:share:email", //邮件
                  "menuItem:share:brand", //其他app
                ]
              })
              // console.log('分享路由')
              //wx设置分享
              for ( const shareKey in shareConfig.share ) {
                if ( router.path == shareKey ) {
                  // console.log(shareConfig.share)
                  $wx.updateAppMessageShareData({
                    title : shareConfig.share[ shareKey ].per.title, // 分享标题
                    desc : shareConfig.share[ shareKey ].per.desc, // 分享描述
                    link : shareConfig.share[ shareKey ].per.link,
                    imgUrl : shareConfig.share[ shareKey ].per.imgUrl, // 分享图标
                    success : function () {
                      // 设置成功
                      // console.info(`${shareKey} success 朋友`)
                      console.info(shareConfig.share[ shareKey ].per.link);
                    }
                  })
                  $wx.updateTimelineShareData({
                    title : shareConfig.share[ shareKey ].pen.title, // 分享标题
                    desc : shareConfig.share[ shareKey ].pen.desc, // 分享描述
                    link : shareConfig.share[ shareKey ].pen.link,
                    imgUrl : shareConfig.share[ shareKey ].pen.imgUrl, // 分享图标
                    success : function () {
                      // 设置成功
                      // console.info(`${shareKey} success 朋友圈`)
                      console.info(shareConfig.share[ shareKey ].pen.link);
                    }
                  })
                  break;
                }
              }
            } else {
              // console.log('非分享路由')
              $wx.hideAllNonBaseMenuItem();
            }
          }).catch(()=>{})
      },100)
    })
  }catch ( e ) {}
}

export default weiXinConfig