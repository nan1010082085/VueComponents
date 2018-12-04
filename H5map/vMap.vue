<template>
	<div>
		<NavBar
			title="地址定位"
			left-text="返回"
			left-arrow
			@click-left="back"
			right-text="确定"
			@click-right="onConfirm">
		</NavBar>
		<iframe id="mapPage" frameborder=0
						src="https://apis.map.qq.com/tools/locpicker?search=1&type=1&key=your key&referer=vMap">
		</iframe>
	</div>
</template>
<style scoped lang="less" type="text/less">
	#mapPage {
		width: 100vw;
		height: calc(100vh - 50px);
	}

	#container {
		width: 100vw;
		height: 200px;
	}

	.map-li {
		position: relative;
		width: 100vw;
	}

	.icon {
		border-radius: 50%;
		width: 20px;
		height: 20px;
		background-color: #67C23A;
		position: absolute;
		right: 10%;
		top: 25%;
	}

	.icon-r {
		border-radius: 50%;
		width: 10px;
		height: 10px;
		border: 2px solid #fff;
		position: absolute;
		top: 3px;
		left: 3px;
	}
</style>
<script>
  import { mapMutations,mapState } from 'vuex'
  import { MAP_DATA }     from "../store/mutations-types";

  export default {
    name : "",
    mixins : [],
    props : {},
    components : {},
    data () {
      return {
        geocoder : '',
        latlng : '',

        roleForm : {
          country : '', //国家
          province : '', //省
          city : '', //市
          area : '', //县
          longitude : '', //经度
          latitude : '', //纬度
          mer_address : ''
        }
      }
    },
    computed : {
			...mapState({
				mapData: state => state.map
			})
    },
    watch : {},
    methods : {
      ...mapMutations([
        MAP_DATA
      ]),
      back () {
        this.$router.push({ name : this.$route.query.back, query : { type : this.$route.query.type } })
      },
      onConfirm () {
        if ( this.roleForm.mer_address == '' ) {
          this.$toast({ position : 'bottom', message : '点击列表选择详细地址' })
          return
        }
        this[ MAP_DATA ](this.roleForm)
        // alert(JSON.stringify(this.roleForm))
        this.$router.push({ name : this.$route.query.back, query : { type : this.$route.query.type } })
      },
      getLocations () {
        let that = this;
        window.addEventListener('message', that.showPosition, false);
      },
      showPosition ( event ) {
        // 接收位置信息，用户选择确认位置点后选点组件会触发该事件，回传用户的位置信息
        let that = this;
        let loc = event.data;
        if ( loc && loc.module == 'locationPicker' ) {//防止其他应用也会向该页面post信息，需判断module是否为'locationPicker'
          // console.log('location', loc);
          // alert(JSON.stringify(loc))
					if(Object.getOwnPropertyNames(this.mapData).length <= 1){
            that.coord = new qq.maps.LatLng(loc.latlng.lat,loc.latlng.lng);
					}else {
            that.coord = new qq.maps.LatLng(this.mapData.latitude,this.mapData.longitude);
					}


					that.Geocoder(that.coord)

          that.roleForm.mer_address = loc.poiaddress;
          that.roleForm.longitude = loc.latlng.lng; //经度
          that.roleForm.latitude = loc.latlng.lat; //纬度
        }
      },
			Geocoder(coord){
        let that = this;
        this.geocoder = new qq.maps.Geocoder({
          complete:function(result){
            // console.log('成功：',result.detail);
						let loc = result.detail.addressComponents
            that.roleForm.country = loc.country; //国家
            that.roleForm.province = loc.province; //省
            that.roleForm.city = loc.city; //市
            that.roleForm.area = loc.district; //县
          }
        });

        this.geocoder.getAddress(coord);
			},
    },
    mounted () {
      this.$nextTick(_ => {
        this.getLocations();
      })
    },
    created () {
    },
    filters : {},
    beforeDestroy () {
      //vue实例正在被销毁,还可以调用this,data
    },
    destroyed () {
      //vue实例被销毁了
    }
  }
</script>