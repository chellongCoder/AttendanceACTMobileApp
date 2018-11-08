import CONSTANT from "../../Common/app_constant";
import { Admin } from "./interface";

export type State = {
  account: Object;
  authenToken: string;
  accountFacebook: Object;
  accountAdmin: Admin;
  isLogin: boolean;
};

const initialState = {
  account: {},
  authenToken: "",
  accountFacebook: {},
  accountAdmin: {
    username: "",
    password: ""
  },
  isLogin: false
};

export default function(state: State = initialState, action) {
  if (action.type === CONSTANT.SAVE_ACCOUNT_FB) {
    return {
      ...state,
      accountFacebook: action.account,
      isLogin: true
    };
  }
  if (action.type === "LIST_IS_LOADING") {
    return {
      ...state,
      isLoading: action.isLoading
    };
  }
  if (action.type === "RESET_ACCOUNT_FACEBOOK") {
    return {
      ...state,
      isLogin: false,
      accountFacebook: {}
    };
  }
  if (action.type === "RESET_ACCOUNT_ADMIN") {
    return {
      ...state,
      accountAdmin: {
        username: "",
        password: ""
      }
    };
  }
  if (action.type === CONSTANT.LOGIN.GET_ACCOUT_ADMIN_SUSCESS) {
    return {
      ...state,
      accountAdmin: action.data,
      isLogin: true
    };
  }
  if (action.type === CONSTANT.LOGIN.GET_ACCOUT_ADMIN_FAILURE) {
    return {
      ...state,
      accountAdmin: {}
    };
  }
  return state;
}
