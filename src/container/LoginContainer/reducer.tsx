import CONSTANT from "../../Common/app_constant";

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
    if (action.type === CONSTANT.SAVE_ACCOUNT_FB) {
        return {
            ...state,
            accountFacebook: action.account,
        };
    }
    if (action.type === "LIST_IS_LOADING") {
        return {
            ...state,
            isLoading: action.isLoading,
        };
    }
    if(action.type === "RESET_ACCOUNT_FACEBOOK") {
        return {
            ...state,
            accountFacebook : {}
        }
    }
    return state;
}
