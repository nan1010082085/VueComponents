<template>
	<div id="toast" v-show="visible">
		<div class="weui-mask_transparent"></div>
		<div class="w-toast" :class="customClass">
			<i v-if="iconClass !== ''" :class="iconClass" class="weui-icon_toast"></i>
			<p class="">{{message}}</p>
		</div>
	</div>
</template>
<style type="text/less" lang="less">
	.w-toast{
		position:fixed;
		z-index:5000;
		width:2rem;
		left:50%;
		margin-left:-1rem;
		background:rgba(17, 17, 17, 0.7);
		text-align:center;
		border-radius:5px;
		color:#FFFFFF;
		p{
			padding: 0.10rem 0;
		}
	}
	.toast-icon-width{
		width: 1.2rem !important;
		margin-left:-0.60rem;
	}
	.pop-top{
		top:0.50rem;
	}
	.pop-middle{
		top: 2.50rem;
	}
	.pop-bottom{
		bottom: 0.50rem;
	}
</style>
<script>
  export default {
    name : "",
    mixins : [],
    props : {
      message: String,
      className: {
        type: String,
        default: ''
      },
      position: {
        type: String,
        default: 'middle'
      },
      iconClass: {
        type: String,
        default: ''
      }
    },
    data () {
      return {
        visible: false,
      }
    },
    computed : {
      customClass() {
        let classes = [];
        switch (this.position) {
          case 'top':
            classes.push('pop-top');
            break;
          case 'bottom':
            classes.push('pop-bottom');
            break;
          default:
            classes.push('pop-middle');
        }
        if(this.iconClass !== ''){
          classes.push('toast-icon-width');
        }
        classes.push(this.className);
        return classes.join(' ');
      }
    },
  }
</script>