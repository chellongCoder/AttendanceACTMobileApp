import CONSTANT from "./../Common/app_constant";

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
