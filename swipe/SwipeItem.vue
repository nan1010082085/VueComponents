<template>
	<section class="swipe-item"
					 :class="className"
	         :style="swipeItemStyle">
		<slot />
	</section>
</template>
<style scoped lang="less">
	.swipe-item{
		position: relative;
		z-index: 2003;
	}
</style>
<script>
  export default {
    name : "swipeLoopItem",
		props:{
      className:String
		},
		computed:{
      swipeItemStyle(){
        return `transform:translateX(${this.surpItem}px);`
			},
		},
		data(){
      return {
        surpItem:'',
			}
		},
		methods:{},
    created () {
      this.surpItem = 20 *  ( window.innerWidth / 750)
    },
  }
</script>