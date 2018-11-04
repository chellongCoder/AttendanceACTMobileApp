import React, { Component } from "react";
import StudentListScreen from "./../../stories/screens/StudentList";
import { connect } from "react-redux";
import MD5 from "./MD5";
import { Lesson } from "../LessonContainer/interface";
import {
  addNewLesson,
  submitStudentAttendance,
  resetNewLesson
} from "./action";
import { API } from "../../Common/config";
import { Student } from "../StudentAttendanceContainer.tsx/interface";

export type Course = {
  studentId: string;
  firstName: string;
  lastName: string;
  email: string;
  numberPhone: string;
  avatarUrl: string;
  courseId: string;
};

export interface Props {
  navigation: any;
  listStudentByCourses: Array<Student>;
  selectedCourse: Course;
  addNewLesson: Function;
  newlesson: Lesson;
  insertMessage: string;
  submitStudentAttendance: Function;
  resetNewLesson: Function;
}

export interface State {}

class StudentListContainer extends Component<Props, State> {
  listStudent: Array<Student>;
  title: string;
  note: string;
  constructor(props) {
    super(props);
    this.state = {};
    this.listStudent = [];
    this.title = "";
    this.note = "";
    this.selectedItem = this.selectedItem.bind(this);
    this.submitStudentInClass = this.submitStudentInClass.bind(this);
    this.onChangeLessonTitle = this.onChangeLessonTitle.bind(this);
    this.onChangeNote = this.onChangeNote.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.unSelectedItem = this.unSelectedItem.bind(this);
  }
  selectedItem(student) {
    console.log("student", student);
    this.listStudent.push(student);
  }
  unSelectedItem(id: string, key: number) {
    console.log("id student", id, key);
    this.listStudent.splice(key, 1);
    // for (let index = 0; index < this.listStudent.length; index++) {
    //   const element = this.listStudent[index];
    //   if(element.studentId === student.studentId) {
    //     this.listStudent.splice(index, 1);
    //     break;
    //   }
    // }
  }
  submitStudentInClass() {
    console.log("student list", this.listStudent);
    let listAttendance = [];
    for (let index = 0; index < this.listStudent.length; index++) {
      const element: Student = this.listStudent[index];
      listAttendance.push({
        lessonId: this.props.newlesson.lessonId,
        studentId: element.studentId
      });
    }
    this.props.submitStudentAttendance(
      listAttendance,
      API.insertStudentAttendance
    );
    this.props.resetNewLesson();
  }
  onChangeLessonTitle(text) {
    console.log(text);
    this.title = text;
  }
  onChangeNote(text) {
    console.log(text);
    this.note = text;
  }

  onSubmit() {
    console.log("titel", this.title, "note", this.note);
    let date = new Date()
      .toISOString()
      .slice(0, 11)
      .replace("T", " ");
    console.log("date", date);
    let lessonId = MD5(`${date}${this.title}`);
    let courseId = this.props.selectedCourse.courseId;
    console.log("courseid", courseId);
    if (
      lessonId !== "" &&
      courseId !== "" &&
      this.title !== "" &&
      this.note !== ""
    ) {
      let lesson: Lesson = {
        courseId: courseId,
        titleLesson: this.title,
        noteLesson: this.note,
        dayLearning: date,
        lessonId: lessonId
      };
      this.props.addNewLesson(lesson, API.insertNewLesson);
    }
  }
  render() {
    return (
      <StudentListScreen
        insertMessage={this.props.insertMessage}
        onSubmit={this.onSubmit}
        onChangeNote={this.onChangeNote}
        onChangeLessonTitle={this.onChangeLessonTitle}
        submitStudentInClass={this.submitStudentInClass}
        selectedItem={this.selectedItem}
        unSelectedItem={this.unSelectedItem}
        listStudentByCourses={this.props.listStudentByCourses}
        navigation={this.props.navigation}
      />
    );
  }
}

function bindAction(dispatch) {
  return {
    addNewLesson: (lesson, url) => dispatch(addNewLesson(lesson, url)),
    submitStudentAttendance: (list, url) =>
      dispatch(submitStudentAttendance(list, url)),
    resetNewLesson: () => dispatch(resetNewLesson())
  };
}
function mapStateToProps(store) {
  return {
    listStudentByCourses: store.attendanceReducer.studentsByIdCourse,
    selectedCourse: store.attendanceReducer.selectedCourse,
    insertMessage: store.studentListReducer.insertMessage,
    newlesson: store.studentListReducer.newlesson
  };
}
export default connect(
  mapStateToProps,
  bindAction
)(StudentListContainer);
