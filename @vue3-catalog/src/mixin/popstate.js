export default {
  data () {
    return {
      popStateNext : true,
      popStateRouter : {}
    }
  },
  methods : {
    resetRouterName () {
      let that = this;
      that.popStateRouter = ''
    },
    popStateInit ( router = {} ) {
      let that = this;
      that.popStateRouter = router
      try {
        if ( window.__wxjs_is_wkwebview === true ) {
          //function ...  WKWebview ios
          that.popStateInitIos()
        } else if ( window.__wxjs_is_wkwebview === false || window.__wxjs_is_wkwebview === undefined ) {
          //function ...  UIWebview
          that.popStateInitAndroid();
        }
      } catch ( e ) {
      }
    },
    popStateInitIos () {
      let that = this;
      // console.info('ios', that.popStateRouter)
      
      window.addEventListener('popstate', function ( e ) {
        // console.info('进入popstate监听 ios')
        e.preventDefault()
        if ( that.popStateNext ) {
          // console.info(`通过next`,that.popStateRouter)
          that.$router.replace(that.popStateRouter)
          that.popStateNext = false;
          that.resetRouterName()
          return false
        }
      }, false)
    },
    popStateInitAndroid () {
      let that = this;
      // console.info('andriod', that.popStateRouter)
      window.addEventListener('popstate', function ( e ) {
        // console.info('进入popstate监听 andriod')
        e.preventDefault()
        if ( that.popStateRouter ) {
          // console.info(`跳转`, that.popStateRouter)
          that.$router.replace(that.popStateRouter)
          that.resetRouterName()
          return false
        }
      }, false)
    }
  }
}