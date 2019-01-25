<template>
	<div id="app">
		<transition name="slide-fade" mode="out-in">
			<router-view/>
		</transition>
	</div>
</template>
<style lang="less" type="text/less">
</style>
<script>
  export default {
    components : {},
		mixins:[],
    data () {
      return {}
    },
		watch:{},
    computed : {},
    methods:{},
    mounted () {}
  }
</script>
