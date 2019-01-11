<template>
	<section class="swipe-item" :class="className">
		<slot />
	</section>
</template>
<style scoped lang="less">
	.swipe-item{
		transform:translateX(20px);
	}
</style>
<script>
  export default {
    name : "swipeLoopItem",
		props:{
      className:String
		},
    mounted () {
			this.$el.style.width = this.$slots.default[ 0 ].elm.offsetWidth;
    },
  }
</script>