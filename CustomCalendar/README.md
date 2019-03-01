# Calendar

### 享一下组件目录
![在这里插入图片描述](https://img-blog.csdnimg.cn/20190301195618131.png)
### tip: 组件功能：

 1.  展示当前年份当前月，
 2. 支持左右 icon自定义
 3. 支持自定义当前日提示边框颜色
 4. 支持自定义某一日选择背景颜色， 边框染色如已经自定义边框颜色则为自定义颜色
 5. 某一日选中采用圆点模式

### 使用
引入 main.js
![在这里插入图片描述](https://img-blog.csdnimg.cn/20190301200915781.png)
组件中使用
默认
![在这里插入图片描述](https://img-blog.csdnimg.cn/20190301202452454.png)
自定义左侧icon
![在这里插入图片描述](https://img-blog.csdnimg.cn/2019030120084725.png![在这里插入图片描述](https://img-blog.csdnimg.cn/20190301200857393.png)
某一个日期出现选中状态， 圆点模式
![在这里插入图片描述](https://img-blog.csdnimg.cn/20190301202256116.png)
### ps: 自定义某一日 数据传递
	[ { active : 1 } ]
	数组对象， 其中必须有 key = active, value ：Number // 为组件判断某一日选中参数
### 默认效果
![在这里插入图片描述](https://img-blog.csdnimg.cn/20190301202554750.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3dlaXhpbl8zODY0NDg4Mw==,size_16,color_FFFFFF,t_70)
						
### 效果图1， 当前日期出现选择边框![在这里插入图片描述](https://img-blog.csdnimg.cn/20190301195510443.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3dlaXhpbl8zODY0NDg4Mw==,size_16,color_FFFFFF,t_70)
### 效果图2， 某个日期出现选中 默认模式
![在这里插入图片描述](https://img-blog.csdnimg.cn/20190301200535367.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3dlaXhpbl8zODY0NDg4Mw==,size_16,color_FFFFFF,t_70)
### 效果图2， 某个日期出现选中 圆点模式
![在这里插入图片描述](https://img-blog.csdnimg.cn/20190301201602773.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3dlaXhpbl8zODY0NDg4Mw==,size_16,color_FFFFFF,t_70)