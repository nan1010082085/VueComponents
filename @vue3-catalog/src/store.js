import Vue        from 'vue'
import Vuex       from 'vuex'
import createPersistedState  from 'vuex-persistedstate'
import actions    from './store/actions'
import mutations  from './store/mutations'
import state      from './store/state'

Vue.use(Vuex)

const getters = {

}


const store = new Vuex.Store({
  state : {
    ...state
  },
  mutations : {
    ...mutations
  },
  actions : {
    ...actions
  },
  getters,
  modules:{ //单模块
  },
  plugins:[createPersistedState({ storage: window.sessionStorage })]
})


export default store;