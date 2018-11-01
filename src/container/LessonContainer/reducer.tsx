import CONSTANT from "../../Common/app_constant";

const initialState = {
    listLesson: [],
    isLoading: false,
    selectedLesson : {},
    listStudent : [],
};

export default function (state = initialState, action) {
    if (action.type === CONSTANT.LESSON.LESSON_BY_COURSE_ID) {
        return {
            ...state,
            listLesson: action.data,
        };
    }
    if (action.type === CONSTANT.iS_LOADING) {
        return {
            ...state,
            isLoading: action.isLoading,
        };
    }
    if (action.type === CONSTANT.LESSON.GET_SELECTED_LESSON) {
        return {
            ...state,
            selectedLesson : action.lesson
        };
    }
    if(action.type === CONSTANT.LESSON.GET_STUDENT_ATTENDANCE) {
        return {
            ...state,
            listStudent : action.listStudent
        }
    }
    return state;
}
