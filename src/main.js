// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
// import axios from 'axios'
import store from './store'
// 引入element ui样式库
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import './utils/permission' // permission control
import axios from './utils/request'
Vue.config.productionTip = false
import echarts from 'echarts'

Vue.prototype.$echarts = echarts 

Vue.http = axios

Vue.prototype.$http = axios

Vue.use(ElementUI)
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: { App }
})
