import { combineReducers } from "redux";
import { reducer as formReducer } from "redux-form";

import homeReducer from "../container/HomeContainer/reducer";
import loginReducer from "./../container/LoginContainer/reducer"; 
export default combineReducers({
  formReducer,
  homeReducer,
  loginReducer
});

// export const combineReducers({
//   homeReducer,
//   loginReducer
// })