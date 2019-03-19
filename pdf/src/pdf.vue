<template>
	<div class="pdf-model">
		<div class="pdf-button-group">
			<div class="pad-btn-left">
				<button class="pad-btn" :disabled="scale == maxScale" @click="handleScaleChange">{{`放大0.5倍`}}</button>
				<button class="pad-btn" :disabled="scale == minScale" @click="handleScaleChangeLose">{{`缩小0.5倍`}}</button>
			</div>
			<span class="pdf-scale-tips">当前倍数{{scale}}</span>
		</div>
		<div ref="scroll" class="model-pdf">
			<div class="pdf-canvas-box" :style="setPdfStyle">
				<canvas class="pdf-canvas"
								v-if="numPages > 0"
								v-for="index in numPages"
								:key="index"
								:id="`total${index}`"></canvas>
			</div>
		</div>
	</div>
</template>
<script>
  import PDFJS from '../pdf/pdf'
  import '../pdf/pdf.worker'
  export default {
    components : {},
    mixins : [],
    name : "",
    data () {
      return {
        pdfData : '',
        numPages : undefined,
        initFlag:true,
        scale : 1,
        scales : 1,
        minScale : 1, //最小缩放
        maxScale : 2, //最大缩放
        domInter:'',
        isDomStyle:false, //綁定样式
      }
    },
    props : {},
    computed : {
      setPdfStyle(){
        if(this.isDomStyle){
          return `transform-origin:0px 0px 0px;transform:scale(${this.scale});`
        }else {
          return ''
        }
      },
    },
    watch : {},
    methods : {
      initData(){
        let _that = this;
        let Url = ''; //服务器接口调用
        this.$axios.post(Url, { id: this.$route.query.orderId }).then((response)=> {
          var res = response.data;
          if (1000 == res.code) {
            _that.getDoc(res.data)
          }
        });
      },
      getDoc ( url ) {
        let that = this;
        PDFJS.cMapPacked = true;
        PDFJS.getDocument(url).then(pdf => {
						that.pdfData = pdf;
					that.numPages = pdf._pdfInfo.numPages
					that.renderCvs();
				})
      },
      renderCvs ( num ) {
        let vm = this;
        for ( let i = 1 ; i <= this.numPages ; i++ ) {
          this.pdfData.getPage(i).then(function ( page ) {
            if(vm.initFlag){ //默认2倍缩放
              vm.scales = 2
            }
            vm.initFlag = false;
            let viewport = page.getViewport(vm.scales)
            let canvas = document.querySelector(`#total${i}`)
            canvas.height = viewport.height
            canvas.width = viewport.width
            // Render PDF page into canvas context
            let renderContext = {
              canvasContext: canvas.getContext('2d'),
              viewport: viewport
            }
            page.render(renderContext)
          })
          if(i == this.numPages){
            document.querySelector('.pdf-canvas-box').scrollTo(0,10)
          }
        }
      },
      //縮放操作
      handleScaleChange(){
        if(this.scale === this.maxScale) {
          this.$toast('最大了')
          return
        }
        this.scale += 0.5
      },
      handleScaleChangeLose(){
        if(this.scale === this.minScale) {
          this.$toast('最小了')
          return
        }
        this.scale -= 0.5
      }
    },
    mounted () {
      let crr = 10
      this.$nextTick(()=>{
        document.querySelector('.model-pdf').scrollTop && (document.querySelector('.model-pdf').scrollTop = 0);
				this.$toast.loading({duration:0, message:'加载中...'})
					this.domInter = setInterval(()=>{
						if(this.numPages > 0){
						this.isDomStyle = true;
						this.$toast.clear()
						window.clearInterval(this.domInter)
					}else {
						crr--
						if(crr <= 0){
							this.$toast.clear()
							window.clearInterval(this.domInter)
						}
					}
				},1000)
			})
    },
    created () {
      document.title = 'e家农园'
      this.initData();
      //H5跳转
      this.popStateInit({name:this.$route.query.name})
    },
    filters : {},
    directives : {},
    beforeDestroy () {
      this.$toast.clear()
      window.clearInterval(this.domInter)
    },
    destroyed () {}
  }
</script>
<style scoped lang="less">
	.pdf-model {
		position: relative;
		width: 100vw;
		height: 100vh;

		.model-pdf {
			position: absolute;
			top: 0;
			width: 100vw;
			height: 100%;
			background: #fff;
			-webkit-overflow-scrolling: touch;
			overflow: scroll;

			.pdf-canvas {
				display: block;
				width: 100%;
			}
		}
	}
	.pdf-button-group {
		position: fixed;
		z-index: 20;
		width: 100vw;
		top: 0;
		height: 100px;
		background: #fff;
		.pad-btn-left{
			position: absolute;
			top: 20px;
			left: 30px;
		}
		.pad-btn {
			margin-left: 10px;
			width: 120px;
			height: 40px;
			background: linear-gradient(180deg, rgba(228, 162, 89, 1) 0%, rgba(197, 105, 45, 1) 100%) !important;
			border-radius: 60px;
			color: #fff;
			font-size: 20px;
			font-family: PingFangSC-Medium;
			font-weight: 500;
			line-height: 22px;
			border:none;
			outline: none;
		}
		.pdf-scale-tips{
			position: absolute;
			top: 20px;
			font-size: 28px;
			font-family: PingFangSC-Medium;
			font-weight: 500;
			line-height: 38px;
		}
		.model-pdf-close {
			position: absolute;
			width: 60px;
			height: 60px;
			top: 20px;
			right: 30px;
			font-size: 32px;
			font-family: PingFangSC-Medium;
			font-weight: bold;
			line-height: 38px;
		}
	}
</style>