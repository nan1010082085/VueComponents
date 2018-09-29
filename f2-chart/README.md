#### f2-chant 使用

1. npm i @antv/f2 -S 安装图表
2. 复制 f2.js 到 工程中 App.vue 同级目录下
3. 打开 main.js 复制代码到 工程共 main.js
4. 复制src中文件放入工程中目录

5. .vue 中使用
```
引入
import vF2Stacked              from '../../components/vF2Stacked'
//注册
components : { vF2Stacked },

template 中

<vF2Stacked id="mountNode1" :r-data="f2Data1" :x-scale="2"></vF2Stacked>

```
> 参数
```
 注： 数组格式 每一种类展示的type最终都放在一个数组中
```
* id  canvas唯一类名 `必填` String
* r-data 数据对象格式  Array
* date 日期 x轴
* value 数据 y轴
* type  对比名字
* x-scake x轴展示数值展示个数
* y-scake y轴展示数值展示个数

> 示例 
```
 let roleData = response.data.data
 let In = [], to = [], price = []; //展示的每一项
              if ( roleData ) {
                roleData.in.forEach(( item, index ) => {
                  In[ index ] = {
                    type : '流入',
                    date : item.date,
                    value : item.amount
                  }
                  price[ index ] = {
                    type : '余额增长',
                    date : item.date,
                  }
                })
                roleData.out.forEach(( item, index ) => {
                  to[ index ] = {
                    type : '流出',
                    date : item.date,
                    value : item.amount
                  }
                })
                price.map((item,index)=>{ //某一项需要其中两项计算
                  item['value'] = (roleData.in[index].amount - roleData.out[index].amount).toFixed(2)
                })
                if ( In.length > 0 && to.length > 0 && price.length > 0 ) {
                  this.f2Data1 = [ ...In, ...to, ...price ] //...扩展运算 合并为一个数组
                }
              }
```