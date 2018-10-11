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
		<div id="container"></div>
		<div class="scroll-container-hei-500">
			<Row v-if="getNearPois" class="bgf ptb08 plr15 mt03 mb03" v-for="item,index in getNearPois" :key="index"
					 @click.native="handleCheck(item,index)">
				<Col :span="24" class="map-li">
					<p class="fz14 fw600">{{item.name}}</p>
					<span class="fz12 mt03 c7c7">{{item.address}}</span>
					<!--<Icon v-if="item.check" class="icon csuc fz16" name="checked"></Icon>-->
					<div v-if="item.check" class="icon">
						<div class="icon-r"></div>
					</div>
				</Col>
			</Row>
		</div>
	</div>
</template>
<style scoped lang="less" type="text/less">
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
	import {mapMutations} from 'vuex'
	import {MAP_DATA}     from "../store/mutations-types";

  export default {
    name : "",
    mixins : [],
    props : {},
    components : {},
    data () {
      return {
        map : '',
        geocoder : '',
        latlng : '',
        address : {},

        roleForm : {
          country : '', //国家
          province : '', //省
          city : '', //市
          area : '', //县
          mer_address : ''
        }
      }
    },
    computed : {
      getNearPois () {
        return this.address.nearPois ? this.address.nearPois : null
      }
    },
    watch : {},
    methods : {
			...mapMutations([
			  MAP_DATA
			]),
      back () {
        this.$router.push({ name : this.$route.query.back })
      },
      onConfirm () {
        if ( this.roleForm.mer_address == '' ) {
          this.$toast({ position : 'bottom', message : '点击列表选择详细地址' })
          return
        }
				this[MAP_DATA](this.roleForm)
        // alert(JSON.stringify(this.roleForm))
				this.$router.push({name:this.$route.query.back})
      },
      handleCheck ( item, index ) {
        let list = this.address.nearPois;
        for ( let i = 0 ; i < list.length ; i++ ) {
          const listElement = list[ i ];
          if ( listElement.check ) {
            listElement.check = false
          }
        }
        if ( item.check == false || item.check == null || item.check == undefined ) {
          this.$set(item, 'check', true)
          this.roleForm.mer_address = item.address + item.name;
        } else {
          this.$set(item, 'check', false)
          this.roleForm.mer_address = '';
        }
      },
      getLocation () {
        let that = this;
        //判断是否支持 获取本地位置
        if ( navigator.geolocation ) {
          // console.log(navigator.geolocation);
          navigator.geolocation.getCurrentPosition(function ( position ) {
            // console.log(position)
            that.showPosition(position)
          }, function ( err ) {
            // console.log(err, 'err');
            if ( err.code == 1 ) {
              that.$toast({ position : 'bottom', message : '用户禁止了地理位置访问' })
            } else if ( err.code == 2 ) {
              that.$toast({ position : 'bottom', message : '当前浏览器无响应' })
            }

          });
        }
        else {
          this.$toast({ position : 'bottom', message : '当前浏览器不支持定位,请手动输入位置信息' })
        }
      },
      showPosition ( position ) {
        let that = this;
        // alert(position.coords.latitude)
        let lat = position.coords.latitude;
        let lng = position.coords.longitude;
        //调用地图命名空间中的转换接口   type的可选值为 1:GPS经纬度，2:搜狗经纬度，3:百度经纬度，4:mapbar经纬度，5:google经纬度，6:搜狗墨卡托
        qq.maps.convertor.translate(new qq.maps.LatLng(lat, lng), 1, function ( res ) {
          // alert(res[0])
          //取出经纬度并且赋值
          that.latlng = res[ 0 ];

          that.map = new qq.maps.Map(document.getElementById("container"), {
            center : that.latlng,
            zoom : 13
          });
          //设置marker标记
          let marker = new qq.maps.Marker({
            map : that.map,
            position : that.latlng
          });
        });

        that.geocoder = new qq.maps.Geocoder({
          complete : function ( result ) {
            // alert(JSON.stringify(result.detail))
            result.detail.nearPois[ 0 ].check = true;
            that.address = result.detail
            let addressComponents = result.detail.addressComponents;
            let normal = result.detail.nearPois[ 0 ].address + result.detail.nearPois[ 0 ].name;
            that.roleForm.country = addressComponents.country;
            that.roleForm.province = addressComponents.province;
            that.roleForm.city = addressComponents.city;
            that.roleForm.area = addressComponents.district;
            that.roleForm.mer_address = normal;

            that.map.setCenter(result.detail.location);
          }
        });


        window.setTimeout(_ => {
          that.geocoder.getAddress(this.latlng)
        }, 500)
      }
    },
    mounted () {
      this.$nextTick(_ => {
        this.getLocation();
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