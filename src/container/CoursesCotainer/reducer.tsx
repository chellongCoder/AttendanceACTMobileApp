import CONSTANT from './../../Common/app_constant';
export type Course = {
    courseId: string;
    courseName: string;
    duration: number;
    initDay: string;
    endDay: string;
}
export type State = {
    courses : Array<{}>;
    messageCourse : string;
    studentsByIdCourse : Array<{}>;
    messageStudentByCourseid : string;
    selectedCourse : Course;
}

const initState = {
    courses : [],
    messageCourse: '' ,
    studentsByIdCourse: [],
    messageStudentByCourseid: '',
    selectedCourse : {
        courseId: '',
        courseName: '',
        duration: 1,
        initDay: '',
        endDay: '' 
    }
}

export default function (state:State = initState, action) {
    if (action.type === CONSTANT.FETCH_LIST_COURSES) {
        return {
            ...state,
            messageCourse : action.data.message,
            courses: action.data.data,
        };
    }
    if(action.type === CONSTANT.FETCH_LISTSTUDENT_BY_COURSEID) {
        return {
            ...state,
            studentsByIdCourse: action.data.data,
            messageStudentByCourseid: action.data.message, 
        }
    }
    if (action.type === CONSTANT.SELECTED_COURSE) {
        return {
            ...state,
            selectedCourse: action.selectedCourse
        }
    }
    return state;
}