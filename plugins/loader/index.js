import loader from './src/loader.vue'

export default {
  install(Vue, option){
    const Loader = Vue.extend(loader);
    const instance = new Loader();
    instance.$mount(document.createElement('div'))
    document.body.appendChild(instance.$el)
    const {start,finish,$props} = instance;
    if(option){
      if(option.backgroundColor && option.backgroundColor != ''){
        $props.bgColor = option.backgroundColor
      }
      if(option.height && option.height != ''){
        $props.height = option.height
      }
    }
    Vue.prototype.$loader = {
      start,
      finish
    }
  },
}