import router from '../router/index'
import store from '../store/index'
import { Message } from 'element-ui'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'// progress bar style
import { getToken } from '@/utils/auth' // getToken from cookie

NProgress.configure({ showSpinner: false })// NProgress Configuration

// 设置免登录白名单
const whiteList = ['/login', '/register', '/', '/personal'];
const notAdminList = ['/notice']
const userWhiteList = ['/login', '/register', '/']
router.beforeEach((to, from, next) => {
    NProgress.start();
    if (getToken()) {
        // 数据没有
        if (store.getters['user/getUserMessage'].username == "") {
            (async function () {
                await store.dispatch('user/ajaxGetUserMessage');
            })()
        }
        setTimeout(function(){
            // 得到用户信息
            if (whiteList.indexOf(to.path) !== -1) {
                next();
            } else { // 不在白名单内
                // 超级管理员
                if (store.getters['user/getUserMessage'].admin > 100) {
                    next();
                } else if(store.getters['user/getUserMessage'].admin < 100){
                    next('/personal');
                } else {
                    if (notAdminList.indexOf(to.path) !== -1) {
                        next('/personal');
                    }
                }
            }
            NProgress.done();
        }, 300);
    } else {
        if (userWhiteList.indexOf(to.path) !== -1) {
            next();
        } else {
            next('/login')
        }
        NProgress.done();
    }
})
router.afterEach(() => {
    NProgress.done() // finish progress bar
})
