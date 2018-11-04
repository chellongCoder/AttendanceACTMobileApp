import { combineReducers } from "redux";
import { reducer as formReducer } from "redux-form";

import homeReducer from "../container/HomeContainer/reducer";
import loginReducer from "./../container/LoginContainer/reducer";
import attendanceReducer from "./../container/AttendanceContainer/reducer";
import lessonReducer from "./../container/LessonContainer/reducer";
import studentListReducer from "./../container/StudentListContainer/reducer";
import studentReducer from "./../container/AllStudentInCourseContainer/reducer";
export default combineReducers({
  formReducer,
  homeReducer,
  loginReducer,
  attendanceReducer,
  lessonReducer,
  studentListReducer,
  studentReducer
});
