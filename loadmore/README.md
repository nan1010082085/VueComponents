# loadmore
#####参考 mint-ui 样式参考 weui.css
* template
```
<div ref="moreScroll" class="asset-list_body h94vh">
      <LoadMore
        :top-method="topMore ? loadTop : undefined"
        @top-status-change="handleTopChange"
        :bottom-method="loadBottom"
        @bottom-status-change="handleBottomChange"
        :bottom-all-loaded="allLoaded"
        ref="loadmore"
        :auto-fill="false">
        <!-- 需要刷新的数据 <div></div> -->
      </LoadMore>
    </div>
```

* 附 使用js .vue 引入loadmore.js mixins注入当前组件中
```
  import LoadMore from '../../components/Loadmore'
  import loadmore    from '../../mixins/loadmore'
  export default {
    mixins : [ loadmore ],
    components : { LoadMore },
  }
```

* 使用
```
   methods:{
      //load top bottom  写在对应组件中控制数据获取
      // loadTop () {
      //   if ( this.topMore ) {
      //     this.getAllTableData()
      //     setTimeout(_ => {
      //       this.$nextTick(_=>{
      //         this.topMore = false
      //         this.$refs.loadmore.onTopLoaded();
      //       })
      //     }, 2000)
      //   }
      // },
      loadBottom () {
        this.allLoaded = true
        let _index = ++this.pIndex
        let _size = _index * 10;
        if(this.dataTotal >= _index * 10){
          this.getAllTableData(1,_size)
        }
        setTimeout(_ => {
          this.$nextTick(_=>{
            this.$refs.loadmore.onBottomLoaded();
            this.allLoaded = false
          })
        }, 2000)
      },
   }
```