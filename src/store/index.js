import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)
import {listModule} from '../components/list/store'
import {userModule} from '../components/admin/store'
import {noticeModule} from '../components/notice/store'

const Store = new Vuex.Store({
  modules: {
    list: listModule,
    user: userModule,
    notice: noticeModule
  }
})

export default Store
