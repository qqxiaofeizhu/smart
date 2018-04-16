// ajax请求
import Vue from 'vue'
let postUrl = {
    getAllBookEntry: '/bookstore/get-all-book-entry',
    addBookList: '/bookstore/add-book-list',
    editorSelectBookName: '/bookstore/editor-select-book-name',
    getBookList: 'bookstore/get-book-list',
    getBorrowingById: 'bookstore/borrowing-by-id'
}
/**
 * 得到所有的图书信息
 */
export const getAllBookEntry =  ({commit, state}) => {
    return Vue.prototype.$http({
       method: 'get',
       url: postUrl.getAllBookEntry
    }).then(function(res) {
        const resp = res.data;
        const bookListModel = {};
        if (resp.status) {
            for (let item of resp.data) {
                bookListModel[item.fieldName] = item.fieldValue;
            }
        }
        commit('updateBookDeatil', bookListModel);
        commit('updateBookProtoType', resp.data)
        return resp;
    })
}

/**
 * 保存新增图书信息
 */
export const addBookList = ({commit, state}, postData) => {
    return Vue.prototype.$http({
        method: 'post',
        url: postUrl.addBookList,
        data: postData
     }).then(function(res) {
         return res.data;
     })    
}

/**
 * 编辑图书信息
 */
export const editorBookMessage = ({commit, state}, postData) => {
    return Vue.prototype.$http({
        method: 'post',
        url: postUrl.editorSelectBookName,
        data: postData
    }).then(function(res) {
        return res.data;
    })
}

/**
 * 得到图书列表
 */
export const getBookList = ({commit, state}) => {
    let postData = state.conditions;
    return Vue.prototype.$http({
        method: 'post',
        url: postUrl.getBookList,
        data: postData
     }).then(function(res) {
         const resp = res.data;
         commit('updateBookList', resp.data);
         console.log(resp)
         return resp;
     })    
}

/**
 * 借阅
 */
export const browrringById = ({commit, state}, postData) => {
    return Vue.prototype.$http({
        method: 'post',
        url: postUrl.getBorrowingById,
        data: postData
     }).then(function(res) {
         const resp = res.data;
         return resp;
     })    
}