import * as React from "react";
import AllStudent from "../../stories/screens/AllStudentInCourse";
import { Student } from "../StudentAttendanceContainer.tsx/interface";
import { connect } from "react-redux";
import { API } from "../../Common/config";
import { addNewStudent } from "./action";
import { randomString } from "../../Util/view.util";
import { Course } from "../CoursesContainer/interface";
import { View, Text } from "native-base";

export interface StudentListContainerProps {
  navigation: any;
  addNewStudent: Function;
  courseSelected: Course;
}

export interface StudentListContainerState {}
export interface Error {
  firstNameError: string;
  lastNameError: string;
  emailNameError: string;
  numberPhoneError: string;
}
class StudentListContainer extends React.Component<
  StudentListContainerProps,
  StudentListContainerState
> {
  fieldOfStudent: Array<{}>;
  student: Student;
  error: Error;
  constructor(props) {
    super(props);
    this.student = {
      studentId: "",
      firstName: "",
      lastName: "",
      email: "",
      numberPhone: "",
      avatarUrl: "",
      courseId: ""
    };
    this.error = {
      firstNameError: "",
      lastNameError: "",
      emailNameError: "",
      numberPhoneError: ""
    };
    this.fieldOfStudent = [
      {
        label: "First Name",
        onChangeText: firstName => this.onChangeFirstName(firstName),
        placeholder: "Ex: John"
      },
      {
        label: "Last Name",
        onChangeText: lastName => this.onChangeLastName(lastName),
        placeholder: "Ex: Evic"
      },
      {
        label: "Number Phone",
        onChangeText: numberPhone => this.onChangeNumberPhone(numberPhone),
        placeholder: "Ex: 0123456789"
      },
      {
        label: "Email",
        onChangeText: email => this.onChangeEmail(email),
        placeholder: "Ex: demo@gmail.com"
      }
    ];
    this.onChangeEmail = this.onChangeEmail.bind(this);
    this.onChangeFirstName = this.onChangeFirstName.bind(this);
    this.onChangeLastName = this.onChangeLastName.bind(this);
    this.onChangeNumberPhone = this.onChangeNumberPhone.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }
  onChangeEmail(email) {
    this.student.email = email;
  }
  onChangeFirstName(firstName) {
    this.student.firstName = firstName;
    console.log("error", this.error.firstNameError);
    let result = /[^0-9a-zａ-ｚ\u4e00-\u9fa5{}\s~`!@#$%^&*()_+=\-\[\];:'"<>,.?\/|\\。·？！、——‘’，；：“”（）《》……]/iu.test(
      firstName
    );
    if (result) {
      this.error.firstNameError = "";
      return;
    }
    this.error.firstNameError = "first name is invalid";
  }
  onChangeLastName(lastName) {
    this.student.lastName = lastName;
    console.log("error", this.error.lastNameError);
    let result = /[^0-9a-zａ-ｚ\u4e00-\u9fa5{}\s~`!@#$%^&*()_+=\-\[\];:'"<>,.?\/|\\。·？！、——‘’，；：“”（）《》……]/iu.test(
      lastName
    );
    if (result) {
      this.error.lastNameError = "";
      return;
    }
    this.error.lastNameError = "last name is invalid";
  }
  onChangeNumberPhone(numberPhone) {
    this.student.numberPhone = numberPhone;
    let result = /^\d{10}$/.test(numberPhone);
    if (result) {
      this.error.numberPhoneError = "";
      return;
    }
    this.error.numberPhoneError = "number phone is invalid";
  }
  onSubmit() {
    this.student.studentId = `${
      this.props.courseSelected.courseId
    }-${randomString(5)}`;
    this.student.courseId = this.props.courseSelected.courseId;
    console.log(this.student, this.error);
    if (
      this.error.firstNameError === "" &&
      this.error.lastNameError === "" &&
      this.error.numberPhoneError === ""
    ) {
      this.props.addNewStudent(this.student, API.insertNewStudent);
    }
  }
  render() {
    return (
      <AllStudent
        error={this.error}
        onSubmit={this.onSubmit}
        fieldOfStudent={this.fieldOfStudent}
        navigation={this.props.navigation}
      />
    );
  }
}

function bindAction(dispatch) {
  return {
    addNewStudent: (student, url) => dispatch(addNewStudent(student, url))
  };
}

const mapStateToProps = store => ({
  courseSelected: store.attendanceReducer.selectedCourse
});
export default connect(
  mapStateToProps,
  bindAction
)(StudentListContainer);
