import PDF from './src/pdf'

PDF.install = (Vue) =>{
  Vue.component(PDF.name, PDF)
}

export default  PDF