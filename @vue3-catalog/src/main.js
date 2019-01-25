import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'


/* html font size * rem */
import './assets/js/dynamicfonts'
/* weixin */
import wx from 'weixin-js-sdk'
/* css */
import './assets/css/reset.css'
import './assets/css/pubilc.less'

//上拉加载 -- 下拉刷新
// import Loadmore from './components/Loadmore'
// import loadmore from './mixin/LoadMore'
//
// Vue.component('Loadmore', Loadmore)
// Vue.mixin(loadmore)


import {
    NavBar,
    Tabbar,
    TabbarItem,
    Row,
    Col,
    Icon,
    PasswordInput,
    Cell,
    CellGroup,
    SwitchCell,
    Field,
    Checkbox,
    CheckboxGroup,
    Button,
    Loading,
    Actionsheet,
    DatetimePicker,
    Popup,
    Picker,
    Panel,
    Swipe,
    SwipeCell,
    SwipeItem,
    Tag,
    Collapse,
    CollapseItem,
    Switch,
    Stepper,
    Uploader,
    GoodsAction,
    GoodsActionBigBtn,
    GoodsActionMiniBtn,
    Progress,
    NoticeBar,
    Tab,
    Tabs,
    Dialog,
    Toast,
    ImagePreview,
    List,
    Step,
    Steps
} from 'vant'

Vue.component('NavBar', NavBar)
Vue.component('Tabbar', Tabbar)
Vue.component('TabbarItem', TabbarItem)
Vue.component('Row', Row)
Vue.component('Col', Col)
Vue.component('Icon', Icon)
Vue.component('PasswordInput', PasswordInput)
Vue.component('Checkbox', Checkbox)
Vue.component('CheckboxGroup', CheckboxGroup)
Vue.component('Cell', Cell)
Vue.component('CellGroup', CellGroup)
Vue.component('Field', Field)
Vue.component('Button', Button)
Vue.component('Loading', Loading)
Vue.component('Actionsheet', Actionsheet)
Vue.component('DatetimePicker', DatetimePicker)
Vue.component('Popup', Popup)
Vue.component('Picker', Picker)
Vue.component('Panel', Panel)
Vue.component('Swipe', Swipe)
Vue.component('SwipeCell', SwipeCell)
Vue.component('SwipeItem', SwipeItem)
Vue.component('Tag', Tag)
Vue.component('Collapse', Collapse)
Vue.component('CollapseItem', CollapseItem)
Vue.component('Stepper', Stepper)
Vue.component('GoodsAction', GoodsAction)
Vue.component('GoodsActionBigBtn', GoodsActionBigBtn)
Vue.component('GoodsActionMiniBtn', GoodsActionMiniBtn)
Vue.component('Progress', Progress)
Vue.component('Tab', Tab)
Vue.component('Tabs', Tabs)
Vue.component('List', List)
Vue.component('Step', Step)
Vue.component('Steps', Steps)
Vue.use(Uploader)
Vue.use(SwitchCell)
Vue.use(Switch)
Vue.use(Dialog)
Vue.use(NoticeBar)

/* Vue prototype */
Vue.prototype.$wx = wx
    // Vue.prototype.$weui = weui
Vue.prototype.$toast = Toast
Vue.prototype.$messagBox = Dialog
Vue.prototype.$alert = Dialog.alert
Vue.prototype.$confirm = Dialog.confirm
Vue.prototype.$ImagePreview = ImagePreview

//混入全局loading
import vLoading from './mixin/loading'

Vue.mixin(vLoading);

/* Vue config */
let production = process.env.NODE_ENV !== 'production';
Vue.config.productionTip = false;
//开发工具
Vue.config.devtools = production
Vue.config.debug = production

new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#app')