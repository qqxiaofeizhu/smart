// ajax请求
import Vue from 'vue'
let postUrl = {
    ajaxUserRegistration: '/bookstore/register',
    ajaxManagementPersonnel: '/bookstore/get-all-management-personnel',
    ajaxDelteUsers: '/bookstore/delete-users',
    ajaxSetOrdinaryToSuper:'/bookstore/set-ordinary-to-super',
    ajaxGetUserMessage: '/bookstore/get-user-message',
    ajaxGetUserBorrow: '/bookstore/get-user-all-borrow-books'
}
/**
 *用户注册User registration
 */

 export const userRegistration = ({commit, state}, postData) => {
     return Vue.prototype.$http({
        method: 'post',
        url: postUrl.ajaxUserRegistration,
        data: postData
     }).then(function(res) {
         const resp = res.data;
         return resp;
     })
 }

 /**
  * 获取所有的用户
  */

  export const getAllUsers = ({commit, state}) => {
    return Vue.prototype.$http({
        method: 'get',
        url: postUrl.ajaxManagementPersonnel,
     }).then(function(res) {
         const resp = res.data;
         if (resp.type) {
             commit('updateAllUsers', resp.data)
         }
         return resp;
     })    
  }

  /**
   * 删除用户
   */

export const deleteUser = ({commit, state}, postData) => {
    return Vue.prototype.$http({
        method: 'post',
        url: postUrl.ajaxDelteUsers,
        data: postData
     }).then(function(res) {
         const resp = res.data;
         return resp;
     })      
}
/**
 * 更新为超级管理员
 */
export const setOrdinaryToSuper = ({commit, state}, postData) => {
    return Vue.prototype.$http({
        method: 'post',
        url: postUrl.ajaxSetOrdinaryToSuper,
        data: postData
     }).then(function(res) {
         const resp = res.data;
         return resp;
     })      
}
/**
 * 获取当前用户
 */

 export const ajaxGetUserMessage = ({commit, state}) => {
    return Vue.prototype.$http({
        method: 'get',
        url: postUrl.ajaxGetUserMessage,
     }).then(function(res) {
         const resp = res.data;
         if (resp.type) {
             commit('updateUserMessage', resp.data)
         }
         return resp;
     })      
 }

 /**
  * 获取用户信息
  */
 export const ajaxGetPersonal = ({commit, state}, postData) => {
     let url = ''
     if (postData == 0) {
        
     }
 }