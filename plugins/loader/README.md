> 参数
* 	@params bgColor 控制加载状态条背景色 默认 #297dff
* 	@params height 控制加载状态条高度  默认 3px
> 方法
* 	@params init  存储元素
* 	@params start 开始加载 -> 无完成时最大80%
* 	@params finish 完成 -> 100% 300ms后消失
> 使用
*  main.js中 import 或 require 引入 loader/index.js 文件
*  使用Vue.use 注册插件
*  this.$loader.start()  //开始
*  this.$loader.finish() //完成
> 示例
*  Vue.use(loader, option = {} )  //option 为参数
*  import loader from './plugin/loader/index'
*  Vue.use(loader,{height:'3px',backgroundColor:'red'})
