
const homeModel = [
  {
    path:'/',
    name:'Home',
    //webpackChunkName webpack 加载模块名字
    component:() => import( /* webpackChunkName "Home" */ "@views/home/Home"),
    meta : {
      title: '首页'
    }
  }
]

export default homeModel