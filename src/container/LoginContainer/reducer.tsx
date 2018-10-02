
export type State = {
    account : Object,
    isLogIn : boolean;
    authenToken : string;
    accountFacebook : Object; 
}

const initialState = {
    account: {},
    isLogIn: false,
    authenToken : "",
    accountFacebook : {}
};

export default function (state:State = initialState, action) {
    if (action.type === "SAVE_ACCOUNT_FB") {
        return {
            ...state,
            accountFacebook: action.accountFacebook,
        };
    }
    if (action.type === "LIST_IS_LOADING") {
        return {
            ...state,
            isLoading: action.isLoading,
        };
    }
    return state;
}
