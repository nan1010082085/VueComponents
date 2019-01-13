<template>
	<div class="loader-fixed" :style="{height:height}">
		<span class="steps" :style="{backgroundColor:bgColor}"></span>
	</div>
</template>
<script>
	/*
	 * props
	 * 	@params bgColor 控制加载状态条背景色 默认 #297dff
	 * 	@params height 控制加载状态条高度  默认 3px
	 * methods
	 * 	@params init  存储元素
	 * 	@params start 开始加载 -> 无完成时最大80%
	 * 	@params finish 完成 -> 100% 300ms后消失
	 * 使用
	 *  main.js中 import 或 require 引入 loader/index.js 文件
	 *  使用Vue.use 注册插件
	 * 示例
	 *  Vue.use(loader, option = {} )  //option 为参数
	 * * * *
	 *  import loader from './plugin/loader/index'
	 *  Vue.use(loader,{height:'3px',backgroundColor:'red'})
	 * */
  export default {
    methods : {
      init () {
        this.span = document.querySelector('.steps');
        this.span.style.transform = `translate3d(${-100}%,0,0)`;
        this.$el.style.opacity = '1';
        clearInterval(this.steps);
      },
      start () {
        this.init();
        let that = this;
        let step = 1;
        that.steps = setInterval(() => {
          if ( step == 80 ) {
            clearInterval(that.steps);
          }
          step++;
          that.span.style.transform = `translate3d(${-100 + step}%,0,0)`;
        }, 100)
      },
      finish () {
        this.init();
        let that = this;
        clearInterval(that.steps)
        that.span.style.transform = `translate3d(${-100 + 100}%,0,0)`;
        let finishTimeout = setTimeout(() => {
          that.$el.style.opacity = '0';
          that.$el.style.transition = 'transform .4s ease 0s';
          clearTimeout(finishTimeout);
        }, 300)
      }
    },
    props : {
      'bg-color' : String,
      'height' : String
    },
    data () {
      return {
        loader : '',
        span : '',
        steps : '' //步进器
      }
    },
    name : "loader"
  }
</script>
<style scoped lang="less" type="text/less">
	.loader-fixed {
		position: fixed;
		z-index: 9999;
		left: 0;
		top: 0;
		width: 100%;
		height: 3px;
		overflow: hidden;
		.steps {
			display: block;
			width: 100%;
			height: 100%;
			background-color: #297dff;
			-webkit-transform: translate3d(-100%, 0, 0);
			transform: translate3d(-100%, 0, 0);
		}
	}
</style>