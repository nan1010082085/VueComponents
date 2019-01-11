# Swipe.vue
```
	<SwipeLoop
			class-name="swipeloop"
			:loop="true"
			:swiper-index="1"
			@change="handleSwipeLoopChange"
			@click="handleClick">
			<SwipeLoopItem v-if="scrollData" v-for="(item,index) in scrollData" :key="index">
				<div class="loop-item-image"
						 :class="{'loop-item-image-active':swiperIndex == index}"
						 @click="toUrl(item.targetUrl)"
				>
					<img :src="item.imgUrl">
				</div>
			</SwipeLoopItem>
		</SwipeLoop>
```
> class-name 自定义 class 必填
> loop 是否自动滚动
> swiper-index 初始化显示第几个
> change 滚动到那张 回调 index
> click 点击事件
```
import SwipeLoop      from './swipe/Swipe'
import SwipeLoopItem  from './swipe/SwipeItem'

components : { SwipeLoop, SwipeLoopItem },
```