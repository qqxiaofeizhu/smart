import Vue from 'vue'
import Router from 'vue-router'
import login from '@/components/admin/Login'
import register from '@/components/admin/register'
import addBookList from '@/components/list/addBook'
import Error from '../components/error/error'
import list from '../components/list/index'
import userManagement from '../components/admin/users'
import booklist from '../components/front/index'
import Personal from '../components/admin/personal'
import Notice from '../components/notice/index.vue'
Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'booklist',
      component: booklist
    },
    {
      path: '/login',
      name: 'login',
      component: login
    },
    {
      path: '/register',
      name: 'register',
      component: register
    },
    {
      path: '/list',
      name: 'list',
      component: list,
    },
    {
      path: '/list/add-list',
      name: 'addList',
      component: addBookList
    },
    {
      path: '/users',
      name: 'userManagement',
      component: userManagement
    }, {
      path: '/personal',
      name: 'personal',
      component: Personal
    },
    {
      path: '/notice',
      name: 'Notice',
      component: Notice
    },
    {
      path: '/404',
      name: 'error',
      component: Error
    },
    {
      path: '*',
      redirect: '/404'
    }
  ]
})
