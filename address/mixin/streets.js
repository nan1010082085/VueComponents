export default {
  data(){
    return{
      streets_initTop:0, //初始化移动距离
      streets_transformY:0,
      streets_startY:0,
      streets_moveY:0,
      streets_isZF:false, //判断 上下滑动方向
      streets_currentItem: '', //当前滚动是那个 item
      streets_currentSweep:0,  //移动起始距离
      streets_sweep:0,  //计算一次移动是几个元素位
      streets_currentTop:0,
  
      streets_currentIndex:0,
      streets_updown:false
    }
  },
  methods:{
    initStreet(scrolllElm,setCheck){
      
      let that = this;
      setTimeout(()=>{
        // console.log(that.$refs[ 'item-active' ].offsetTop);
        that.streets_initTop = that.$refs[ 'item-active' ].offsetTop - that.$refs['header'].offsetHeight;
        that.streets_transformY = Math.round(that.$refs[ 'item-active' ].offsetHeight)
        
        if(setCheck){
          that.streets_currentSweep = that.streets_initTop;
          that.setTranslate(that.$refs[scrolllElm],that.streets_initTop)
          try {
            if(that[`${scrolllElm}s`].length > 0){
              that[`${scrolllElm}s`][0].isCheck = true
            }
          }catch ( e ) {}
          that.setActiveData(scrolllElm, 0)
        }else {
          that[`${scrolllElm}s`].forEach((data,index)=>{
            if(data.isCheck){
              that.streets_currentSweep = that.streets_initTop;
              that.setTranslate(that.$refs[scrolllElm],that.streets_initTop)
        
              that.streets_currentSweep = that.streets_initTop - (index * that.streets_transformY);
              that.setTranslate(that.$refs[scrolllElm], that.streets_initTop - (index * that.streets_transformY))
              that.setActiveData(scrolllElm, index)
            }
          })
        }
      },0)
    },
    handleItemStartStreet(e,r){
      this.streets_currentItem = document.querySelector(`.${r}`).getAttribute('parent')
      this.streets_startY = e.touches[0].clientY
      this.streets_updown = false
    },
    handleItemMoveStreet(e,r){ // this.streets_transformY 为 cell 元素高度
      let parent = document.querySelector(`.${r}`)
      this.streets_moveY = e.touches[0].clientY
      if(this.streets_moveY - this.streets_startY > 0 || this.streets_moveY - this.streets_startY < 0){ //判断是否移动
        this.streets_updown = true
      }
      this.streets_isZF = this.streets_moveY - this.streets_startY > 0 ? true : false
      this.streets_sweep = Math.round((this.streets_moveY - this.streets_startY) / this.streets_transformY)
      this.setTranslate(parent, this.streets_currentSweep + (this.streets_sweep * this.streets_transformY + this.streets_sweep + 1))
    },
    handleItemEndStreet(e,r){
      let parent = document.querySelector(`.${r}`) //滚动元素
      //禁止超出元素滚动位置
      let isZ = this.streets_currentSweep < 0 ? -this.streets_currentSweep : this.streets_currentSweep;//取正直
      if(this.streets_updown){
        //判断是否是最后一个元素位
        let indexLen = this[r].length - 1;
        //滑动元素位
        this.streets_currentSweep = this.streets_currentSweep + (this.streets_sweep * this.streets_transformY +  this.streets_sweep + 1) //正确的位置值
        if(this.streets_currentSweep > this.streets_initTop  && this.streets_isZF){ //下滑
          this.streets_currentSweep = this.streets_initTop
          this.setTranslate(parent, this.streets_initTop)
          return
        }
        if( ((indexLen*this.streets_transformY - this.streets_initTop) - (Number(e.target.getAttribute('index')))* this.streets_transformY) < this.streets_initTop && !this.streets_isZF ||
          indexLen <= Math.round(isZ / this.streets_transformY) + Math.round(this.streets_initTop / this.streets_transformY) && !this.streets_isZF ){ //上滑
          this.streets_currentSweep = -(indexLen * this.streets_transformY - this.streets_initTop)
          this.setTranslate(parent, -(indexLen * this.streets_transformY - this.streets_initTop))
          return
        }
      }
    },
    handleClickStreet(e,r){
      let parent = document.querySelector(`.${r}`) //滚动元素
      //清空
      this[`${r}s`].map(data=>{
        this.$set(data,'isCheck', false)
      })
      //选中
      this.streets_currentSweep = this.streets_initTop - (Number(e.target.getAttribute('index'))*this.streets_transformY)
      this.setTranslate(parent, this.streets_initTop - (Number(e.target.getAttribute('index'))*this.streets_transformY) - (Number(e.target.getAttribute('index') - 1 )))
      this.$set(this[`${r}s`][e.target.getAttribute('index')],'isCheck', true)
      this.setActiveData(this.streets_currentItem, Number(e.target.getAttribute('index'))) //调用回调返回数据
    },
  }
}