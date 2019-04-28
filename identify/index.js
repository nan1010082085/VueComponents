import VIdentify from './src/identify'


VIdentify.install = (Vue) =>{
	Vue.component(VIdentify.name,VIdentify)
}

export default VIdentify