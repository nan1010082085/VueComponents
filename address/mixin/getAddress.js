import {getAddress} from '../../../api'

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
			getAddress(id).then((response)=>{
        let list = response.data;
        that.province =  list.map((data)=>{
          return {id:data.id,value:data.name,parent:data.parent,isCheck:false}
        }).slice(1)
      })
    },
    getCity(id){
      let that = this;
      that.city = [];that.county = [];that.street = []
			getAddress(id).then((response)=>{
				if(response && response.data) {
					let list = response.data
					that.city = list.map((data) => {
						return { id: data.id, value: data.name, parent: data.parent, isCheck: false }
					})
				}else {
					that.city = []
				}
      })
    },
    getCounty(id){
      let that = this;
      that.county = [];that.street = []
			getAddress(id).then((response)=> {
				if(response && response.data){
					let list = response.data;
					that.county = list.map((data)=>{
						return {id:data.id,value:data.name,parent:data.parent,isCheck:false}
					})
				}else {
					return that.county = []
				}
      })
    },
    async getStreet(id){
      let that = this;
      that.street = []
      await getAddress(id).then((response)=> {
				if(response && response.data) {
					let list = response.data
					that.street = list.map((data) => {
						return { id: data.id, value: data.name, parent: data.parent, isCheck: false }
					})
				}else {
					that.street = []
				}
      })
    },
  },
  created(){
    this.getProvince(this.parentId)
  },
}