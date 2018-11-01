import CONSTANT from "./../Common/app_constant";
import app_constant from "./../Common/app_constant";
import { Lesson } from "../container/LessonContainer/interface";

export async function fetchLessonByCourseId(id: string, url: string): Promise {
  const response = await fetch(url, {
    body: JSON.stringify({ courseId: id }),
    headers: {
      Accept: "application/json",
      "cache-control": "no-cache",
      "Content-type": "application/json"
    },
    method: "POST"
  }).catch(e => {
    console.log("eorre", e);
  });
  const data = await response.json();
  console.log("data", data);
  let action = {
      type : CONSTANT.LESSON.LESSON_BY_COURSE_ID,
      data : data.data
  }
  return Promise.all([Promise.resolve(action)]);
}

export async function fetchStudentInAttendance(id : string, url : string) {
  const response = await fetch(url, {
    body : JSON.stringify({lessonId : id}),
    headers: {
      Accept: "application/json",
      "cache-control": "no-cache",
      "Content-type": "application/json"
    },
    method: "POST"
  }).catch(e => {
    console.log("eorre", e);
  });
  const data = await response.json();
  console.log("data", data);
  const action = {
    type : app_constant.LESSON.GET_STUDENT_ATTENDANCE,
    listStudent : data.data
  }

  return Promise.all([Promise.resolve(action)]);
}

export async function postNewLesson(lesson : Lesson, url : string) {
  const response = await fetch(url, {
    body: JSON.stringify(lesson),
    headers: {
      Accept: "application/json",
      "cache-control": "no-cache",
      "Content-type": "application/json"
    },
    method: "POST"
  }).catch(e => {
    console.log('error', e);
  });
  const data = await response.json();
  console.log('data', data);
  const action = {
    type: app_constant.LESSON.INSERT_NEW_LESSON,
    data : data.message,
  }

  return Promise.resolve(action);
}