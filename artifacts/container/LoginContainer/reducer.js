const initialState = {
    account: {},
    isLogIn: false,
    authenToken: "",
    accountFacebook: {}
};
export default function (state = initialState, action) {
    if (action.type === "SAVE_ACCOUNT_FB") {
        return Object.assign({}, state, { accountFacebook: action.accountFacebook });
    }
    if (action.type === "LIST_IS_LOADING") {
        return Object.assign({}, state, { isLoading: action.isLoading });
    }
    if (action.type === "RESET_ACCOUNT_FACEBOOK") {
        return Object.assign({}, state, { accountFacebook: {} });
    }
    return state;
}
//# sourceMappingURL=reducer.js.map