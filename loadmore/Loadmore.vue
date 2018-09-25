<template>
  <div class="loadmore">
    <div  class="loadmore-content"  :class="{ 'is-dropped': topDropped || bottomDropped}" :style="{ 'transform': transform }">
      <slot name="top">
        <div class="loadmore-top" v-if="topMethod">
          <div class="weui-loadmore">
            <i class="weui-loading" v-if="topStatus === 'loading'"></i>
            <span class="weui-loadmore__tips">{{ topText }}</span>
          </div>
        </div>
      </slot>
      <slot></slot>
      <slot name="bottom">
        <div class="loadmore-bottom" v-if="bottomMethod">
          <div class="weui-loadmore weui-loadmore-bottom">
            <i class="weui-loading" v-if="bottomStatus === 'loading'"></i>
            <span class="weui-loadmore__tips">{{ bottomText }}</span>
          </div>
        </div>
      </slot>
    </div>
  </div>
</template>

<script>
  /*
  实列：
   <LoadMore
   :top-method="topMore ? loadTop : undefined"
   @top-status-change="handleTopChange"
   :bottom-method="loadBottom"
   @bottom-status-change="handleBottomChange"
   :bottom-all-loaded="allLoaded"
   ref="loadmore"
   :auto-fill="false">
     <slot></slot>
   </LoadMore>
  * */

  /*
   autoFill	若为真，loadmore 会自动检测并撑满其容器	Boolean		true
   distanceIndex	手指移动与组件移动距离的比值	Number		2
   maxDistance	组件可移动的最大距离（像素），若为 0 则不限制	Number		0
   topPullText	topStatus 为 pull 时加载提示区域的文字	String		'下拉刷新'
   topDropText	topStatus 为 drop 时加载提示区域的文字	String		'释放更新'
   topLoadingText	topStatus 为 loading 时加载提示区域的文字	String		'加载中...'
   topDistance	触发 topMethod 的下拉距离阈值（像素）	Number		70
   topMethod	下拉刷新执行的方法	Function
   bottomPullText	bottomStatus 为 pull 时加载提示区域的文字	String		'上拉刷新'
   bottomDropText	bottomStatus 为 drop 时加载提示区域的文字	String		'释放更新'
   bottomLoadingText	bottomStatus 为 loading 时加载提示区域的文字	String		'加载中...'
   bottomDistance	触发 bottomMethod 的上拉距离阈值（像素）	Number		70
   bottomMethod	上拉刷新执行的方法	Function
   bottomAllLoaded	若为真，则 bottomMethod 不会被再次触发	Boolean		false

   top-status-change	组件顶部状态发生变化时的回调函数	组件顶部的新状态名
   bottom-status-change	组件底部状态发生变化时的回调函数	组件底部的新状态名

   top	自定义顶部加载提示区域 HTML 模板
   bottom	自定义底部加载提示区域 HTML 模板
  * */
  export default {
    props: {
      maxDistance: {
        type: Number,
        default: 0
      },
      autoFill: {
        type: Boolean,
        default: true
      },
      distanceIndex: {
        type: Number,
        default: 2
      },
      topPullText: {
        type: String,
        default: '下拉刷新'
      },
      topDropText: {
        type: String,
        default: '释放更新'
      },
      topLoadingText: {
        type: String,
        default: '更新中...'
      },
      topDistance: {
        type: Number,
        default: 70
      },
      topMethod: {
        type: Function
      },
      bottomPullText: {
        type: String,
        default: '上拉加载'
      },
      bottomDropText: {
        type: String,
        default: '释放加载'
      },
      bottomLoadingText: {
        type: String,
        default: '加载中...'
      },
      bottomDistance: {
        type: Number,
        default: 70
      },
      bottomMethod: {
        type: Function
      },
      bottomAllLoaded: {
        type: Boolean,
        default: false
      }
    },
    data () {
      return {
        //数据源
        translate: 0,
        scrollEventTarget: null,
        containerFilled: false,
        topText: '',
        topDropped: false,
        bottomText: '',
        bottomDropped: false,
        bottomReached: false,
        direction: '',
        startY: 0,
        startScrollTop: 0,
        currentY: 0,
        topStatus: '',
        bottomStatus: ''
      }
    },
    computed : {
      //计算属性
      transform() {
        return this.translate === 0 ? null : 'translate3d(0, ' + this.translate + 'px, 0)';
      }
    },
    watch : {
      //监听事件  computed and data
      topStatus(val) {
        this.$emit('top-status-change', val);
        switch (val) {
          case 'pull':
            this.topText = this.topPullText;
            break;
          case 'drop':
            this.topText = this.topDropText;
            break;
          case 'loading':
            this.topText = this.topLoadingText;
            break;
        }
      },
      bottomStatus(val) {
        this.$emit('bottom-status-change', val);
        switch (val) {
          case 'pull':
            this.bottomText = this.bottomPullText;
            break;
          case 'drop':
            this.bottomText = this.bottomDropText;
            break;
          case 'loading':
            this.bottomText = this.bottomLoadingText;
            break;
        }
      }
    },
    methods : {
      //方法
      onTopLoaded() {
        this.translate = 0;
        setTimeout(() => {
          this.topStatus = 'pull';
        }, 200);
      },
      onBottomLoaded() {
        this.bottomStatus = 'pull';
        this.bottomDropped = false;
        this.$nextTick(() => {
          if (this.scrollEventTarget === window) {
            document.body.scrollTop += 50;
          } else {
            this.scrollEventTarget.scrollTop += 50;
          }
          this.translate = 0;
        });
        if (!this.bottomAllLoaded && !this.containerFilled) {
          this.fillContainer();
        }
      },
      getScrollEventTarget(element) {
        let currentNode = element;
        while (currentNode && currentNode.tagName !== 'HTML' &&
        currentNode.tagName !== 'BODY' && currentNode.nodeType === 1) {
          let overflowY = document.defaultView.getComputedStyle(currentNode).overflowY;
          if (overflowY === 'scroll' || overflowY === 'auto') {
            return currentNode;
          }
          currentNode = currentNode.parentNode;
        }
        return window;
      },
      getScrollTop(element) {
        if (element === window) {
          return Math.max(window.pageYOffset || 0, document.documentElement.scrollTop);
        } else {
          return element.scrollTop;
        }
      },
      bindTouchEvents() {
        this.$el.addEventListener('touchstart', this.handleTouchStart);
        this.$el.addEventListener('touchmove', this.handleTouchMove);
        this.$el.addEventListener('touchend', this.handleTouchEnd);
      },
      init() {
        this.topStatus = 'pull';
        this.bottomStatus = 'pull';
        this.topText = this.topPullText;
        this.scrollEventTarget = this.getScrollEventTarget(this.$el);
        if (typeof this.bottomMethod === 'function') {
          this.fillContainer();
          this.bindTouchEvents();
        }
        if (typeof this.topMethod === 'function') {
          this.bindTouchEvents();
        }
      },
      fillContainer() {
        if (this.autoFill) {
          this.$nextTick(() => {
            if (this.scrollEventTarget === window) {
              this.containerFilled = this.$el.getBoundingClientRect().bottom >=
                document.documentElement.getBoundingClientRect().bottom;
            } else {
              this.containerFilled = this.$el.getBoundingClientRect().bottom >=
                this.scrollEventTarget.getBoundingClientRect().bottom;
            }
            if (!this.containerFilled) {
              this.bottomStatus = 'loading';
              this.bottomMethod();
            }
          });
        }
      },
      checkBottomReached() {
        if (this.scrollEventTarget === window) {
          /**
           * fix:scrollTop===0
           */
          return document.documentElement.scrollTop || document.body.scrollTop + document.documentElement.clientHeight >= document.body.scrollHeight;
        } else {
          return parseInt(this.$el.getBoundingClientRect().bottom) <= parseInt(this.scrollEventTarget.getBoundingClientRect().bottom) + 1;
        }
      },
      handleTouchStart(event) {
        this.startY = event.touches[0].clientY;
        this.startScrollTop = this.getScrollTop(this.scrollEventTarget);
        this.bottomReached = false;
        if (this.topStatus !== 'loading') {
          this.topStatus = 'pull';
          this.topDropped = false;
        }
        if (this.bottomStatus !== 'loading') {
          this.bottomStatus = 'pull';
          this.bottomDropped = false;
        }
      },
      handleTouchMove(event) {
        if (this.startY < this.$el.getBoundingClientRect().top && this.startY > this.$el.getBoundingClientRect().bottom) {
          return;
        }
        this.currentY = event.touches[0].clientY;
        let distance = (this.currentY - this.startY) / this.distanceIndex;
        this.direction = distance > 0 ? 'down' : 'up';
        if (typeof this.topMethod === 'function' && this.direction === 'down' &&
          this.getScrollTop(this.scrollEventTarget) === 0 && this.topStatus !== 'loading') {
          event.preventDefault();
          event.stopPropagation();
          if (this.maxDistance > 0) {
            this.translate = distance <= this.maxDistance ? distance - this.startScrollTop : this.translate;
          } else {
            this.translate = distance - this.startScrollTop;
          }
          if (this.translate < 0) {
            this.translate = 0;
          }
          this.topStatus = this.translate >= this.topDistance ? 'drop' : 'pull';
        }
        if (this.direction === 'up') {
          this.bottomReached = this.bottomReached || this.checkBottomReached();
        }
        if (typeof this.bottomMethod === 'function' && this.direction === 'up' &&
          this.bottomReached && this.bottomStatus !== 'loading' && !this.bottomAllLoaded) {
          event.preventDefault();
          event.stopPropagation();
          if (this.maxDistance > 0) {
            this.translate = Math.abs(distance) <= this.maxDistance
              ? this.getScrollTop(this.scrollEventTarget) - this.startScrollTop + distance : this.translate;
          } else {
            this.translate = this.getScrollTop(this.scrollEventTarget) - this.startScrollTop + distance;
          }
          if (this.translate > 0) {
            this.translate = 0;
          }
          this.bottomStatus = -this.translate >= this.bottomDistance ? 'drop' : 'pull';
        }
        this.$emit('translate-change', this.translate);
      },
      handleTouchEnd() {
        if (this.direction === 'down' && this.getScrollTop(this.scrollEventTarget) === 0 && this.translate > 0) {
          this.topDropped = true;
          if (this.topStatus === 'drop') {
            this.translate = '50';
            this.topStatus = 'loading';
            this.topMethod();
          } else {
            this.translate = '0';
            this.topStatus = 'pull';
          }
        }
        if (this.direction === 'up' && this.bottomReached && this.translate < 0) {
          this.bottomDropped = true;
          this.bottomReached = false;
          if (this.bottomStatus === 'drop') {
            this.translate = '-50';
            this.bottomStatus = 'loading';
            this.bottomMethod();
          } else {
            this.translate = '0';
            this.bottomStatus = 'pull';
          }
        }
        this.$emit('translate-change', this.translate);
        this.direction = '';
      }
    },
    mounted () {
      this.init();
    }
  }
</script>

<style scoped lang="less" type="text/less">
  .loadmore {
    overflow: hidden
  }
  .loadmore-content.is-dropped {
    -webkit-transition: .2s;
    transition: .2s
  }
  .loadmore-top,.loadmore-bottom{
    text-align: center;
    height: 50px;
    line-height: 50px;
  }
  .loadmore-top{
    margin-top: -50px;
  }
  .loadmore-bottom{
    margin-bottom: -50px;
  }

  .weui-loadmore-bottom{
    padding-top: 1em;
  }
</style>
