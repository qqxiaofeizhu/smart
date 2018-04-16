// 更新编辑数据
export const updateUserMessage = (state, payLoad) => {
    state.userMessage = payLoad || {username: '', admin: 0};
}
/**
 * 更新所有的用户
 */
export const updateAllUsers = (state, payLoad) => {
    state.variousUsers = payLoad;
}