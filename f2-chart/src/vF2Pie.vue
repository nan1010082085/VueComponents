<!-- 饼图 -->
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
			'name':{ type : String, default : ''},
			'unit':{ type : String, default : '元'}
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
        arg.map(obj =>{
          obj.value = Number(obj.value)
          map[obj.type] = obj.value + ' '+this.unit
				});
        if(this.name != ''){
          arg =	arg.filter(data =>{ if(data.type != this.name){ return data}})
        }
        if ( arg.length > 0 ) {
          this.chart = new this.$f2.Chart({
            id : this.id,
            padding: [20, 'auto']
          });
          this.chart.source(arg);
          this.chart.scale([ 'value' ], {
            formatter : function formatter ( ivalue ) {
              return ivalue
            }
          });
          this.chart.legend({
            position: 'right',
            itemFormatter: function itemFormatter(val) {
              return val +' '+ map[val]
            }
          });
          this.chart.coord('polar', {
            transposed: true,
            innerRadius: 0.655,
            radius: 0.85
          });
          this.chart.tooltip(false);
          this.chart.axis(false);
          this.chart.interval().position('a*value').color('type', ['#FE5D4D', '#3BA4FF', '#737DDE']).adjust('stack').style({
            lineWidth: 1,
            stroke: '#fff',
            lineJoin: 'round',
            lineCap: 'round'
          });
          this.chart.guide().html({
            position: ['50%', '45%'],
            html: `<div style="width: 2.5rem;height: 0.4rem;padding-top: 0.1rem;text-align: center;">
										<div>
											<span id="number" style="font-size: 16px;font-weight: 600;">${map[that.name]}</span>
											<br/>
											<span id="name" style="font-size: 14px;">流入资金</span>
										</div>
									</div>`
          });
          this.chart.render();
          this.chart.interaction('pie-select', {
            animate: {
              duration: 300,
              easing: 'backOut'
            },
            defaultSelected: {
              type: that.name,
              value: map[that.name],
              a: '1'
            },
            onEnd: function onEnd(ev) {
              var shape = ev.shape,
                data = ev.data,
                shapeInfo = ev.shapeInfo,
                selected = ev.selected;

              if (shape) {
                if (selected) {
                  document.querySelector('#number').style.color = shapeInfo.color;
                  document.querySelector('#number').innerHTML = map[data.type];
                  document.querySelector('#name').innerHTML = data.type;
                } else {
                  document.querySelector('#name').innerHTML = '流入资金';
                  document.querySelector('#number').innerHTML = map[that.name];
                }
              }
            }
          });
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
