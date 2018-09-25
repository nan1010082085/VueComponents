# toast
#####参考 mint-ui
```
<template>
	<div id="toast" v-show="visible">
		<div class="weui-mask_transparent"></div>
		<div class="w-toast" :class="customClass">
			<i v-if="iconClass !== ''" :class="iconClass" class="weui-icon_toast"></i>
			<p class="">{{message}}</p>
		</div>
	</div>
</template>
```

* 引入weui.css || 或自定义遮罩样式， icon 样式

* 使用下载整个文件 放入项目目录 main.js 中

```
import Toast from './components/toast/index';

Vue.prototype.$toast = Toast
```