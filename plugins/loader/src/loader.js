import Vue from 'vue'
import loader from './loader.vue'
const LoaderConstructor = Vue.extend(loader);

let getInstance = () =>{
  return new LoaderConstructor({
    el:document.createElement('div')
  })
}

const Loader = (options = {}) =>{
  let instance = getInstance();
  instance.height = options.height || '3px';
  instance.bgColor = options.backgroundColor || '#297dff';
  
  document.body.appendChild(instance.$el)
  
  const {init,start,finish} = instance;
  
  // Vue.nextTick(function () {
  //   init()  // ...实例化dom初始化
  // })
  
  return {
    start,
    finish
  }
}

export default Loader;