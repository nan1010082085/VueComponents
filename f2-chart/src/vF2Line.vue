<!-- 折线图 -->
<template>
	<div class="vF2-line">
		<canvas :id="id"></canvas>
	</div>
</template>
<style scoped lang="less" type="text/less">
	.vF2-line{
		canvas{
			width: 100vw!important;
			height: 2.55rem!important;
		}
	}
</style>
<script>
	/*
	* r-data 数据对象格式
	* date 日期 x轴
	* value 数据 y轴
	* type  对比名字
	* */
  export default {
    props : {
      id:{type:String,default:''},
			'r-data':{type:Array,default:[]},
      //x轴展示数值个数
			'x-scale':{type:Number,default:5},
			//y轴展示数值个数
			'y-scale':{type:Number,default:5},
		},
    data () {
      return {
        chart:'',
			}
    },
    computed : {},
    watch : {
      'rData'(arg){
        if(Array.isArray(arg) && arg.length > 0){
          this.$nextTick(_=>{
            this.init(arg)
					})
        }
			}
		},
    methods : {
      init(arg){
        if ( arg.length > 0 ) {
          this.chart = new this.$f2.Chart({
            id : this.id
          });
          this.chart.source(arg);
          this.chart.scale('date', {
            type : 'timeCat',
            mask : 'MM-DD',
            tickCount : this.xScale,
          });
          this.chart.scale([ 'value' ], {
            tickCount : this.xScale,
            formatter : function formatter ( ivalue ) {
              return ivalue
            }
          });
          this.chart.legend({
            position : 'top',
            align:'center',
            offsetX : 10
          });
          this.chart.line().position([ 'date','value']).shape('smooth').color('type');
          this.chart.render();
        }
			}
		},
		mounted () {
      let that = this;
      this.$nextTick(_=>{
        window.addEventListener('resize',function () {
          that.chart.render()
        })
			})
    },
    created () {
      if(this.id == ''){
        console.warn('必须传送id命名')
			}
    },
  }
</script>