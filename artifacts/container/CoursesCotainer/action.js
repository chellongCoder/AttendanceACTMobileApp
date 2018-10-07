var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import CONSTANT from './../../Common/app_constant';
export function getDataCourses(url) {
    return __awaiter(this, void 0, void 0, function* () {
        const response = yield fetch(url)
            .catch(error => {
            console.error(error);
        });
        console.log('response');
        const data = yield response.json();
        console.log('data', data);
        let action = {
            type: CONSTANT.FETCH_LIST_COURSES,
            data
        };
        return Promise.all([Promise.resolve(action)]);
        // return {
        //     type: CONSTANT.FETCH_LIST_COURSES,
        //     data
        // }
    });
}
export function getStudentByCourseId(url, courseId) {
    return __awaiter(this, void 0, void 0, function* () {
        console.log(url, courseId);
        const response = yield fetch(url, {
            body: JSON.stringify({ "courseId": courseId }),
            headers: {
                Accept: "application/json",
                "cache-control": "no-cache",
                "Content-type": "application/json"
            },
            method: "POST"
        }).catch(error => {
            console.log(error);
        });
        const data = yield response.json();
        let action = {
            type: CONSTANT.FETCH_LISTSTUDENT_BY_COURSEID,
            data
        };
        return Promise.all([Promise.resolve(action)]);
    });
}
export function fetchListCourses(url) {
    console.log('url', url);
    const log = getDataCourses(url);
    return dispatch => {
        log.then(result => {
            console.log(result[0]);
            dispatch(result[0]);
        });
        // dispatch(getDataCourses(url));
    };
}
export function fetchListStudentByCourseId(url, courseId, selectedCourse) {
    console.log("url", url);
    const log = getStudentByCourseId(url, courseId);
    return dispatch => {
        log.then(result => {
            console.log(result[0]);
            dispatch(result[0]);
            dispatch({
                type: CONSTANT.SELECTED_COURSE,
                selectedCourse
            });
        });
        // dispatch(getDataCourses(url));
    };
}
//# sourceMappingURL=action.js.map