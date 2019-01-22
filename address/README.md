### 使用解释

> csdn https://blog.csdn.net/weixin_38644883/article/details/86553907

>20190122
>最新修改 通过 淘宝移动端适配插件 "lib-flexible" 与 postcss-pxtorem px自动转换插件 适配 在微信浏览器中适配 ios 和 android
> 如果你没有用到以上的的插件 你的设计稿为750 请自行调整 px

#### 修改或使用 请阅读下面简介

> 先发一张手机效果图
![在这里插入图片描述](https://img-blog.csdnimg.cn/20190119161037802.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3dlaXhpbl8zODY0NDg4Mw==,size_16,color_FFFFFF,t_70)
---
 1. 支持每列单独滑动
 2. 点击名字选中当前地址
 3. 点击蒙层 close响应 传递当前数据
 4. 点击确定 confirm响应 传递当前数据
 ---
#### 目录
 mixin ==> 混入文件 控制后三列滑动
 util ==> 工具文件， 克隆传递过来的数据
 getAddress.js  //获取数据文件 需要在父组件混入
 
#### props
visible 控制组件显示隐藏
province  第一列数据 
city 第二列数据
county 第三列数据
street 第四列数据
--- 每列数据 变量在 getAddress.js 中定义 请确保父组件中不予起冲突
 valueData 初始化默认选中数据  数据格式单层对象
 ![在这里插入图片描述](https://img-blog.csdnimg.cn/20190119161952788.png)
#### 响应回调数据
![在这里插入图片描述](https://img-blog.csdnimg.cn/20190119162215552.png)

#### 注意
每次改变数据 都会出发change响应
点击蒙层与确定会出发各自的事件 并 隐藏组件 

####  使用
> 父组件中 component 引入
>   import AddressList from '../../newComponent/AddressList'
  import getAddress from '../../newComponent/mixin/getAddress'
```
引入
  import AddressList from '../../newComponent/AddressList'
  import getAddress from '../../newComponent/mixin/getAddress'
    export default {
	 	mixins:[getAddress],
		components:{AddressList},
	}
//template
<AddressList
			:visible="visible"
			:province="province"
			:city="city"
			:county="county"
			:street="street"
			:value-data="dataInfo.area"
			@close="handleAddressClose"
			@change="handleAddressChange"
			@confirm="handleAddressConfirm"
		></AddressList>
```
#### 父组件中方法使用说明 可以定义你自己需要的这里仅示例
```
getAddressData(data){ //父组件中动态展示
        try {
          this.provinceText= data.rag[0].value//省,格式:'1:北京',
          this.provinceId= data.rag[0].id
          this.cityText= data.rag[1].value//市
          this.cityId= data.rag[1].id
          this.districtText= data.rag[2].value//县
          this.districtId= data.rag[2].id
          this.townText= data.rag[3].value//镇
          this.townId= data.rag[3].id
        }catch ( e ) {}
},
handleAddressChange(data){//选中改变
        // console.log(data)
        this.getAddressData(data); //

        switch (data.tag ) {  //分别判断并调用接口
          case 'province':
            this.getCity(data.id)
            ;break
          case 'city':
            this.getCounty(data.id)
            ;break
          case 'county':
            this.getStreet(data.id)
            ;break
          case 'street':
            ;break
        }
      },
      handleAddressClose(data){//点击蒙层关闭
        this.getAddressData(data);
		this.visible = false
      },
      handleAddressConfirm(data){//点击确定关闭
        this.getAddressData(data);
        this.visible = false
      },
```