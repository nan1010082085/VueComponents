import Vue from 'vue'
import VueLoader from './Loader'

const defaultOptions = {
  color : '#297dff',
  height : '2.5',
  show : true,
  timer : 1000,
  maximum : 80,
}

let dom = [];
let currentDefault = { ...defaultOptions }

function instance () {
  if ( !dom.length ) {
    const loader = new (Vue.extend(VueLoader))({
      el : document.createElement('div')
    })
    document.body.appendChild(loader.$el)
    dom.push(loader)
  }
  return dom[ dom.length - 1 ]
}

function Loaders ( options = {} ) {
  const loader = instance();
  //start max or min num
  if ( options.maximum ) {
    if ( isNaN(options.maximum) ) {
      throw (new Error('maximun is NaN'))
    }
  }
  
  options = {
    ...currentDefault,
    ...options,
    remove () {
      loader.show = false
      
      if ( dom.length ) {
        document.body.removeChild(loader.$el)
      }
    }
  }
  
  Object.assign(loader, options)
  
  return loader
}

const createdProps = options => Loaders({ ...options })
const Loader = new Loaders()
//静态参数
Loader.setDefaultOptions = options => {
  createdProps(options)
  
  return Loader
}

//显示
Loader.start = () => {
  Loader.type = 'start'
  Loader.show = true
  if ( !dom.length ) {
    document.body.appendChild(Loader.$el)
    dom.push(Loader)
    
  }
  
  Loader.initAnimate()
}
//消失 清空dom
Loader.finish = () => {
  Loader.type = 'finish'
  Loader.show = true;
  if ( !dom.length ) {
    document.body.appendChild(Loader.$el)
    dom.push(Loader)
  }
  Loader.initAnimate()
  
  setTimeout(() => {
    Loader.show = false
    
    dom.forEach(Loader => {
      Loader.remove()
    });
    dom = []
    
  }, Loader.timer)
}

Loader.install = ( Vue ) => {
  Vue.use(Loader)
}

Vue.prototype.$loader = Loader


export default Loader;