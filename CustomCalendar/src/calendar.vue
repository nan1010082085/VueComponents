<template>
	<section class="y-calendar">
		<!--日历头部-->
		<aside class="y-calendar-head">
			<div class="y-calendar-item left"
					 :class="{'y-disable': currentMonth <= 1}"
					 @click="handleLeftClick">
				<span v-if="!$slots.headLeft">←</span>
				<slot name="headLeft"></slot>
			</div>
			<div class="y-calendar-item">
				{{month}}月份
			</div>
			<div class="y-calendar-item right"
					 :class="{'y-disable': currentMonth >= 12}"
					 @click="handleRightClick">
				<span v-if="!$slots.headRight">→</span>
				<slot name="headRight"></slot>
			</div>
		</aside>
		<div class="striping" v-if="striping"></div>
		<!--日历数据-->
		<section class="y-calendar-content">
			<div class="y-calendar-content-head">
				<div class="y-head-item" v-for="(item,index) in weekDate" :key="index">{{item}}</div>
			</div>

			<div class="y-calendar-content-list">
				<div class="y-list-item"
						 v-for="(item,index) in currentDay" :key="index"
						 @click="handleChangeItem(item)">
					<p class="y-day"
						 v-if="!circle"
						 :class="[cDay == item ? 'y-day--active' :'']"
						 :style="circle ? '' :setDayStyle(item)"
					>
						<span>{{item}}</span>
					</p>
					<p class="y-day"
						 :class="[cDay == item ? 'y-day--active' :'']"
						 :style="cDay == item ? `border:1px solid ${borderColor};`:''"
						 v-else>
						<span>{{item}}</span>
						<i v-if="showCircle(item)" :style="`background:${backgroundColor};`"></i>
					</p>
				</div>
			</div>
			<div class="y-remark">
				<p>{{setRemark}}</p>
			</div>
		</section>
	</section>
</template>
<style scoped lang="less">
	@import "./calendar";
</style>
<script>
  import { uppercase } from './uilt'

  export default {
    components : {},
    mixins : [],
    name : "Calendar",
    data () {
      return {
        year : 1,
        currentMonth : 1, //当前月


        month : '', //月份
        weekDate : [ '日', '一', '二', '三', '四', '五', '六' ],
        cDay : 1,
        cDayStyle : [],  //选中样式
        currentDay : [], //当前月天数
        currentRemark : 0
      }
    },
    props : {
      //选中是否采用圆点模式
      circle : Boolean,
      //是否显示横线
      striping : {
        type : Boolean,
        default : true
      },
      //样式
      borderColor : {
        type : String,
        default : '#37b48d'
      },
      backgroundColor : {
        type : String,
        default : '#37b48d'
      },
      dayActive : {
        type : Array,
        default : () => []
      }
    },
    computed : {
      setRemark () {
        if ( this.cDayStyle.length > 0 ) {
          for ( let i = 0 ; i < this.cDayStyle.length ; i++ ) {
            const cDayStyleElement = this.cDayStyle[ i ];
            if ( cDayStyleElement.active == this.currentRemark ) {
              return cDayStyleElement.remark ? cDayStyleElement.remark : ''
            }
          }
        }
      }
    },
    watch : {
      dayActive : {
        handler ( day ) {
          if ( day.length > 0 && Array.isArray(day) ) {
            this.cDayStyle = day
          } else {
            this.cDayStyle = []
          }
        },
        deep : true,
        immediate : true
      }
    },
    methods : {
      initData ( month ) {
        this.month = uppercase(month);
        this.monthDay(month)
      },
      //当前月天数， 当前月第一天是星期几
      monthDay ( month ) {
				this.year = new Date().getFullYear();
        let months = month.toString().length == 1 ? '0' + (month) : month
				console.log(months)
				let dayList = new Date(this.year, months, 0).getDate();
        this.currentDay = [];
        for ( let i = 0 ; i < dayList ; i++ ) {
          this.currentDay.push(i + 1)
        }
        //当前是几号
        if ( new Date().getMonth() + 1 == month ) {
          this.cDay = new Date().getDate();
          this.currentRemark = this.cDay
        } else {
          this.cDay = 0
        }
        //计算上月最后一天是星期几
        this.$nextTick(() => {
          let day = new Date(this.year, month - 1).getDay();
          // console.log(day);
          let itemEl = document.getElementsByClassName('y-list-item')[ 0 ]
          itemEl.style = `margin-left:${day * 14.28 + '%'};`
        })
        let eMsg = { year : this.year, month : this.currentMonth }
        this.$emit('change', eMsg)
      },
      //点击前一月
      handleLeftClick () {
        if ( this.currentMonth <= 1 ) {
          return
        }

        this.currentMonth--;
        this.initData(this.currentMonth);
        let eMsg = { year : this.year, month : this.currentMonth }
        this.$emit('change', eMsg)
      },
      //点击后一月
      handleRightClick () {
        if ( this.currentMonth >= 12 ) {
          return
        }

        this.currentMonth++;
        this.initData(this.currentMonth);
        let eMsg = { year : this.year, month : this.currentMonth }
        this.$emit('change', eMsg)
      },

      //样式
      setDayStyle ( item ) {
        for ( let i = 0 ; i < this.cDayStyle.length ; i++ ) {
          const cDayStyleElement = this.cDayStyle[ i ];
          if ( cDayStyleElement.active == item ) {
            return `
							color: #ffffff;
							box-sizing: border-box;
							border-radius: 50%;
							border: 1px solid ${this.borderColor}!important;
							background: ${this.backgroundColor};
							transition: all .3s ease-in-out;
						`
          }
        }
      },
      //圆点显示
      showCircle ( item ) {
        for ( let i = 0 ; i < this.cDayStyle.length ; i++ ) {
          const cDayStyleElement = this.cDayStyle[ i ];
          if ( cDayStyleElement.active == item ) {
            return true
          }
        }
      },
      //点击日历
      handleChangeItem ( item ) {
        this.currentRemark = item
      }
    },
    mounted () {
    },
    created () {
      this.currentMonth = new Date().getMonth() + 1;
      this.initData(this.currentMonth);
      // console.log(this.$slots)
    },
    filters : {},
    directives : {},
    beforeDestroy () {
    },
    destroyed () {
    }
  }
</script>