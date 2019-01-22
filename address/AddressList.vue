<template>
	<div class="address-ganged" v-show="visibilityShow">
		<div class="address-model"
				 :class="[visibilityShow ? 'address-show' : '']"
				 @click.stop="close"></div>
		<div
			class="address-container"
			:class="[visibilityShow ? 'address-show' : '']">
			<div class="list-warp-header" :style="`${isAndroid ? styleCss[2]: ''}`" ref="header">
				<div class="list-header-item-ctn">
					<div class="item-ctn" v-for="(item,index) in activeData" :key="index">{{item?item.value : ''}}</div>
				</div>
				<div class="list-header-item confirm" :style="`color:${color};`" @click="handleConfirm">
					确定
				</div>
			</div>
			<div class="list-warp" ref="list-warp" :style="`${isAndroid ? styleCss[3]: ''}`">
				<div class="list-warp-item-active" :style="`${isAndroid ? styleCss[0]: styleCss[1]}`" ref="item-active"></div>
				<div class="list-warp-item province"
						 ref="province"
						 parent="province"
						 @touchstart="handleItemStart($event ,'province')"
						 @touchmove.prevent="handleItemMove($event ,'province')"
						 @touchend="handleItemEnd($event ,'province','city','county','street')">
					<div class="list-item__cell"
							 @click.prevent.stop="handleClick($event ,'province','city','county','street')"
							 v-for="(item,index) in provinces"
							 :index="index"
							 :key="index"
							 :class="{'list-warp-item__active':item.isCheck}"
							 :style="`${isAndroid ? styleCss[4]: ''}`">
						{{item.value}}
					</div>
				</div>
				<div class="list-warp-item city"
						 ref="city"
						 parent="city"
						 @touchstart="handleItemStartCity($event ,'city')"
						 @touchmove.prevent="handleItemMoveCity($event ,'city')"
						 @touchend="handleItemEndCity($event ,'city','county','street')">
					<div class="list-item__cell"
							 @click.prevent.stop="handleClickCitys($event ,'city','county','street')"
							 v-for="(item,index) in citys"
							 :index="index"
							 :key="index"
							 :class="{'list-warp-item__active':item.isCheck}"
							 :style="`${isAndroid ? styleCss[4]: ''}`">
						{{item.value}}
					</div>
				</div>
				<div class="list-warp-item county"
						 ref="county"
						 parent="county"
						 @touchstart="handleItemStartCounty($event ,'county')"
						 @touchmove.prevent="handleItemMoveCounty($event ,'county')"
						 @touchend="handleItemEndCounty($event ,'county','street')">
					<div class="list-item__cell"
							 @click.prevent.stop="handleClickCounty($event ,'county','street')"
							 v-for="(item,index) in countys"
							 :index="index"
							 :key="index"
							 :class="{'list-warp-item__active':item.isCheck}"
							 :style="`${isAndroid ? styleCss[4]: ''}`">
						{{item.value}}
					</div>
				</div>
				<div class="list-warp-item street"
						 ref="street"
						 parent="street"
						 @touchstart="handleItemStartStreet($event ,'street')"
						 @touchmove.prevent="handleItemMoveStreet($event ,'street')"
						 @touchend="handleItemEndStreet($event ,'street')">
					<div class="list-item__cell"
							 @click.prevent.stop="handleClickStreet($event,'street')"
							 v-for="(item,index) in streets"
							 :index="index"
							 :key="index"
							 :class="{'list-warp-item__active':item.isCheck}"
							 :style="`${isAndroid ? styleCss[4]: ''}`">
						{{item.value}}
					</div>
				</div>
			</div>
		</div>
	</div>
</template>
<style scoped lang="less">
	@import "./css/address-list";
