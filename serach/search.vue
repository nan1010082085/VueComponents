<template>
	<div class="search">
		<div class="search-bacground" :class="{w85:visibleInput}" @click="showInput">
			<Icon class="icon" name="search" :class="{pl8:visibleInput}"></Icon>
			<input placeholder="输入vlaue"  :class="{w80:visibleInput}" type="text" v-model="value" ref="inputSearch" @blur="inpHidden">
		</div>
		<p class="search-close" :class="{inlineBlock:visibleInput,none:!visibleInput}" @click="inpHidden">取消</p>
	</div>
</template>
<script>
  import {Icon} from 'vant'
  export default {
    name : "",
    mixins : [],
    props : {},
    components : {Icon},
    data () {
      return {
        value:'',
        visibleInput: false
      }
    },
    computed : {},
    watch : {
      visibleInput(bool){
        if(bool){
          this.$refs.inputSearch.setAttribute('autofocus','autofocus');
        }else {
          this.$refs.inputSearch.removeAttribute('autofocus')
        }
      },
    },
    methods : {
      showInput(){
        this.visibleInput = true;
        console.log(this.$refs.inputSearch);
      },
      inpHidden(){
        this.visibleInput = false;
      },
    },
    mounted () {
    },
    created () {
    },
    filters : {},
    beforeDestroy () {
      //vue实例正在被销毁,还可以调用this,data
    },
    destroyed () {
      //vue实例被销毁了
    }
  }
</script>
<style scoped lang="less" type="text/less">
	.search{
		padding: 10px;
		height: 40px;
		overflow: hidden;
		.search-bacground{
			font-size: 14px;
			display: inline-block;
			height: 30px;
			line-height: 30px;
			width: 100%;
			background-color: #fff;
			border: 1px solid #c7c7c7;
			border-radius: 3px;
			transition: all .2s;
			overflow: hidden;
			.icon{
				padding-left: 25%;
				padding-right: 8px;
				vertical-align: middle;
				transition: all .2s ease .1s;
			}
		}
		p{
			height: 30px;
			line-height: 30px;
			display: inline-block;
			font-size: inherit;
			overflow: hidden;
		}
		input{
			caret-color: #0082ef;
			font-size: 14px;
			width: 68%;
		}
		.search-close{
			opacity: 0;
			padding-left: 10px;
			font-size: 16px;
			color: #0082ef;
		}
	}
	.pl8{
		padding-left: 8px!important;
		transition: all .2s ease;
	}
	.tac{
		text-align: center;
	}
	.w85{
		width: 85%!important;
	}
	.w80{
		width: 80%!important;
		transition: all .2s ease .2s;
	}
	.none{
		display: none!important;
	}
	.inlineBlock{
		display: inline-block!important;
	}
	.w85+.search-close{
		opacity: 1;
		transition: opacity .2s ease .2s;
	}
</style>