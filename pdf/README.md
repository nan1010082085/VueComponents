 ### pdf解析组件 
 
```
main.js 引入使用

import PDF from 'pdf'
Vue.components('PDF', PDF)

//使用
<PDF :visible="visible" :pdfUrl="src"></PDF>


ps: PDFJS插件不支持跨域解析， 如需解析跨域文件 或是测试， 请使用如 vue --> proxy
```