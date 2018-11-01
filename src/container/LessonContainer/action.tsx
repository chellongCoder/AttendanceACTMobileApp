import app_constant from "../../Common/app_constant";
import { Lesson } from "./interface";
import { fetchStudentInAttendance } from "../../Services/LessonService";
import { ThunkAction } from "redux-thunk";

export function loadingLesson(bool : boolean) {
    return {
        type : app_constant.iS_LOADING,
        isLoading : bool
    }
}

export function getSelectedLesson(lesson : Lesson) {
    return {
        type : app_constant.LESSON.GET_SELECTED_LESSON,
        lesson
    }
}

export function getStudentInAttendance(id : string, url : string) : ThunkAction {
   return dispatch => {
    const log = fetchStudentInAttendance(id , url)
    .then((result)=>{
        console.log('result', result);
        dispatch(result[0]);
    })
   }
}