import React, { Component } from "react";
import StudentListScreen from "./../../stories/screens/StudentList";
import { connect } from "react-redux";

export type Course = {
    studentId : string;
    firstName : string;
    lastName : string;
    email : string;
    numberPhone : string;
    avatarUrl : string;
    courseId : string;
}

export interface Props {
  navigation: any;
  listStudentByCourses: Array<{}>;
}

export interface State {}

class StudentListContainer extends Component<Props, State> {
    listStudent
    constructor(props){
        super(props);
        this.state = {

        }
        this.selectedItem = this.selectedItem.bind(this);
    }
    selectedItem(student) {
        console.log('student', student);
    }
  render() {
    return (
      <StudentListScreen
        selectedItem={this.selectedItem}
        listStudentByCourses={this.props.listStudentByCourses}
        navigation={this.props.navigation}
      />
    );
  }
}

function bindAction(dispatch) {
  return {};
}
function mapStateToProps(store) {
  return {
      listStudentByCourses: store.courseReducer.studentsByIdCourse
  };
}
export default connect(
  mapStateToProps,
  bindAction
)(StudentListContainer);
