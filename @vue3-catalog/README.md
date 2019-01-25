#### api
1. config --> 接口域名配置
2. index --> 接口配置

#### assets 静态资源
###### css --> less 预处理器
    1.  theme --> 组件样式
    2.  public --> 全局样式
    3.  reset.css --> 样式重置文件
###### image 
    1. 本地引入图片集合
###### js
    1. 单js文件 *如：某一种功能的方法文件等*
    
#### components 组件集合
    * 当组件不是单文件时 以文件夹包裹
    
#### mixin 全局使用
    main.js 或 .vue文件中混入 js
    
#### plugins 插件目录
    
#### router 路由目录
    每一个功能模块可独立出路由模块
    {
        path:'/',
        name:'Home',
        //webpackChunkName webpack 加载模块名字
        components:() => import( /* webpackChunkName "Home" */ '@views/home/Home'),
        meta : {
          title: '首页'
        }
    }
#### stroe vuex 状态管理
    stror.js 入口文件
    store目录 状态文件
    
#### utils 项目工具目录

#### views 项目页面目录

