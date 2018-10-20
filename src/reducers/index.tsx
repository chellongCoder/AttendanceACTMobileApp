import { combineReducers } from "redux";
import { reducer as formReducer } from "redux-form";

import homeReducer from "../container/HomeContainer/reducer";
import loginReducer from "./../container/LoginContainer/reducer"; 
import attendanceReducer from './../container/AttendanceContainer/reducer';
import lessonReducer from './../container/LessonContainer/reducer';
export default combineReducers({
  formReducer,
  homeReducer,
  loginReducer,
  attendanceReducer,
  lessonReducer
});

