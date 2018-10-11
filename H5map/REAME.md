> 本例子 为vant + vue 实现
> 使用了腾讯地图+H5定位 地址逆解析得到所在地址
```
index.html 引入 
<script charset="utf-8" src="https://map.qq.com/api/js?v=2.exp&libraries=convertor"></script>

```
> 附上 vuex代码

```
 state :

 map:{}, //地图定位

 mutations :

 [types.MAP_DATA](state,params){
    state.map = params
 }

 types :

 export const MAP_DATA = 'MAP_DATA';
```