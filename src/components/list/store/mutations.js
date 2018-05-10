// 更新编辑数据
export const updateBookDeatil = (state, payLoad) => {
    console.log('1');
    delete payLoad.__v;
    state.bookDetail = payLoad;

    console.log(state.bookDetail)
}
export const updateBookProtoType = (state, payLoad) => {
    state.bookProtoType = payLoad;
    console.log(state.bookProtoType)
}
export const updateBookList = (state, payLoad) => {
    state.bookList = payLoad;
}
export const updateConditions = (state, payLoad) => {
    console.log(payLoad, state.conditions.searchBookname);
    let {p = state.conditions.p, bookCategory = state.conditions.bookCategory, searchBookname=state.conditions.searchBookname} = payLoad;
    state.conditions = {p, bookCategory, searchBookname};
    console.log(state.conditions);
}
export const updateToken = (state, payLoad) => {
    state.token = payLoad;
}