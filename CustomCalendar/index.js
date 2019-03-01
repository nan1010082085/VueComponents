import calendar from './src/calendar'

const Calendar = calendar;

Calendar.install = (Vue) =>{
  Vue.component(Calendar.name, Calendar)
}

export default  Calendar