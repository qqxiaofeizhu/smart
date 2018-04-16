import * as actions from './actions'
import * as mutations from './mutations'
import * as getters from './getters'

export const listModule = {
    namespaced: true,
    state: {
       bookDetail: {},
       bookProtoType: [],
       bookList: {
           data: [],
           header: [],
           count: 0,
           p: 1
       },
       conditions: {
           p: 1
       },
       token: ''
    },
    actions,
    mutations,
    getters
}