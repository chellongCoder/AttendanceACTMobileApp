import { Course } from "./interface";
import app_constant from "../../Common/app_constant";

export type State = {
    newCourse : Course;
};

const initState = {
    newCourse : null
};

export default function (state: State = initState, action) {
    if (action.type === app_constant.COURSE.INSERT_NEW_COURSE) {
        return {
            ...state,
            newCourse : action.data
        };
    }
    return state;
}
