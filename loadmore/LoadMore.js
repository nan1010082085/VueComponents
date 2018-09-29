export default {
  data () {
    return {
      page : 1,
      pageSize : 20,
      pageTotal : 20,
      
      allLoaded : true,
      topMore : false,
      bottomStatus : '',
      topStatus : ''
    }
  },
  methods : {
    loadTop () {
      if ( this.topMore ) {
        this.getData()
        setTimeout(_ => {
          this.$nextTick(_=>{
            this.topMore = false
            this.$refs.loadmore.onTopLoaded();
          })
        }, 2000)
      }
    },
    loadBottom () {
      this.allLoaded = true
      let _index = ++this.page
      this.pageSize = _index * 20;
      if(this.pageTotal >= _index * 10){
        this.getData()
      }
      setTimeout(_ => {
        this.$nextTick(_=>{
          this.$refs.loadmore.onBottomLoaded();
          this.allLoaded = false
        })
      }, 2000)
    },
    handleTopChange ( status ) {
      this.topStatus = status;
    },
    handleBottomChange ( status ) {
      this.bottomStatus = status;
    },
    scrollLoading ( event ) {
      let scrollTop = event.target.scrollTop;
      let downBottom = event.target.scrollHeight - event.target.offsetHeight;
      if ( scrollTop <= 0 ) {
        // console.log('滚动到顶部')
        this.topMore = true;
      } else {
        this.topMore = false;
      }
      if ( downBottom + 10 >= event.target.scrollTop ) {
        // console.log('滚动到底部')
        this.allLoaded = false;
      } else {
        this.allLoaded = true;
      }
    }
  },
  mounted () {
    this.$nextTick(_ => {
      if ( this.$refs.moreScroll != undefined ) {
        this.$refs.moreScroll.addEventListener('scroll', this.scrollLoading)
      }
    })
  }
}
