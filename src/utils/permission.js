import router from '../router/index'
import store from '../store/index'
import { Message } from 'element-ui'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'// progress bar style
import { getToken } from '@/utils/auth' // getToken from cookie

NProgress.configure({ showSpinner: false })// NProgress Configuration

// 设置免登录白名单
const whiteList = ['/login','/register', '/'];
const notAdminList = ['/personal']
router.beforeEach((to, from, next) => {
    NProgress.start();
    if (getToken()) {
        // hasToken
        if (to.path == '/login') {
            next('/')
            NProgress.done();
        } else {
            if(store.getters['user/getUserMessage'].username == "") {
                (async function () {
                    await store.dispatch('user/ajaxGetUserMessage');
                })()                
            }
            if (notAdminList.indexOf(to.path) !== -1) { // 在免登录白名单，直接进入
                next()
            } else {
                console.log(store.getters['user/getUserMessage'])
                console.log(whiteList.indexOf(to.path) !== -1)
                if (whiteList.indexOf(to.path) !== -1 || store.getters['user/getUserMessage'].admin > 0) {
                    next();
                    NProgress.done();
                    return;
                    
                }
                router.go(-1)
            }
            NProgress.done();
        }
    } else {
        console.log('into there')
        if (whiteList.indexOf(to.path) !== -1) { // 在免登录白名单，直接进入
            next()
        } else {
            next('/login') // 否则全部重定向到登录页
            NProgress.done() // if current page is login will not trigger afterEach hook, so manually handle it
        }
    }
})
router.afterEach(() => {
    NProgress.done() // finish progress bar
})
  