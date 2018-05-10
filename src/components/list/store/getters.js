export const getBookListModel = (state) => {
    console.log(state.bookDetail)
    return state.bookDetail;  
}
export const getBookProtoType = (state) => {
    return state.bookProtoType
}
export const getBookListData = (state) => {
    return state.bookList;
}

export const getTokens = (state) => {
    return state.token;
}
export const getConditions = (state) => {
    return state.conditions
}