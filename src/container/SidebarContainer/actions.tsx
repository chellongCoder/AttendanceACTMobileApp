import { getDataCourses } from "../../Services/CoursesService";
import { API } from "../../Common/config";
import { ThunkAction } from "redux-thunk";

export function resetAccountFB() {
  console.log("reset");
  return dispatch => {
    dispatch({
      type: "RESET_ACCOUNT_FACEBOOK"
    });
  };
}
export function resetAccountAdmin(): ThunkAction {
  console.log("reset1");
  return dispatch => {
    dispatch({
      type: "RESET_ACCOUNT_ADMIN"
    });
  };
}
export function resetCourses(): ThunkAction {
  console.log("reset1");
  return dispatch => {
    dispatch({
      type: "RESET_ACCOUNT_ADMIN"
    });
  };
}

export function getListCourse(): ThunkAction {
  const log = getDataCourses(API.getListCourse);
  log.then(result => {
    console.log("result", result[0].data.data);
    this.data = result[0].data.data;
  });
  return dispatch => {
    log.then(result => {
      console.log(result[0]);
      dispatch(result[0]);
    });
  };
}
