import CONSTANT from "../../Common/app_constant";
import { Admin } from "./interface";

export type State = {
    account : Object,
    isLogIn : boolean;
    authenToken : string;
    accountFacebook : Object; 
    accountAdmin : Admin;
}

const initialState = {
    account: {},
    isLogIn: false,
    authenToken : "",
    accountFacebook : {},
    accountAdmin : {
        username : '',
        password : '',
    }
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
    if(action.type === CONSTANT.LOGIN.GET_ACCOUT_ADMIN_SUSCESS) {
        return {
            ...state,
            accountAdmin : action.data,
        }
    }
    if(action.type === CONSTANT.LOGIN.GET_ACCOUT_ADMIN_FAILURE) {
        return {
            ...state,
            accountAdmin : {}
        }
    }
    return state;
}
