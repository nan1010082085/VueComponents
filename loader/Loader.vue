<template>
	<div class="uic-loader-fixed" v-show="show">
		<div
			class="uic-loader-back"
			:style="gutter"
		></div>
	</div>
</template>
<script>
  export default {
    name : "loader",
    data () {
      return {
        type:'',
        back : 0,
        inter : ''
      }
    },
    computed : {
      gutter:{
        get(){
          return `width:${this.back}%;height:${this.height}px;background-color:${this.color};`
				}
      }
    },
    props : {
      color : String,
      height:[Number, String],
      show : Boolean,
      timer : Number,
      maximum : Number,
    },
    watch : {},
    methods : {
      initAnimate () {
        this.back = 0

        if(this.type === 'start'){
          clearInterval(this.inter)
          let backWidth = 1;

          this.inter = setInterval(() => {
            backWidth++
            this.back = backWidth;
            if ( this.maximum == backWidth ) {
              clearInterval(this.inter)
            }
          }, 100)
				}else if(this.type === 'finish'){
          clearInterval(this.inter)
          this.back = 100
				}

      }
    },
    beforeDestroy () {
      clearInterval(this.inter)
    }
  }
</script>
<style scoped>
	.uic-loader-fixed {
		position: fixed;
		left: 0;
		top: 0;
		width: 100%;
	}

	.uic-loader-back {
		width: 0;
		height: 0;
	}
</style>