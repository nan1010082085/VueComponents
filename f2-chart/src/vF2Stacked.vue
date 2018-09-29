<!-- 堆积折线图 -->
<template>
	<div class="vF2-line">
		<canvas :id="id"></canvas>
		<div id="date" ref="dateTop"></div>
	</div>
</template>
<style scoped lang="less" type="text/less">
	.vF2-line {
		position: relative;
		canvas {
			width: 100vw !important;
			height: 2.55rem !important;
		}
	}

	#date {
		visibility: hidden;
		position: absolute;
		width: 10vw;
		text-align: center;
		font-size: 3.2vw;
		color: #fff;
		margin-left: -5vw;
		margin-top: 1vw;
		background-color: #808080;
		padding: 0 2px;
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
      id : { type : String, default : '' },
      'r-data' : { type : Array, default : [] },
      //x轴展示数值个数
      'x-scale' : { type : Number, default : 5 },
      //y轴展示数值个数
      'y-scale' : { type : Number, default : 5 }
    },
    data () {
      return {
        chart : '',
      }
    },
    computed : {},
    watch : {
      'rData' ( arg ) {
        if ( Array.isArray(arg) && arg.length > 0 ) {
          this.$nextTick(_ => {
            this.init(arg)
          })
        }
      }
    },
    methods : {
      init ( arg ) {
        let that = this;
        if ( arg.length > 0 ) {
          this.chart = new this.$f2.Chart({
            id : this.id
          });
          this.chart.source(arg);
          this.chart.scale('date', {
            type : 'timeCat',
            mask : 'MM-DD',
            tickCount : this.xScale
          });
          this.chart.scale([ 'value' ], {
            tickCount : this.xScale,
            formatter : function formatter ( ivalue ) {
              return ivalue
            }
          });
          this.chart.tooltip({
            showCrosshairs : true,
            custom : true, // 自定义 tooltip 内容框
            onChange : function onChange ( obj ) {
              let legend = that.chart.get('legendController').legends.top[ 0 ];
              let tooltipItems = obj.items;
              let legendItems = legend.items;
              let map = {};
              legendItems.map(function ( item ) {
                map[ item.name ] = item
              });
              tooltipItems.map(function ( item ) {
                let name = item.name;
                let value = item.value;
                if ( map[ name ] ) {
                  map[ name ].value = parseFloat(value).toFixed(2);
                }
              });
              legend.setItems(Object.values(map));
              let coord = that.chart.get('coord');
              let title = tooltipItems[ 0 ].title;
              that.$nextTick(_=>{
                try {
                that.$refs.dateTop.innerHTML = title;
                that.$refs.dateTop.setAttribute('style',`visibility:visible;left:${obj.x}px;top:${coord.start.y}px`)
                }catch ( e ) {}
							})
            },
            onHide : function onHide () {
              let legend = that.chart.get('legendController').legends.top[ 0 ];
              legend.setItems(that.chart.getLegendItems().country);
              that.$nextTick(_=>{
                try {
                  that.$refs.dateTop.removeAttribute('style')
                }catch ( e ) {}
              })
            }
          });
          this.chart.legend({
            position : 'top',
            offsetX : 8
          });
          this.chart.area().position([ 'date', 'value' ]).shape('smooth').color('type')
          this.chart.line().position([ 'date', 'value' ]).shape('smooth').color('type')
          this.chart.render();
        }
      }
    },
    mounted () {
      let that = this;
      this.$nextTick(_ => {
        window.addEventListener('resize', function () {
          that.chart.render()
        })
      })
    },
    created () {
      if ( this.id == '' ) {
        console.warn('必须传送id命名')
      }
    }
  }
</script>
