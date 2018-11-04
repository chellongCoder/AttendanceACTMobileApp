import { Lesson } from "../LessonContainer/interface";
import app_constant from "../../Common/app_constant";
import { postNewLesson } from "./../../Services/LessonService";
import { Attendance } from "./interface";
import { postNewAttendance } from "../../Services/ListStudentServices";
import { NavigationService } from "../../Services/NavigationService";
import { Toast } from "native-base";
export function validateAddLesson(lesson: Lesson) {}

export function addNewLesson(lesson: Lesson, url: string) {
  console.log(lesson);
  return dispatch => {
    const log = postNewLesson(lesson, url)
      .then(result => {
        if (result.data === "success") {
          dispatch({
            ...result,
            newLesson: lesson
          });
        } else {
          dispatch(result);
          Toast.show({
            type: "warning",
            text: "You have insert this lesson",
            duration: 2000,
            position: "top",
            textStyle: { textAlign: "left" }
          });
        }
      })
      .catch(error => {
        console.log("error", error);
      });
  };
}
export function submitStudentAttendance(data: Array<Attendance>, url: string) {
  console.log(data);
  return dispatch => {
    const log = postNewAttendance(data, url)
      .then(result => {
        console.log("result", result);
        if (result.message == "success") {
          NavigationService.goBack();
        }
      })
      .catch(error => {
        console.log("error", error);
      });
  };
}

export function resetNewLesson() {
  return {
    type: app_constant.LESSON.RESET_NEWLESSON_MESS
  };
}
