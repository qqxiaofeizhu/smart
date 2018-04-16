import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)
import {listModule} from '../components/list/store'
import {userModule} from '../components/admin/store'


const Store = new Vuex.Store({
  modules: {
    list: listModule,
    user: userModule
  }
})

export default Store
