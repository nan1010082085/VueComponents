<template>
	<div class="pdf-model"
			 :class="[visible ? 'show' : '']"
	     @click="handleClose">
		<div class="model-pdf">
			<canvas class="pdf-canvas" v-if="total > 0" v-for="index in total" :key="index" :id="`total${index}`"></canvas>
		</div>
	</div>
</template>
<style scoped lang="less">
	.pdf-model {
		position: fixed;
		top: 0;
		left: 0;
		z-index: 1005;
		background: rgba(0, 0, 0, .5018);
		width: 100vw;
		height: 100vh !important;
		transform: translateX(100%);
		transition: transform .2s ease-in-out;

		.model-pdf {
			position: absolute;
			bottom: 0;
			width: 100vw;
			height: 70vh;
			background: #fff;
			overflow: scroll;

			.pdf-canvas {
				width: 100%;
			}
		}
	}
	.pad-button-text{
		padding-bottom: 50px;
	}
	.pad-btn{
		width:148px;
		height:60px;
		background:linear-gradient(180deg,rgba(228,162,89,1) 0%,rgba(197,105,45,1) 100%)!important;
		border-radius:10px;
		color: #fff;
	}
	.show {
		transform: translateX(0);
		transition: transform .3s ease-in-out;
	}
</style>
<script>
  import PDFJS from 'pdfjs-dist'

  export default {
    components : {},
    mixins : [],
    name : "",
    data () {
      return {
        pdfData : '',
				total:0,
      }
    },
    props : {
      visible : Boolean,
      pdfUrl : {
        type : String,
        default : ''
      }
    },
    computed : {},
    watch : {
      pdfUrl : {
        handler ( str ) {
          this.getDoc(str)
        }
      },
			deep:true,
      immediate : true
    },
    methods : {
      getDoc ( url ) {
        let that = this;
        PDFJS.getDocument(url).then(pdf => {
          // console.log(pdf)
          that.pdfData = pdf;
          that.total = pdf._pdfInfo.numPages
          that.renderCvs();
        })
      },
      renderCvs ( num ) {
        let that = this;
        for ( let i = 1 ; i <= this.total ; i++ ) {
          this.pdfData.getPage(i).then(function ( page ) {
            // console.log(page);
            let scale = 1.5;
            let viewport = page.getViewport(scale)
            let canvas = document.getElementById(`total${i}`)
            canvas.height = viewport.height
            canvas.width = viewport.width
            // Render PDF page into canvas context
            let renderContext = {
              canvasContext: canvas.getContext('2d'),
              viewport: viewport
            }
            page.render(renderContext)

          })
        }
      },
      handleClose(){
        this.$emit('close')
			}
    },
    mounted () {
    },
    created () {
      this.getDoc()
    },
    filters : {},
    directives : {},
    beforeDestroy () {
    },
    destroyed () {
    }
  }
</script>