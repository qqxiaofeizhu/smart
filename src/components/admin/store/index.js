import * as actions from './actions'
import * as mutations from './mutations'
import * as getters from './getters'

export const userModule = {
    namespaced: true,
    state: {
       userMessage: {
           username: '',
           admin: 0
       },
       variousUsers: [],  // 各种用户
    },
    actions,
    mutations,
    getters
}