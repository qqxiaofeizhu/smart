// 更新编辑数据
export const updateBookDeatil = (state, payLoad) => {
    payLoad.isleave = payLoad.isleave ?  1 : 0;
    delete payLoad.__v;
    state.bookDetail = payLoad;
}
export const updateBookProtoType = (state, payLoad) => {
    state.bookProtoType = payLoad;
}
export const updateBookList = (state, payLoad) => {
    state.bookList = payLoad;
}
export const updateConditions = (state, payLoad) => {
    state.conditions = payLoad;
}
export const updateToken = (state, payLoad) => {
    state.token = payLoad;
}