</style>
<script>
  import citys           from './mixin/citys'
  import countys         from './mixin/countys'
  import streets         from './mixin/streets'
  import { extendClone } from "./util/util";

  export default {
    components : {},
    mixins : [ citys, countys, streets ],
    name : "Address-List",
    data () {
      return {
        visibilityShow : false,
        provinces : [],
        citys : [],
        countys : [],
        streets : [],
        activeData : [],

        initTop : 0, //初始化移动距离
        transformY : 0,
        startY : 0,
        moveY : 0,
        isZF : false, //判断 上下滑动方向
        currentItem : '', //当前滚动是那个 item
        currentSweep : 0,  //移动起始距离
        sweep : 0,  //计算一次移动是几个元素位
        currentIndex : 0,

        updown : false,
        isProvincesClick : false,

				isEditStart: false, //控制默认选中第一次 以确保选中样式生效

        saveValueData : null,
				//判断android 修改固定样式
				isAndroid:false,
				styleCss:[
					`height:44px;position:absolute;z-index:-1;`,
          `position:absolute;z-index:-1;`,
					`height: 50px;line-height: 50px`,
					`height: calc(50vh - 50px);`,
					`height: 44px;line-height: 44px;`
				]
      }
    },
    props : {
      visible : {
        type : Boolean,
        default : false
      },
      province : {
        type : Array,
        default : () => []
      },
      city : {
        type : Array,
        default : () => []
      },
      county : {
        type : Array,
        default : () => []
      },
      street : {
        type : Array,
        default : () => []
      },
      color : {
        type : String,
        default : '#BA0000'
      },
      valueData : Object
    },
    computed : {},
    watch : {
      visible ( ISSHOW ) { //显示
        this.visibilityShow = ISSHOW;
        //显示时 控制是否是选中第一次
				this.isEditStart = false
      },
      visibilityShow ( Bool ) {
        if ( Bool ) {
          this.$nextTick(() => {
            this.init('province')
          })
        }
      },
      province : {
        handler ( isArray ) {
            if ( isArray && isArray.length > 0 && Array.isArray(isArray) ) {
              this.$nextTick(() => {
                if ( this.provinces.length <= 0 ) {
                  this.provinces = extendClone(this.province)

                  // console.info(this.provinces.length > 0, 'province')
                  //当省有数据时 执行选中获取
                  let provine = new Promise((resolve)=>{
                    // console.log('valueData');
                    while (this.provinces.length > 0 ) {
                      // console.info('promise >0')
                      return resolve(true)
                    }
                  })

                  provine.then((Bool)=>{
                    if(Bool){
                      this.setValueData(this.valueData)
                    }
                  })
									//默认选中时 第一条数据不选中 不移动
                  if(!this.valueData){
                    this.init('province', true)
									}
                } else {
                  this.init('province', false)
                }
              })
          }
        },
        deep : true,
        immediate : true
      },
      city : {
        handler ( isArray ) {
          if ( isArray && Array.isArray(isArray) ) {
            this.$nextTick(() => {
              if ( this.citys|| isArray[ 0 ].id != this.citys[ 0 ].id ) {
                this.citys = extendClone(this.city);
                if(this.saveValueData && this.isEditStart) { //执行一次
                  this.citys.forEach(( item, index ) => { //判断id 第一位不选中 不移动
                    if ( item.id == this.valueData.cityId ) {
                      item.isCheck = true;
                      this.initCity('city', false)
                      return
                    }
                  })
                }else {
                  this.initCity('city', true)
                }
              } else {
                this.initCity('city', false)
              }
            })
          }
        },
        deep : true,
        immediate : true
      },
      county : {
        handler ( isArray ) {
          if ( isArray  && Array.isArray(isArray) ) {
            this.$nextTick(() => {
              if ( this.countys || isArray[ 0 ].id != this.countys[ 0 ].id ) {
                this.countys = extendClone(this.county);

                if(this.saveValueData && this.isEditStart){
                  this.countys.forEach(( item, index ) => {
                    if ( item.id == this.valueData.districtId ) {
                      item.isCheck = true;
                      this.initCounty('county', false)
                      return
                    }
                  })
								}else {
                  this.initCounty('county', true)
                }
              } else {
                this.initCounty('county', false)
              }
            })
          }
        },
        deep : true,
        immediate : true
      },
      street : {
        handler ( isArray ) {
          if ( isArray && Array.isArray(isArray) ) {
            this.$nextTick(() => {
              if ( this.streets || isArray[ 0 ].id != this.streets[ 0 ].id ) {
                this.streets = extendClone(this.street);
                if(this.saveValueData && this.isEditStart){
									this.streets.forEach(( item, index ) => {
										if ( item.id == this.valueData.townId ) {
											item.isCheck = true;
											this.initStreet('street', false)
											return
										}
									})
                }else {
                  this.initStreet('street', true)
                }
              } else {
                this.initStreet('street', false)
              }
            })
          }
        },
        deep : true,
        immediate : true
      },
      valueData : {
        handler ( org ) {
          if ( org ) {
            this.$nextTick(() => {
              this.saveValueData = extendClone(org)
							this.isEditStart = true
            })
          }
        },
        deep : true,
				immediate:true
      }
    },
    methods : {
      open () {
        this.visibilityShow = true;
        this.$emit('open');
      },
      close () {
        this.visibilityShow = false;
        this.activeData.forEach(( data, index ) => {
          if ( !data ) {
            switch ( index ) {
              case 1:
                if ( this.citys.length > 0 ) {
                  data = this.citys[ 0 ]
                }
                break;
              case 2:
                if ( this.countys.length > 0 ) {
                  data = this.countys[ 0 ]
                }
                break;
              case 3:
                if ( this.streets.length > 0 ) {
                  data = this.streets[ 0 ]
                }
                break;
            }
          }
        })
        this.$emit('close', this.activeData);
      },
      handleConfirm () {
        this.activeData.forEach(( data, index ) => {
          if ( !data ) {
            switch ( index ) {
              case 1:
                if ( this.citys.length > 0 ) {
                  data = this.citys[ 0 ]
                }
                break;
              case 2:
                if ( this.countys.length > 0 ) {
                  data = this.countys[ 0 ]
                }
                break;
              case 3:
                if ( this.streets.length > 0 ) {
                  data = this.streets[ 0 ]
                }
                break;
            }
          }
        })
        this.activeData.filter(( item ) => item)
        this.$emit('confirm', this.activeData);
      },
      init ( scrolllElm, setCheck ) {
        let that = this;
        setTimeout(() => {
          // console.log(that.$refs[ 'item-active' ].offsetTop);
          //that.$refs[ 'item-active' ].offsetTop - that.$refs['header'].offsetHeight
          that.initTop = that.$refs[ 'item-active' ].offsetTop - that.$refs[ 'header' ].offsetHeight;
          that.transformY = that.$refs[ 'item-active' ].offsetHeight

          // console.log(that.initTop);
          // console.log(that.transformY);
          //每次选框显示时 控制元素位置
          if ( setCheck ) {
            that.currentSweep = that.initTop;
            that.setTranslate(that.$refs[ scrolllElm ], that.initTop)
            that.$set(that[ `${scrolllElm}s` ][ 0 ], 'isCheck', true)
            that.setActiveData(scrolllElm, 0)
          } else {
            that[ `${scrolllElm}s` ].forEach(( data, index ) => {
              if ( data.isCheck ) {
                that.currentSweep = that.initTop - (index * that.transformY);
                that.setTranslate(that.$refs[ scrolllElm ], that.initTop - (index * that.transformY))
                that.setActiveData(scrolllElm, index)
              }
            })
          }
        }, 0)
      },
      setTranslate ( el, xs ) {
        try {
          el.style = `transform:translate3d(0,${xs}px,0);transition:transform 300ms linear;`
        } catch ( e ) {
          // throw 'EL IS NOT'
        }
      },
      //数据操作回调
      setValueData ( org ) {
        console.info('执行获取数据',org)
				// console.log(this.provinces)
        try{
          this.provinces.forEach(( item, index ) => {
            if ( item.id == org.provinceId ) {
              item.isCheck = true;
              this.init('province', false)
              return
            }
          })
				}catch ( e ) {}
      },
			//onchange
      setActiveData ( isArray, i ) {
        let index = Number(i);
        // console.log(isArray,i);
        let that = this;
        let obj;

        switch ( isArray ) {
          case 'province':
            this.$set(that.activeData, 0, that.provinces[ index ])
            obj = {
              id : that.provinces[ index ] ? that.provinces[ index ].id : '',
              rag : that.activeData,
              tag : 'province'
            }
            this.$emit('change', obj)
            ;
            break
          case 'city':
            this.$set(that.activeData, 1, that.city[ index ])
            if ( that.city[ index ] ) {
              obj = {
                id : that.city[ index ] ? that.city[ index ].id : '',
                rag : that.activeData,
                tag : 'city'
              }
              this.$emit('change', obj)
            }
            ;
            break
          case 'county':
            this.$set(that.activeData, 2, that.county[ index ])
            if ( that.county[ index ] ) {
              obj = {
                id : that.county[ index ] ? that.county[ index ].id : '',
                rag : that.activeData,
                tag : 'county'
              }
              this.$emit('change', obj)
            }
            ;
            break
          case 'street':
            this.$set(that.activeData, 3, that.street[ index ])
            if ( that.street[ index ] ) {
              obj = {
                id : that.street[ index ] ? that.street[ index ].id : '',
                rag : that.activeData,
                tag : 'street'
              }
              this.$emit('change', obj)
            }
            ;
            break
        }
        // 300ms 返回一次数据
      },
			//touch
      handleItemStart ( e, r ) {
        this.updown = false;
        this.currentItem = document.querySelector(`.${r}`).getAttribute('parent')
        this.startY = e.touches[ 0 ].clientY
      },
      handleItemMove ( e, r ) { // this.transformY 为 cell 元素高度
        let parent = document.querySelector(`.${r}`)
        if ( this.moveY - this.startY > 0 || this.moveY - this.startY < 0 ) { //判断是否移动
          this.updown = true
        }
        this.moveY = e.touches[ 0 ].clientY
        this.isZF = this.moveY - this.startY > 0 ? true : false
        this.sweep = Math.round((this.moveY - this.startY) / this.transformY)

        this.setTranslate(parent, this.currentSweep + (this.sweep * this.transformY))
      },
      handleItemEnd ( e, r, city, counts, stree ) {
        let parent = document.querySelector(`.${r}`) //滚动元素
        let isZ = this.currentSweep < 0 ? -this.currentSweep : this.currentSweep; //取正直
        if ( this.updown ) {
          //判断是否是最后一个元素位
          let indexLen = this[ r ].length - 1;

          // 禁止超出元素滚动位置
          // 滑动元素位
          this.currentSweep = this.currentSweep + (this.sweep * this.transformY ) //正确的位置值

          if ( this.currentSweep > this.initTop && this.isZF ) { //下滑到阈值
            this.currentSweep = this.initTop
            this.setTranslate(parent, this.initTop)
            return
          }
          if (
            ((indexLen*this.transformY - this.initTop) - (Number(e.target.getAttribute('index'))) * this.transformY) < this.initTop && !this.isZF ||
						indexLen <= Math.round(isZ / this.transformY) + Math.round(this.initTop / this.transformY) && !this.isZF ) { //上滑到阈值
            this.currentSweep = -(indexLen * this.transformY - this.initTop)
            this.setTranslate(parent, -(indexLen * this.transformY - this.initTop))
            return
          }
        }
      },
      handleClick(e, r, city, counts, stree){
        // console.log('click', e.target)
        let parent = document.querySelector(`.${r}`) //滚动元素
        this[ `${r}s` ].map(data => {
          this.$set(data, 'isCheck', false)
        })
        this[ `${city}s` ].map(data => {
          this.$set(data, 'isCheck', false)
        })
        this[ `${counts}s` ].map(data => {
          this.$set(data, 'isCheck', false)
        })
        this[ `${stree}s` ].map(data => {
          this.$set(data, 'isCheck', false)
        })
        //选中
        this.currentSweep = this.initTop - (Number(e.target.getAttribute('index')) * this.transformY)
        this.setTranslate(parent, this.initTop - (Number(e.target.getAttribute('index')) * this.transformY));
        this.$set(this[ `${r}s` ][ e.target.getAttribute('index') ], 'isCheck', true)
        this.setActiveData(this.currentItem, Number(e.target.getAttribute('index'))) //调用回调返回数据
			},
    },
    mounted () {},
    created () {
      let that = this;
      this.$nextTick(()=>{
        try {
          if ( window.__wxjs_is_wkwebview === true ) {
            //function ...  WKWebview ios
            that.isAndroid = false;
          } else if ( window.__wxjs_is_wkwebview === false || window.__wxjs_is_wkwebview === undefined ) {
            //function ...  UIWebview
            that.isAndroid = true;
          }
        } catch ( e ) {
        }
        // console.log(this.isAndroid)
      })
		},
    filters : {},
    directives : {},
    beforeDestroy () {
    },
    destroyed () {
    }
  }
</script>