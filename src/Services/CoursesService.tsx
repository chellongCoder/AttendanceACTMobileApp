import CONSTANT from "../Common/app_constant";

export async function getDataCourses(url: string): Promise {
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
    // return action;

}

export async function getStudentByCourseId(url: string, courseId: string): Promise {
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