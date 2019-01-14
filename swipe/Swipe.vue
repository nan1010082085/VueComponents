<template>
	<div class="swipe">
		<div class="swipe-scroll" :class="className"
				 @touchstart.prevent="handlestart"
				 @touchmove.prevent="handlemove"
				 @touchend.prevent="handleend">
			<slot/>
		</div>
	</div>
</template>
<style scoped lang="less">
	.swipe {
		display: block;
	}
	.swipe-scroll {
		display: -webkit-flex;
		display: flex;
		transition: transform .3s linear;
	}
</style>
<script>

  export default {
    name : "swipeloop",
    data () {
      return {
        surp:10, //多的值
        childrenWidth : 0,
				click:false,
        sweep : -665,
        scrollWidth : 0,
        swipeItemActive : 1,

        loops : true, //自动轮播
        dec : 3000, //定时
        INTER:'', //控制器
        startInvter:'', //控制器
        start : 0,
        move : 0,

        sweepMove:0, //移动的长度
      }
    },
    props : {
      className:String,
      loop:{
        type:Boolean,
				default:true
			},
      dection:{
        type:Number,
				default: 3000
			},
      swiperIndex:Number,
		},
    computed : {},
    watch : {
      swipeItemActive(val){
        this.$emit('change', val)
			},
		},
    methods : {
      init ( scroll ) {
        let st = scroll.children.length;
        let that = this;
        if ( this.loops ) {
          this.INTER = setInterval(() => {
            that.swipeItemActive++;
            that.sweep = -(that.childrenWidth * that.swipeItemActive) + this.surp
            scroll.style =`transform:translateX(${that.sweep}px);width:${that.scrollWidth}`
            if ( st == that.swipeItemActive ) {
              that.swipeItemActive = 0
              that.sweep = this.surp
              scroll.style =`transform:translateX(${that.sweep}px);width:${that.scrollWidth}`
            }
          }, that.dec)
        }
      },

      handlestart ( ev ) {
        //控制器清除
        this.loops = false;
				clearInterval(this.INTER);
				clearTimeout(this.startInvter);

        this.start =  ev.touches[0].clientX;
        this.click = false;
      },
      handlemove ( ev ) {
        this.click = true;
        let scroll = document.querySelector(`.${this.className}`)
        this.move = ev.touches[0].clientX - this.start
        scroll.style =`transform:translateX(${this.sweep + this.move}px);width:${this.scrollWidth}`
      },
      handleend ( ev ) {
				if(!this.click){
				  this.handleClick()
				  return
				}

        let scroll = document.querySelector(`.${this.className}`)
        //手指离开 自动移动位置
        this.swipeItemActive = -Math.round((this.sweep + this.move) / (this.childrenWidth - this.surp))
				if(this.swipeItemActive < 0 ){
          this.swipeItemActive = 0;
				}else if(this.swipeItemActive > scroll.children.length -1) {
          this.swipeItemActive = scroll.children.length -1;
				}
        this.sweep = -(this.childrenWidth * this.swipeItemActive - this.surp)
        scroll.style =`transform:translateX(${this.sweep}px);width:${this.scrollWidth}px`
				//手子离开 500ms后 自动滚动
				this.startInvter = setTimeout(()=>{
				  if(this.loop){ //条件 loop ： true
            this.loops = true
					}
				  this.init(scroll)
				},500)
      },
      handleClick(){
        console.log('click')
        this.$emit('click')
			},
    },
    mounted () {
      this.$nextTick(()=>{
        let that = this;
        let inter = setInterval(()=>{
          if(that.$slots.default){
            clearInterval(inter)
            this.childrenWidth = this.$slots.default[ 0 ].elm.children[ 0 ].offsetWidth;
            this.sweep = -(this.childrenWidth * this.swipeItemActive - this.surp)
            let scroll = document.querySelector(`.${this.className}`)
            this.scrollWidth = scroll.children.length * this.childrenWidth;
            scroll.style =`transform:translateX(${this.sweep}px);width:${this.scrollWidth}px`
            //设置 index
            for ( let i = 0 ; i < scroll.children.length ; i++ ) {
              const child = scroll.children[ i ];
              child.setAttribute('data-index', i);
            }
            this.init(scroll);
					}
				})
			})
    },
    created () {
      this.surp = 15 * ( window.innerWidth / 750)
      if(!this.className){
        throw new Error('className is not elm')
			}
      this.dec = this.dection;
      this.loops = this.loop;
      this.swipeItemActive = this.swiperIndex;
    }
  }
</script>