<template>
	<section class="swipe-item"
					 :class="className">
		<slot />
	</section>
</template>
<style scoped lang="less">
	.swipe-item{
		position: relative;
		z-index: 2003;
		transform:translateX(20px);
	}
</style>
<script>
  export default {
    name : "swipeLoopItem",
		props:{
      className:String
		},
		methods:{},
    mounted () {
			this.$el.style.width = this.$slots.default[ 0 ].elm.offsetWidth;
    },
  }
</script>