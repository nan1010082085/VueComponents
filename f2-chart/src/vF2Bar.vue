<!-- 柱状图 -->
<template>
	<div class="vF2-line">
		<canvas :id="id"></canvas>
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
</style>
<script>
	/*
	 * r-data 数据对象格式
	 * a 嵌套层级
	 * value 数据
	 * type  对比名字
	 *
	 * name 过滤的数据 字符串
	 * */
  export default {
    props : {
      id : { type : String, default : '' },
      'r-data' : { type : Array, default : [] },
      //x轴展示数值个数
      'x-scale' : { type : Number, default : 5 },
      //y轴展示数值个数
      'y-scale' : { type : Number, default : 5 },
      'name' : { type : String, default : '' },
      'unit' : { type : String, default : '元' }
    },
    data () {
      return {
        chart : ''
      }
    },
    computed : {},
    watch : {
      'rData' ( arg ) {
        if ( Array.isArray(arg) && arg.length > 0 ) {
          this.$nextTick(_ => {
            if ( document.querySelector(`#${this.id}`) ) {
              this.init(arg)
            }
          })
        }
      }
    },
    methods : {
      init ( arg ) {
        let that = this;
        let map = {};
        if ( arg.length > 0 ) {
          this.chart = new this.$f2.Chart({
            id : this.id
          });
          this.chart.source(arg);
          this.chart.scale('date', {
            // type : 'timeCat',
            // mask : 'MM-DD',
            tickCount : this.xScale
          });
          this.chart.scale('value', {
            tickCount : this.yScale,
            formatter : function formatter ( ivalue ) {
              return ivalue.toFixed(2)
            }
          });
          this.chart.tooltip({
            custom : true, // 自定义 tooltip 内容框
            onChange : function onChange ( obj ) {
              var legend = that.chart.get('legendController').legends.top[ 0 ];
              var tooltipItems = obj.items;
              var legendItems = legend.items;
              var map = {};
              legendItems.map(function ( item ) {
                map[ item.name ] = item
              });
              tooltipItems.map(function ( item ) {
                var name = item.name;
                var value = item.value;
                if ( map[ name ] ) {
                  map[ name ].value = value;
                }
              });
              legend.setItems(Object.values(map));
            },
            onHide : function onHide () {
              var legend = that.chart.get('legendController').legends.top[ 0 ];
              legend.setItems(that.chart.getLegendItems().country);
            }
          });
          this.chart.legend({
            position : 'top',
            align : 'center'
          });
          this.chart.interval().position('date*value').color('type').adjust({
            type : 'dodge',
            marginRatio : 0.05 // 设置分组间柱子的间距
          });
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
