import { combineReducers } from "redux";
import { reducer as formReducer } from "redux-form";
import homeReducer from "../container/HomeContainer/reducer";
import loginReducer from "./../container/LoginContainer/reducer";
import courseReducer from './../container/CoursesCotainer/reducer';
export default combineReducers({
    formReducer,
    homeReducer,
    loginReducer,
    courseReducer,
});
//# sourceMappingURL=index.js.map