<!-- 饼图文本 -->
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
      'name' : { type : String, default : '' },
      'unit' : { type : String, default : '元' }
    },
    data () {
      return {
        chart : '',
        ANCHOR_OFFSET : 5,
        OFFSET : 15,
        APPEND_OFFSET : 30,
        LINEHEIGHT : 32,
        coord : '', // 获取坐标系对象
        center : '', // 极坐标圆心坐标
        r : '', // 极坐标半径
        canvas : '',
        canvasWidth : '',
        canvasHeight : '',
        labelGroup : '',
        labels : [],
        halves : [],
        maxCountForOneSide : ''
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
          this.chart = new this.$f2.Chart({
            id : this.id
            // padding: [20, 'auto']
          });

          this.chart.source(arg);
          this.chart.coord('polar', {
            transposed : true,
            radius : .80
          });
          this.chart.tooltip(false);
          this.chart.legend(false);
          this.chart.axis(false);
          this.chart.interval().position('a*value').color('type',['#1890FF', '#13C2C2', '#2FC25B', '#FACC14', '#F04864', '#8543E0']).adjust('stack').style({
            lineWidth: 1,
            stroke: '#fff',
            lineJoin: 'round',
            lineCap: 'round'
          });

          this.chart.render();

          window.setTimeout(() => {
            this.coord = this.chart.get('coord'); // 获取坐标系对象
            this.center = this.coord.center; // 极坐标圆心坐标
            this.r = this.coord.circleRadius; // 极坐标半径
            this.canvas = this.chart.get('canvas');
            this.canvasWidth = this.chart.get('width');
            this.canvasHeight = this.chart.get('height');
            this.labelGroup = this.canvas.addGroup();
            this.addPieLabel(this.chart);
          }, 0)
        }
      },
      getEndPoint ( center, angle, r ) {
        return {
          x : center.x + r * Math.cos(angle),
          y : center.y + r * Math.sin(angle)
        };
      },
      //绘制文本连接线
      drawLabel ( label ) {
        let that = this;
        let _data = label._data,
          _anchor = label._anchor,
          _router = label._router,
          fill = label.fill,
          y = label.y;

        let labelAttrs = {
          y : y,
          fontSize : 12, // 字体大小
          fill : '#808080',
          text : _data.date + '\n' + _data.value.toFixed(2),
          textBaseline : 'middle',
          lineHeight: 16,
        };
        let lastPoint = {
          y : y
        };

        if ( label._side === 'left' ) {
          // 具体文本的位置
          lastPoint.x = that.APPEND_OFFSET;
          labelAttrs.x = that.APPEND_OFFSET; // 左侧文本左对齐并贴着画布最左侧边缘
          labelAttrs.textAlign = 'left';
        } else {
          lastPoint.x = that.canvasWidth - that.APPEND_OFFSET;
          labelAttrs.x = that.canvasWidth - that.APPEND_OFFSET; // 右侧文本右对齐并贴着画布最右侧边缘
          labelAttrs.textAlign = 'right';
        }

        // 绘制文本
        let text = that.labelGroup.addShape('Text', {
          attrs : labelAttrs
        });
        that.labels.push(text);

        // 绘制锚点
        that.labelGroup.addShape('Circle', {
          attrs : {
            x : _anchor.x,
            y : _anchor.y,
            r : 2,
            fill : fill
          }
        });
        // 绘制连接线
        let points = void 0;
        if ( _router.y !== y ) {
          // 文本位置做过调整
          points = [ _anchor, {
            x : _router.x,
            y : y
          }, lastPoint ];
        } else {
          points = [ _anchor, _router, lastPoint ];
        }

        that.labelGroup.addShape('Polyline', {
          attrs : {
            points : points,
            lineWidth : 1,
            stroke : fill
          }
        });
      },
      antiCollision ( half, isRight ) {
        let that = this;
        let startY = that.center.y - that.r - that.OFFSET - that.LINEHEIGHT;
        let overlapping = true;
        let totalH = that.canvasHeight;
        let i = void 0;

        let maxY = 0;
        let minY = Number.MIN_VALUE;
        let boxes = half.map(function ( label ) {
          let labelY = label.y;
          if ( labelY > maxY ) {
            maxY = labelY;
          }
          if ( labelY < minY ) {
            minY = labelY;
          }
          return {
            size : that.LINEHEIGHT,
            targets : [ labelY - startY ]
          };
        });
        if ( maxY - startY > totalH ) {
          totalH = maxY - startY;
        }

        while ( overlapping ) {
          boxes.forEach(function ( box ) {
            let target = (Math.min.apply(minY, box.targets) + Math.max.apply(minY, box.targets)) / 2;
            box.pos = Math.min(Math.max(minY, target - box.size / 2), totalH - box.size);
          });

          // detect overlapping and join boxes
          overlapping = false;
          i = boxes.length;
          while ( i-- ) {
            if ( i > 0 ) {
              let previousBox = boxes[ i - 1 ];
              let box = boxes[ i ];
              if ( previousBox.pos + previousBox.size > box.pos ) {
                // overlapping
                previousBox.size += box.size;
                previousBox.targets = previousBox.targets.concat(box.targets);

                // overflow, shift up
                if ( previousBox.pos + previousBox.size > totalH ) {
                  previousBox.pos = totalH - previousBox.size;
                }
                boxes.splice(i, 1); // removing box
                overlapping = true;
              }
            }
          }
        }

        // step 4: normalize y and adjust x
        i = 0;
        boxes.forEach(function ( b ) {
          let posInCompositeBox = startY; // middle of the label
          b.targets.forEach(function () {
            half[ i ].y = b.pos + posInCompositeBox + that.LINEHEIGHT / 2;
            posInCompositeBox += that.LINEHEIGHT;
            i++;
          });
        });

        // (x - cx)^2 + (y - cy)^2 = totalR^2
        half.forEach(function ( label ) {
          let rPow2 = label.r * label.r;
          let dyPow2 = Math.pow(Math.abs(label.y - that.center.y), 2);
          if ( rPow2 < dyPow2 ) {
            label.x = that.center.x;
          } else {
            let dx = Math.sqrt(rPow2 - dyPow2);
            if ( !isRight ) {
              // left
              label.x = that.center.x - dx;
            } else {
              // right
              label.x = that.center.x + dx;
            }
          }
          that.drawLabel(label);
        });
      },
      addPieLabel ( chart ) {
        let that = this;
        that.halves = [ [], // left
          [] // right
        ]; // 存储左右 labels
        that.labelGroup && that.labelGroup.clear();
        let geom = chart.get('geoms')[ 0 ];
        // 获取文本的信息
        let shapes = geom.get('container').get('children');
        shapes.forEach(function ( shape ) {
          let shapeAttrs = shape.attr();
          let origin = shape.get('origin');
          let startAngle = shapeAttrs.startAngle,
            endAngle = shapeAttrs.endAngle;

          let middleAngle = (startAngle + endAngle) / 2;
          let edgePoint = that.getEndPoint(that.center, middleAngle, that.r + that.ANCHOR_OFFSET);
          let routerPoint = that.getEndPoint(that.center, middleAngle, that.r + that.OFFSET);
          let label = {
            _anchor : edgePoint,
            _router : routerPoint,
            _data : origin._origin,
            x : routerPoint.x,
            y : routerPoint.y,
            r : that.r + that.OFFSET,
            fill : origin.color // 字体颜色
          };
          // 判断文本的方向
          if ( edgePoint.x < that.center.x ) {
            label._side = 'left';
            that.halves[ 0 ].push(label);
          } else {
            label._side = 'right';
            that.halves[ 1 ].push(label);
          }
        });

        that.maxCountForOneSide = parseInt(that.canvasHeight / that.LINEHEIGHT, 10);

        that.halves.forEach(function ( half, index ) {
          // step 2: reduce labels
          if ( half.length > that.maxCountForOneSide ) {
            half.sort(function ( a, b ) {
              return b._percent - a._percent;
            });
            half.splice(that.maxCountForOneSide, half.length - that.maxCountForOneSide);
          }

          // step 3: distribute position (x and y)
          half.sort(function ( a, b ) {
            return a.y - b.y;
          });
          that.antiCollision(half, index);
          that.canvas.draw();
        });
      },
      mounted () {
        let that = this;
        this.$nextTick(_ => {
          window.addEventListener('resize', function () {
            that.chart.render()
						setTimeout(()=>{
              that.addPieLabel(that.chart);
						},350)
          })
        })
      },
      created () {
        if ( this.id == '' ) {
          console.warn('必须传送id命名')
        }
      }
    }
  }
</script>
