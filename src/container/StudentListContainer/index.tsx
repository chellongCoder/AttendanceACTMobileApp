import React, { Component } from "react";
import StudentListScreen from "./../../stories/screens/StudentList";
import { connect } from "react-redux";
import MD5 from "./MD5";
import { Lesson } from "../LessonContainer/interface";
import { addNewLesson } from "./action";
import { API } from "../../Common/config";

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
  listStudentByCourses: Array<{}>;
  selectedCourse: Course;
  addNewLesson : Function;
}

export interface State {}

class StudentListContainer extends Component<Props, State> {
  listStudent: Array<{}>;
  title : string;
  note : string;
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
  }
  selectedItem(student) {
    console.log("student", student);
    this.listStudent.push(student);
  }
  submitStudentInClass() {
    console.log("student list", this.listStudent);
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
    console.log("titel", this.title, 'note', this.note);
    let date = new Date().toISOString().slice(0, 19).replace('T', ' ');
    console.log('date', date);
    let lessonId = MD5(`${date}${this.title}`);
    let courseId = this.props.selectedCourse.courseId;
    console.log('courseid', courseId);
    if(lessonId!=='' && courseId!=='' && this.title!=='' && this.note!=='') {
      let lesson: Lesson = {
        courseId: courseId,
        titleLesson: this.title,
        noteLesson: this.note,
        dayLearning: date,
        lessonId: lessonId,
      }
      this.props.addNewLesson(lesson, API.insertNewLesson);
    }
  }
  render() {
    return (
      <StudentListScreen
        onSubmit={this.onSubmit}
        onChangeNote={this.onChangeNote}
        onChangeLessonTitle={this.onChangeLessonTitle}
        submitStudentInClass={this.submitStudentInClass}
        selectedItem={this.selectedItem}
        listStudentByCourses={this.props.listStudentByCourses}
        navigation={this.props.navigation}
      />
    );
  }
}

function bindAction(dispatch) {
  return {
    addNewLesson : (lesson,url) => dispatch(addNewLesson(lesson, url)),
  };
}
function mapStateToProps(store) {
  return {
    listStudentByCourses: store.attendanceReducer.studentsByIdCourse,
    selectedCourse: store.attendanceReducer.selectedCourse
  };
}
export default connect(
  mapStateToProps,
  bindAction
)(StudentListContainer);
