>identify

* canvas 生成图片验证码



参数  |	说明  |	类型  |	默认值
---|---|---|---
identifyCode |	需要展示的验证码 |	string	| 1234
fontSizeMin	 | 字体大小，最小值  |	number  |	16
fontSizeMax |	字体大小，最大值|	number|	40
backgroundColorMin|	背景颜色色值最小值，最小为0|	number|	180
backgroundColorMax|	背景颜色色值最大值，最大为255|	number|	240
colorMin|	字体颜色色值最小值，最小为0	|number	|50
colorMax|	字体颜色色值最大值，最大为255|	number	|160
lineColorMin|	干扰线颜色色值最小值，最小为0|	number|	40
lineColorMax|	干扰线颜色色值最大值，最大为255|	number|	180
dotColorMin|	干扰点颜色色值最小值，最小为0|	number	|0
dotColorMax|	干扰点颜色色值最大值，最大为255|	number|	255
contentWidth|	画布宽度|	number|	160
contentHeight|	画布高度|	number|	40


* 使用

```
//template
<VIdentify class="code-btn-img"
		:contentWidth="100"
		:contentHeight="40"
		:identifyCode="identifyCode"></VIdentify>
//script
import VIdentify from '../../components/identify'
export default {
	components: {'VIdentify':VIdentify},
    data(){
        return:{
            identifyCode:5757
        }
    }
}

```