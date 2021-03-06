import { Student } from "../StudentAttendanceContainer.tsx/interface";
import { postNewStudent } from "../../Services/ListStudentServices";
import { Toast } from "native-base";
import app_constant from "../../Common/app_constant";

export function addNewStudent(student: Student, url: string) {
  console.log("student", student);
  return dispatch => {
    const log = postNewStudent(student, url)
      .then(result => {
        if (result.data === "success") {
          dispatch({
            ...result,
            student: student
          });
          dispatch({
            type: app_constant.ATTENDANCE.INSERT_NEW_STUDENT,
            data: student
          });
          Toast.show({
            type: "success",
            text: "Success",
            duration: 2000,
            position: "bottom",
            textStyle: { textAlign: "left" },
            buttonText: "OK"
          });
        } else {
          dispatch({
            ...result
          });
          Toast.show({
            type: "warning",
            text: "You have insert this lesson",
            duration: 2000,
            position: "top",
            textStyle: { textAlign: "left" }
          });
        }
      })
      .catch(e => {
        console.log(e);
      });
  };
}
