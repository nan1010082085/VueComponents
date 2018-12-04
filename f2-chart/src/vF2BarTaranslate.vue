<!-- 柱状图 平移 -->
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
      'y-scale' : { type : Number, default : 5 }
      // 'name' : { type : String, default : '' },
      // 'unit' : { type : String, default : '元' }
    },
    data () {
      return {
        chart : ''
      }
    },
    computed : {},
    watch : {
      'rData' : {
        handler ( arg ) {
          if ( Array.isArray(arg) && arg.length > 0 ) {
            this.$nextTick(_ => {
              if ( document.querySelector(`#${this.id}`) ) {
                this.init(arg)
              }
            })
          }
        },
        deep : true,
        immediate : true
      }
    },
    methods : {
      init ( arg ) {
        let that = this;
        let map = {};
        if ( arg.length > 0 ) {
          let originDates = []
          let originValues = []
					let firstDayArr = []

          this.chart = new this.$f2.Chart({
            id : this.id,
            padding: ['auto', 'auto', 65, 'auto']
          });

          arg.forEach((obj,index)=>{
            if(index < 7){
              originDates.push(obj.date)
              originValues.push(obj.value)
              firstDayArr.push(obj)
            }
          })

          this.chart.source(arg,{
            date:{
              tickCount: 7,
              values: originDates,
						},
						value:{
              tickCount:5
						}
					});
          this.chart.axis('date', {
            tickLine: {
              length: 1,
              stroke: '#cacaca'
            },
            label:(text)=>{
              return  {
                text: text.substr(0,5) +'...',
                rotate: -Math.PI / 4,
                textAlign: 'end',
                textBaseline: 'middle'
              }
						},
            line: {
              top: true
            },
          });
          this.chart.axis('value', {
            position : 'left',
            label : function label ( text ) {
              return {
                text :  that.formatNumber(text),
              };
            },

            grid : {
              stroke : '#d1d1d1'
            }
          });
          this.chart.tooltip({
            showItemMarker : false,
            background : {
              radius : 2,
              padding : [ 5, 5 ]
            },
            onShow : function onShow ( ev ) {
              // console.log(ev)
              var items = ev.items;
              items[ 0 ].name = items[ 0 ].title;
              items[ 0 ].value = items[ 0 ].value + ' 元';
            }
          });
          this.chart.legend(false)
          this.chart.interval().position('date*value').color('type').style({
            radius : [ 2, 2, 0, 0 ]
          })
          // 定义进度条
          this.chart.scrollBar({
            mode : 'x',
            xStyle : {
              backgroundColor : '#e8e8e8',
              fillerColor : '#808080',
              offsetY : -2
            }
          });
          firstDayArr.forEach(function(obj) {
            // that.chart.guide().line({
            //   top: false,
            //   start: [obj.date, 'min'],
            //   end: [obj.date, 'max'],
            //   style: {
            //     lineWidth: 1,
            //     stroke: '#A4A4A4'
            //   }
            // });
            // that.chart.guide().text({
            //   position: [obj.date, 'max'],
            //   content: obj.date.substr(0,5) + '...',
            //   style: {
            //     textAlign: 'start',
            //     fill: '#cacaca',
            //     textBaseline: 'bottom'
            //   },
            //   offsetX: 5,
            //   offsetY: 5
            // });
          });

          this.chart.interaction('pan');
          this.chart.render();
        }
      },
      formatNumber(n) {
        return String(Math.floor(n * 100) / 100).replace(/\B(?=(\d{3})+(?!\d))/g, ',');
      },
      formatText(str){
        console.log(str)
        return str.substr(0,5) + '...'
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
