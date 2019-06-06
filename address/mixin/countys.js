export default {
  data(){
    return{
      countys_initTop:0, //初始化移动距离
      countys_transformY:0,
      countys_startY:0,
      countys_moveY:0,
      countys_isZF:false, //判断 上下滑动方向
      countys_currentItem: '', //当前滚动是那个 item
      countys_currentSweep:0,  //移动起始距离
      countys_sweep:0,  //计算一次移动是几个元素位
      countys_currentTop:0,
      countys_currentIndex:0,
      countys_updown:false
    }
  },
  methods:{
    initCounty(scrolllElm,setCheck){
      let that = this;
      // setTimeout(()=>{
        that.countys_initTop = that.$refs[ 'item-active' ].offsetTop - that.$refs['header'].offsetHeight;
        that.countys_transformY = Math.round(that.$refs[ 'item-active' ].offsetHeight) - 2
        if(setCheck){
          that.countys_currentSweep = that.countys_initTop;
          that.setTranslate(that.$refs[scrolllElm],that.countys_initTop)
          try { //是否有数据
            if(that[`${scrolllElm}s`].length > 0){
              that[`${scrolllElm}s`][0].isCheck = true
            }
          }catch ( e ) {}
          that.setActiveData(scrolllElm, 0)
        }else {
          that[`${scrolllElm}s`].forEach((data,index)=>{
            if(data.isCheck){
              that.countys_currentSweep = that.countys_initTop;
              that.setTranslate(that.$refs[scrolllElm],that.countys_initTop)
        
              that.countys_currentSweep = that.countys_initTop - (index * that.countys_transformY);
              that.setTranslate(that.$refs[scrolllElm], that.countys_initTop - (index * that.countys_transformY))
              that.setActiveData(scrolllElm, index)
            }
          })
        }
      // },0)
    },
    handleItemStartCounty(e,r){
      this.countys_currentItem = document.querySelector(`.${r}`).getAttribute('parent')
      this.countys_startY = e.touches[0].clientY
      this.countys_updown = false
    },
    handleItemMoveCounty(e,r){ // this.countys_transformY 为 cell 元素高度
      let parent = document.querySelector(`.${r}`)
      this.countys_moveY = e.touches[0].clientY
      if(this.countys_moveY - this.countys_startY > 0 || this.countys_moveY - this.countys_startY < 0){ //判断是否移动
        this.countys_updown = true
      }
      this.countys_isZF = this.countys_moveY - this.countys_startY > 0 ? true : false
      this.countys_sweep = Math.round((this.countys_moveY - this.countys_startY) / this.countys_transformY)
      this.setTranslate(parent, this.countys_currentSweep + (this.countys_sweep * this.countys_transformY))
    },
    handleItemEndCounty(e,r,stree){
      let parent = document.querySelector(`.${r}`) //滚动元素
      //禁止超出元素滚动位置
      let isZ = this.countys_currentSweep < 0 ? -this.countys_currentSweep : this.countys_currentSweep; //取正直
      if(this.countys_updown) {
        //判断是否是最后一个元素位
        let indexLen = this[ r ].length - 1;
        //滑动元素位
        this.countys_currentSweep = this.countys_currentSweep + (this.countys_sweep * this.countys_transformY) //正确的位置值
        if ( this.countys_currentSweep > this.countys_initTop && this.countys_isZF ) { //下滑
          this.countys_currentSweep = this.countys_initTop
          this.setTranslate(parent, this.countys_initTop)
          return
        }
        if ( ((indexLen*this.countys_transformY - this.countys_initTop) - (Number(e.target.getAttribute('index')))* this.countys_transformY) < this.countys_initTop && !this.countys_isZF ||
          indexLen <= Math.round(isZ / this.countys_transformY) + Math.round(this.countys_initTop / this.countys_transformY) && !this.countys_isZF ) { //上滑
          this.countys_currentSweep = -(indexLen * this.countys_transformY - this.countys_initTop)
          this.setTranslate(parent, -(indexLen * this.countys_transformY - this.countys_initTop))
          return
        }
      }
    },
    handleClickCounty(e,r,stree){
      let parent = document.querySelector(`.${r}`) //滚动元素
      //清空
      this[`${r}s`].map(data=>{
        this.$set(data,'isCheck', false)
      })
      this[`${stree}s`].map(data=>{
        this.$set(data,'isCheck', false)
      })
      //选中
      this.countys_currentSweep = this.countys_initTop - (Number(e.target.getAttribute('index'))*this.countys_transformY)
      this.setTranslate(parent, this.countys_initTop - (Number(e.target.getAttribute('index'))*this.countys_transformY))
      this.$set(this[`${r}s`][e.target.getAttribute('index')],'isCheck', true)
      this.setActiveData(this.countys_currentItem, Number(e.target.getAttribute('index'))) //调用回调返回数据
    },
  }
}