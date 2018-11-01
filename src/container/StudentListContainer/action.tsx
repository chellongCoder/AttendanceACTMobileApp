import { Lesson } from "../LessonContainer/interface";
import app_constant from "../../Common/app_constant";
import { postNewLesson} from './../../Services/LessonService';
export function validateAddLesson(lesson : Lesson) {

}

export function addNewLesson(lesson : Lesson, url : string) {
    console.log(lesson);
    return dispatch => {
        const log = postNewLesson(lesson, url)
        .then((result)=>{
            console.log(result);
        })
    }
}