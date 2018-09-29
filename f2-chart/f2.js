//f2 核心
// import F2 from '@antv/f2';
import F2 from '@antv/f2/lib/index-all';  //全部引入 包含交互
//打点监控 是否开启
F2.track(false)
//dpr
F2.Global.pixelRatio = window.devicePixelRatio;

import '@antv/f2/lib/interaction'
export default F2