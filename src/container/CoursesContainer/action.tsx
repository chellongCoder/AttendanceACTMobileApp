import CourseServices, { getDataCourses } from "../../Services/CoursesService";
import { API } from "../../Common/config";
import { ThunkAction } from "redux-thunk";
import { fetchLessonByCourseId } from './../../Services/LessonService';
import { loadingLesson } from "../LessonContainer/action";
import { NavigationService } from "../../Services/NavigationService";
import { Course, Course } from "./interface";
import app_constant from "../../Common/app_constant";
import { showMessage } from "../../Util/view.util";
export function getListCourse(): ThunkAction {
  const log = getDataCourses(API.getListCourse);
  log.then((result) => {
      console.log('result', result[0].data.data);
      this.data = result[0].data.data;
  });
  return dispatch => {
      log.then(result => {
          console.log(result[0]);
          dispatch(result[0]);
      })
  }
}

export function getLessonByCourseId(id : string) : ThunkAction {   
    return dispatch => {
        dispatch(loadingLesson(true));
        const log = fetchLessonByCourseId(id, API.getLessonByCourseId);
        log.then((result) => {
            console.log('result', result);
            dispatch(result[0]);
            if(result) {
                setTimeout(() => {
                    NavigationService.navigate("Lesson");
                    dispatch(loadingLesson(false));
                },0);
            }
        })
    }
}
export function insertNewCourse(course: Course, url : string): ThunkAction {
    return dispatch => {
        const log = CourseServices.insertNewCourse(course, url);
        log.then((result) => {
            console.log('result', result);
            dispatch(result);
            showMessage('Insert sucess', 'success', 2000);
        })
        .catch((e) => {
            showMessage("error", 'danger', 2000);
        })
    }
}

export function getSelectedCourse(selectedCourse : Course) {
    return dispatch => {
        dispatch({
            type : app_constant.SELECTED_COURSE,
            selectedCourse
        })
    }
}