import CONSTANT from "../../Common/app_constant";

const initialState = {
    listLesson: [],
    isLoading: false,
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
    return state;
}
