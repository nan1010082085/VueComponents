/*这里为获取数据 您需要调用自己的接口 或是第三方接口数据 或是使用您喜欢的ajax请求方式 */

export default {
  data(){
    return {
      url:'',  //您的接口
      parentId: 0,
      province:[],
      city:[],
      county:[],
      street:[],
    }
  },
  methods:{
    getProvince(id){
      let that = this;
      that.city = [];that.county = [];that.street = []
      this.$axios.post(this.url, {
        parentId: id,
      }).then(function (response) {
        let list = JSON.parse(response.data).data;
        that.province =  list.map((data)=>{
          return {id:data.id,value:data.name,parent:data.parent,isCheck:false}
        })
      })
      // that.getCity(that.province[0].id)
    },
    getCity(id){
      let that = this;
      that.city = [];that.county = [];that.street = []
      this.$axios.post(this.url, {
        parentId: id,
      }).then(function (response) {
        let list = JSON.parse(response.data).data;
        that.city = list.map((data)=>{
          return {id:data.id,value:data.name,parent:data.parent,isCheck:false}
        })
      })
      // that.getCounty(that.city[0].id)
    },
    getCounty(id){
      let that = this;
      that.county = [];that.street = []
      this.$axios.post(this.url, {
        parentId: id,
      }).then(function (response) {
        let list = JSON.parse(response.data).data;
        // console.log(list)
        that.county = list.map((data)=>{
          return {id:data.id,value:data.name,parent:data.parent,isCheck:false}
        })
      })
      // that.getStreet(that.county[0].id)
    },
    async getStreet(id){
      let that = this;
      that.street = []
      await this.$axios.post(this.url, {
        parentId: id,
      }).then(function (response) {
        let list = JSON.parse(response.data).data;
        // console.log(list)
        that.street = list.map((data)=>{
          return {id:data.id,value:data.name,parent:data.parent,isCheck:false}
        })
      })
    },
  },
  created(){
    this.getProvince(this.parentId)
  },
}