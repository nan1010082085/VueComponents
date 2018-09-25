export default {
  data () {
    return {
      allLoaded : true,
      topMore : false,
      bottomStatus : '',
      topStatus : ''
    }
  },
  methods : {
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
