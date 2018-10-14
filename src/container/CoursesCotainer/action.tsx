import CONSTANT from './../../Common/app_constant';
import { ThunkAction } from 'redux-thunk';


export async function getDataCourses(url : string): Promise {
    const response = await fetch(url)
        .catch(error => {
            console.error(error);
        });
        console.log('response');
    const data = await response.json();
    console.log('data', data);
    let action = {
        type: CONSTANT.FETCH_LIST_COURSES,
        data
    }
    return Promise.all([Promise.resolve(action)]);
    // return {
    //     type: CONSTANT.FETCH_LIST_COURSES,
    //     data
    // }
}
export async function getStudentByCourseId(url : string, courseId : string) : Promise {
    console.log(url, courseId);
    const response = await fetch(url, {
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
    const data = await response.json();
    let action = {
        type: CONSTANT.FETCH_LISTSTUDENT_BY_COURSEID,
        data
    }
    return Promise.all([Promise.resolve(action)]);
} 
export function fetchListCourses(url) : ThunkAction{
    console.log('url', url);
    const log = getDataCourses(url);
    return dispatch => {    
        log.then(result => {
            console.log(result[0]);
            dispatch(result[0]);
        })
        // dispatch(getDataCourses(url));
    }
}

export function fetchListStudentByCourseId(url, courseId, selectedCourse) : ThunkAction {
    console.log("url", url);
    const log = getStudentByCourseId(url, courseId);
    return dispatch => {
        log.then(result => {
            console.log(result[0]);
            dispatch(result[0]);
            dispatch({
                type : CONSTANT.SELECTED_COURSE,
                selectedCourse
            })
        })
        // dispatch(getDataCourses(url));
    }
}

