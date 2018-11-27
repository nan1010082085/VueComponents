>vuex代码

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