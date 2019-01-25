<template>
	<div class="uic-loader-fixed" :style="{height:height}">
		<span class="uic-steps" :style="{backgroundColor:bgColor}"></span>
	</div>
</template>
<script>
	/*
	 * props
	 * 	@params bgColor 控制加载状态条背景色
	 * 	@params height 控制加载状态条高度
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
        clearInterval(this.steps);
        this.span = document.querySelector('.uic-steps');
        this.span.style.transform = `translate3d(${-100}%,0,0)`;
        this.$el.style.opacity = '1';
      },
      start () {
        this.init();
        let that = this;
        this.step = 1;
        this.$el.style.zIndex = this.zIndex++
        that.steps = setInterval(() => {
          if ( this.step == 80 ) {
            clearInterval(that.steps);
          }
          this.step++;
          that.span.style.transform = `translate3d(${-100 + this.step}%,0,0)`;
        }, 100)
      },
      finish () {
        if(this.step === 0){
          this.init();
        }

        let that = this;
        clearInterval(that.steps)
        that.span.style.transform = `translate3d(${-(100 - this.step) + (100 - this.step)}%,0,0)`;
        let finishTimeout = setTimeout(() => {
          that.span.style.transform = `translate3d(${100}%,-3px,0)`;
          that.$el.style.opacity = '0';
          that.$el.style.transition = 'transform .4s ease-out 0s,opacity .4s ease-out .1s';
          clearTimeout(finishTimeout);
          this.zIndex = 2000;
          this.step = 0
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
        step : 0, //步进器
        steps : '',
        zIndex: 2000
      }
    },
    name : "UicLoader"
  }
</script>
<style scoped lang="less">
	.uic-loader-fixed {
		position: fixed;
		left: 0;
		top: 0;
		width: 100%;
		height: 3px;
		overflow: hidden;
		.uic-steps {
			display: block;
			width: 100%;
			height: 100%;
			background-color: #297dff;
			-webkit-transform: translate3d(-100%, 0, 0);
			transform: translate3d(-100%, 0, 0);
		}
	}
</style>
