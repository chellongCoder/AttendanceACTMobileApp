import { Student } from "../container/StudentAttendanceContainer.tsx/interface";
import { Attendance } from "../container/StudentListContainer/interface";
import app_constant from "../Common/app_constant";

export async function postNewAttendance(list: Array<Attendance>, url: string) {
  const response = await fetch(url, {
    body: JSON.stringify(list),
    headers: {
      Accept: "application/json",
      "cache-control": "no-cache",
      "Content-type": "application/json"
    },
    method: "POST"
  }).catch(e => {
    console.log("error", e);
  });
  const data = await response.json();
  console.log("data", data);
  const action = {
    type: app_constant.LESSON.INSERT_NEW_LESSON,
    data: data.message
  };

  return Promise.resolve(action);
}

export async function postNewStudent(student: Student, url: string) {
  const response = await fetch(url, {
    body: JSON.stringify(student),
    headers: {
      Accept: "application/json",
      "cache-control": "no-cache",
      "Content-type": "application/json"
    },
    method: "POST"
  }).catch(e => {
    console.log(e);
  });
  const data = await response.json();
  console.log("data", data);
  const action = {
    type: app_constant.STUDENT.INSERT_NEW_STUDENT,
    data: data.message
  };
  return Promise.resolve(action);
}
