# loader

> 使用示例
```
//loader 组件提供两个调用方法 start finish
* start 进度条每100ms前进1% 最大80% 并且不会消失
* finish 进度进度100%  1s 后消失并remove dom

  this.$loader.start()
  
  this.$loader.finish()
  
```


> 引用
```
import Loader from './views/loader'

Vue.prototype.$loader = Loader.setDefaultOptions({maximum : 75, color : '#f00'})

ps: setDefaultOptions() 传入一个对象 提供初始化设置
    可对以下参数进行初始化设置
      maximum : 75,  //start 方法最大进度 | number
      color : '#f00' //进度条染色 | 16进制
      height: '2.5' //进度条高度 | number | string
      timer: '1000' //finish调用后 进度条消失 | number
```