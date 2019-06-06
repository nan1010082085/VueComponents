export default {
  data(){
    return{
      citys_initTop:0, //初始化移动距离
      citys_transformY:0,
      citys_startY:0,
      citys_moveY:0,
      citys_isZF:false, //判断 上下滑动方向
      citys_currentItem: '', //当前滚动是那个 item
      citys_currentSweep:0,  //移动起始距离
      citys_sweep:0,  //计算一次移动是几个元素位
      citys_currentTop:0,
      citys_currentIndex:0,
      citys_updown:false,
    }
  },
  methods:{
    initCity(scrolllElm,setCheck){
      let that = this;
      // setTimeout(()=>{
        // console.log(that.$refs[ 'item-active' ].offsetTop);
        that.citys_initTop = that.$refs[ 'item-active' ].offsetTop - that.$refs['header'].offsetHeight;
        that.citys_transformY = Math.round(that.$refs[ 'item-active' ].offsetHeight) - 2
  
        if(setCheck){
          that.citys_currentSweep = that.citys_initTop;
          that.setTranslate(that.$refs[scrolllElm],that.citys_initTop)
          try {
            if(that[`${scrolllElm}s`].length > 0){
              that[`${scrolllElm}s`][0].isCheck = true
            }
          }catch ( e ) {}
          that.setActiveData(scrolllElm, 0)
        }else {
          that[`${scrolllElm}s`].forEach((data,index)=>{
            if(data.isCheck){
              that.citys_currentSweep = that.citys_initTop;
              that.setTranslate(that.$refs[scrolllElm],that.citys_initTop)
              
              that.citys_currentSweep = that.citys_initTop - (index * that.citys_transformY);
              
              that.setTranslate(that.$refs[scrolllElm], that.citys_initTop - (index * that.citys_transformY))
              that.setActiveData(scrolllElm, index)
            }
          })
        }
      // },0)
    },
    handleItemStartCity(e,r){
      this.citys_currentItem = document.querySelector(`.${r}`).getAttribute('parent')
      this.citys_startY = e.touches[0].clientY
      this.citys_updown = false
    },
    handleItemMoveCity(e,r){ // this.citys_transformY 为 cell 元素高度
      let parent = document.querySelector(`.${r}`)
      this.citys_moveY = e.touches[0].clientY
      this.citys_isZF = this.citys_moveY - this.citys_startY > 0 ? true : false
      if(this.citys_moveY - this.citys_startY > 0 || this.citys_moveY - this.citys_startY < 0){ //判断是否移动
        this.citys_updown = true
      }
      this.citys_sweep = Math.round((this.citys_moveY - this.citys_startY) / this.citys_transformY)
      this.setTranslate(parent, this.citys_currentSweep + (this.citys_sweep * this.citys_transformY))
    },
    handleItemEndCity(e,r,counts,stree){
      let parent = document.querySelector(`.${r}`) //滚动元素
      //禁止超出元素滚动位置
      let isZ = this.citys_currentSweep < 0 ? -this.citys_currentSweep : this.citys_currentSweep; //取正直
      if(this.citys_updown){
        //判断是否是最后一个元素位
        let indexLen = this[r].length - 1;
        //滑动元素位
        this.citys_currentSweep = this.citys_currentSweep + (this.citys_sweep * this.citys_transformY) //正确的位置值
        if(this.citys_currentSweep > this.citys_initTop  && this.citys_isZF){ //下滑
          this.citys_currentSweep = this.citys_initTop
          this.setTranslate(parent, this.citys_initTop)
          return
        }
        if( ((indexLen*this.citys_transformY - this.citys_initTop) - (Number(e.target.getAttribute('index')))* this.citys_transformY) < this.citys_initTop && !this.citys_isZF ||
          indexLen <= Math.round(isZ / this.citys_transformY) + Math.round(this.citys_initTop / this.citys_transformY) && !this.citys_isZF ){ //上滑
          this.citys_currentSweep = -(indexLen * this.citys_transformY - this.citys_initTop)
          this.setTranslate(parent, -(indexLen * this.citys_transformY - this.citys_initTop))
          return
        }
      }
    },
    handleClickCitys(e,r,counts,stree){
      let parent = document.querySelector(`.${r}`) //滚动元素
      //清空
      this[`${r}s`].map(data=>{
        this.$set(data,'isCheck', false)
      })
      this[`${counts}s`].map(data=>{
        this.$set(data,'isCheck', false)
      })
      this[`${stree}s`].map(data=>{
        this.$set(data,'isCheck', false)
      })
      //选中
      this.citys_currentSweep = this.citys_initTop - (Number(e.target.getAttribute('index'))*this.citys_transformY)
      this.setTranslate(parent, this.citys_initTop - (Number(e.target.getAttribute('index'))*this.citys_transformY))
      this.$set(this[`${r}s`][e.target.getAttribute('index')],'isCheck', true)
      this.setActiveData(this.citys_currentItem, Number(e.target.getAttribute('index'))) //调用回调返回数据
    },
  }
}