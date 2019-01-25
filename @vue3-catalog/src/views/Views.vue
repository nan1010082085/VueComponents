<template>
	<div>
		<Row class="views-container">
			<router-view></router-view>
		</Row>
		<Tabbar v-model="active" @change="handleTabbarActive">
		<!--	<TabbarItem>
				<i  slot="icon" class="iconfont icon-shouye-1"></i>
				首页</TabbarItem>-->
			<TabbarItem>
				<i  slot="icon" class="iconfont icon-shouye-1"></i>
				首页</TabbarItem>
			<TabbarItem>
				<i  slot="icon" class="iconfont icon-wode"></i>
				我的</TabbarItem>
		</Tabbar>
	</div>
</template>

<script>
  export default {
    data () {
      return {
        active:0,
			}
    },
    watch : {
      '$route':{
        handler(to,from){
   				// console.log(to)
					switch ( to.name ){
            // case 'Home':
            //   this.active = 0;break;
						case 'Manage':
						  this.active = 0;break;
            case 'Me':
              this.active = 1;break;
            case 'Views':
              this.active = 0;
							this.$router.push({name:'Manage'})
              break;
					}
				},
				deep:true,
				immediate:true
			}

		},
    methods : {
      handleTabbarActive(env){
        // console.log(env)
				this.active = env;
				switch ( env ) {
          case 0:
            this.$router.push({name:'Manage'});
            break;
          case 1:
            this.$router.push({name:'Me'});
            break;
				}
			},
		},
  }
</script>

<style lang="less" type="text/less" scoped>
	.views-container{
		height: calc(100vh - 50px);
		overflow-x: hidden;
		overflow-y: scroll;
	}
</style>
