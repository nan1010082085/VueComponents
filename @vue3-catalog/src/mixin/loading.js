export default {
  data(){
    return{
      vloading:'',
    }
  },
  methods:{
    loadingOpen(){
      this.$loader.start()
    },
    loadingClose(){
      this.$loader.finish()
    },
  }
}