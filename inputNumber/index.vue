<!--步进器， 加减-->
<template>
	<div class="input-number">
		<span @click="handleChange('--')">-</span>
		<input type="number" max="999" min="0" v-model="values" @input="handleInput" @blur="handleBlur"/>
		<span @click="handleChange('++')">+</span>
	</div>
</template>
<script>
	export default {
		name: 'inputNumber',
		data () {
			return {
				values:1
			}
		},
		props: {
			value:{
				type:Number,
				default: 1
			}
		},
		watch:{
			value:{
				handler(val){
					this.values = val
				},
				immediate:true
			}
		},
		methods: {
			handleChange(str){
				switch (str) {
					case '--':
						this.values > 0 ? this.values-- : 0
						this.$emit('change', this.values)
						;break;
					case '++':
						this.values < 999 ? this.values++ : 999
						this.$emit('change', this.values)
						;break;
				}
			},
			handleInput(evt){
				if(evt.target.value >= 999){
					this.values = 999
				}else if(evt.target.value <= 0){
					this.values = 0
				}
				this.$emit('change', this.values)
			},
			handleBlur(evt){
				if(evt.target.value >= 999){
					this.values = 999
				}else if(evt.target.value <= 0){
					this.values = 0
				}
				this.$emit('change', this.values)
			},
		},
		filters: {}
	}
</script>
<style scoped lang="less">
	@font-family : PingFangSC-Medium, PingFangSC-Semibold, PingFangSC-Regular, FZQKBYSJW--GB1-0, SourceHanSansCN-Normal,SourceHanSansCN-Regular, SourceHanSansCN-Medium, SourceHanSansCN-Bold;
	.input-number{
		display: flex;
		align-items: center;
		span{
			display: inline-block;
			width: 12px;
			font-size:18px;
			font-family:@font-family;
			font-weight:bold;
			color:rgba(0,0,0,1);
			line-height:25px;
		}
		input{
			margin: 0 6px;
			width:37px;
			height:15px;
			background:rgba(245,245,245,1);
			border-radius:2px;
			text-align: center;
			font-size:10px;
			font-weight:400;
			line-height:20px;
			font-family: @font-family;
		}
	}
</style>