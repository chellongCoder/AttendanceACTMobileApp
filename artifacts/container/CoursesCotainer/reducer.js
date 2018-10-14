import CONSTANT from './../../Common/app_constant';
const initState = {
    courses: [],
    messageCourse: '',
    studentsByIdCourse: [],
    messageStudentByCourseid: '',
    selectedCourse: {
        courseId: '',
        courseName: '',
        duration: 1,
        initDay: '',
        endDay: ''
    }
};
export default function (state = initState, action) {
    if (action.type === CONSTANT.FETCH_LIST_COURSES) {
        return Object.assign({}, state, { messageCourse: action.data.message, courses: action.data.data });
    }
    if (action.type === CONSTANT.FETCH_LISTSTUDENT_BY_COURSEID) {
        return Object.assign({}, state, { studentsByIdCourse: action.data.data, messageStudentByCourseid: action.data.message });
    }
    if (action.type === CONSTANT.SELECTED_COURSE) {
        return Object.assign({}, state, { selectedCourse: action.selectedCourse });
    }
    return state;
}
//# sourceMappingURL=reducer.js.map