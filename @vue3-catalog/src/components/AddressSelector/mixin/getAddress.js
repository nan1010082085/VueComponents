export default {
  data(){
    return {
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
      this.$axios.post(`${that.$store.state.url}/api/common/area/getList`, {
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
      this.$axios.post(`${that.$store.state.url}/api/common/area/getList`, {
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
      this.$axios.post(`${that.$store.state.url}/api/common/area/getList`, {
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
      await this.$axios.post(`${that.$store.state.url}/api/common/area/getList`, {
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