
 * npm i xlsx file-saver -S
 *
 * @XlSX js-xlsx 将JSON数据或dom转换工作表等
 * @FileSaver  将数据生成 blob 二进制流
 *
 * 本 例子为 vue mixins 混入 实现前端导出xlsx
 
> 注意：
    
    * 使用json数组导出xlsx时，请先处理导出字段的表头，生成一个数组动态插入json数据首部；
    * 如要指定导出字段，请自行生成一个过滤后的json数组


> vue 中使用

```
 import excel from 'excel'

   //组件中引入
   export default {
    //...
    mixins : [excel]
    //...
   }
   
   全局引用
   Vue.mixin(excel)


   //调用
   methods:{
       //..
        excel() {
            this.excelplus(document.querySelector('.ex-table'),'测试xlsx')
            this.excelplus(this.tableData,'测试xlsx')
        },
        //..
   }
```