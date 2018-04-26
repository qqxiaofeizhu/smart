// ajax请求
import Vue from 'vue'
let postUrl = {
    addNotice: '/bookstore/add-notice',
    getAllNotice: '/bookstore/get-all-notice',
    deleteNoticeById: '/bookstore/delete-notice-by-id',
    // getNoticeById: '/bookstore/get-notice-by-id',
}
export const addNotice = ({commit, state}, postData) => {
    return Vue.prototype.$http({
        method: 'post',
        url: postUrl.addNotice,
        data: postData
     }).then(function(res) {
         const resp = res.data;
         return resp;
     })    
}
export const getAllNotice = ({commit, state}) => {
    return Vue.prototype.$http({
        method: 'get',
        url: postUrl.getAllNotice,
     }).then(function(res) {
         const resp = res.data;
         return resp;
     })    
}
export const deleteNoticeById = ({commit, state}, postData) => {
    return Vue.prototype.$http({
        method: 'post',
        url: postUrl.deleteNoticeById,
        data: postData
     }).then(function(res) {
         const resp = res.data;
         return resp;
     })    
}
// export const getNoticeById = ({commit, state}, postData) => {
//     return Vue.prototype.$http({
//         method: 'post',
//         url: postUrl.getNoticeById,
//         data: postData
//      }).then(function(res) {
//          const resp = res.data;
//          return resp;
//      })    
// }