export const API = {
  getListCourse: "http://125.212.227.42:48080/api/ext/getAllCourses",
  getStudentByCourseId: "http://125.212.227.42:48080/api/ext/StudentByIdCourse",
  insertStudent: "http://125.212.227.42:48080/api/ext/INSERTSTUDENT",
  getUserAdmin: "http://125.212.227.42:48080/api/ext/getAdminUser",
  getLessonByCourseId:
    "http://125.212.227.42:48080/api/ext/getLessonByCourseid",
  getStudentInAttendance:
    "http://125.212.227.42:48080/api/ext/getStudentInAttendance",
  insertNewLesson: "http://125.212.227.42:48080/api/ext/addNewLesson",
  insertStudentAttendance:
    "http://125.212.227.42:48080/api/ext/insertStudentAttendance",
  insertNewStudent: "http://125.212.227.42:48080/api/ext/addNewStudent",
  insertNewStaff: "http://125.212.227.42:48080/api/ext/addNewStaff"
};

export const environment = {
  testMenuEnabled: true
};

export const CourseName = {
  C: "lập trình C",
  Java: "Java",
  CCNA: "CCNA",
  PHP: "PHP"
};
