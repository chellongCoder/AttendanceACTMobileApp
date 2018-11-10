import app_constant from "../../Common/app_constant";
import { Lesson } from "./interface";
import { fetchStudentInAttendance } from "../../Services/LessonService";
import { ThunkAction } from "redux-thunk";
import { getStudentByCourseId } from "../../Services/CoursesService";
import { NavigationService } from "../../Services/NavigationService";
import { Toast } from "native-base";

export function loadingLesson(bool: boolean) {
  return {
    type: app_constant.iS_LOADING,
    isLoading: bool
  };
}

export function getSelectedLesson(lesson: Lesson) {
  return {
    type: app_constant.LESSON.GET_SELECTED_LESSON,
    lesson
  };
}

export function getStudentInAttendance(id: string, url: string): ThunkAction {
  return dispatch => {
    const log = fetchStudentInAttendance(id, url).then(result => {
      console.log("result", result);
      dispatch(result[0]);
    });
  };
}
export function fetchListStudentByCourseId(url, courseId): ThunkAction {
  console.log("url", url);
  return dispatch => {
    const log = getStudentByCourseId(url, courseId)
      .then(result => {
        console.log(result[0]);
        dispatch(result[0]);
        if (result[0]) {
          NavigationService.navigate("AllStudentInCourse");
        }
      })
      .catch(e => {
        console.log(e);
      });
  };
}
