import CONSTANT from './../../Common/app_constant';
import {Course} from './../StudentListContainer'
export function saveAccountFB(account : Object) {
    return dispatch => {
        dispatch({
            type: 'SAVE_ACCOUNT_FB',
            accountFacebook: account
        })
    }
}

export async function insertStudent(url: string, student : Course): Promise {
    const response = await fetch(
     url,
      {
        body: JSON.stringify(student),
        headers: {
          Accept: "application/json",
          "cache-control": "no-cache",
          "Content-type": "application/json"
        },
        method: "POST"
      }
    ).catch(error => {
      console.log(error);
    });
    console.log('response');
    const data = await response.json();
    console.log('data', data);

    return Promise.all([Promise.resolve(data)]);
    // return {
    //     type: CONSTANT.FETCH_LIST_COURSES,
    //     data
    // }
}
export function fetchListStudentByCourseId(url, account): ThunkAction {
    console.log("url", url, "student", account);
    const log = insertStudent(url, account);
    return dispatch => {
        log.then(result => {
            dispatch({
                type: CONSTANT.SAVE_ACCOUNT_FB,
                account
            })
        })
        // dispatch(getDataCourses(url));
    }
}