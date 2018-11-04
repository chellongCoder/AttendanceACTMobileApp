import React, { Component } from "react";
import ModalScreen from "./../../stories/screens/AttendaceScreen";
import { getDataCourses } from "./fetchData";
import { fetchListCourses, fetchListStudentByCourseId } from "./action";
import { API } from "./../../Common/config";
import { connect } from "react-redux";
import { Course } from "./reducer";
export interface Props {
  navigation: any;
  fetchListCourses: Function;
  listCourses: Array<{}>;
  messageFetchCourses: string;
  isVisibleModal: boolean;
  _toggleModal: Function;
  fetchListStudentByCourseId: Function;
  messageStudentByCourseid: string;
}

const initCourse = {
  courseId: "",
  courseName: "",
  duration: 1,
  initDay: "",
  endDay: ""
};
export interface State {
  selectedValue: string;
}
class ModalContainer extends Component<Props, State> {
  selectedCourse: Course;
  constructor(props) {
    super(props);
    this.selectedCourse = initCourse;
    this.state = {
      selectedValue: ""
    };
    this.onValueChange = this.onValueChange.bind(this);
    this.onPress = this.onPress.bind(this);
  }
  onValueChange(value) {
    console.log(value);
    let item = element => {
      if (element.courseId === value) {
        this.selectedCourse = element;
        return true;
      }
      return false;
    };
    let arr = this.props.listCourses.some(item);
    this.setState({ selectedValue: value });
    console.log("element", this.selectedCourse);
    this.props.fetchListStudentByCourseId(
      API.getStudentByCourseId,
      this.selectedCourse.courseId,
      this.selectedCourse
    );
    this.props._toggleModal();
    setTimeout(() => {
      this.props.navigation.navigate("StudentList");
    }, 500);
    console.log(arr);
  }

  componentDidMount() {
    setTimeout(() => {
      console.log("did moout", this.props.listCourses);
      if (this.props.listCourses.length === 0) {
        console.log("asd");
        this.props.fetchListCourses(API.getListCourse);
      }
    }, 1000);
  }
  onPress() {
    console.log("press");
    this.props.fetchListCourses(API.getListCourse);
  }
  render() {
    console.log("arr", this.props.listCourses);
    return (
      <ModalScreen
        _toggleModal={this.props._toggleModal}
        isVisibleModal={this.props.isVisibleModal}
        messageFetchCourses={this.props.messageFetchCourses}
        selectedValue={this.state.selectedValue}
        listCourses={this.props.listCourses}
        onPress={this.onPress}
        onValueChange={this.onValueChange}
        navigation={this.props.navigation}
      />
    );
  }
}

function bindAction(dispatch) {
  return {
    fetchListCourses: url => dispatch(fetchListCourses(url)),
    fetchListStudentByCourseId: (url, courseId, selectedCourse) =>
      dispatch(fetchListStudentByCourseId(url, courseId, selectedCourse))
  };
}
function mapStateToProps(store) {
  return {
    listCourses: store.attendanceReducer.courses,
    messageFetchCourses: store.attendanceReducer.messageCourse,
    messageStudentByCourseid: store.attendanceReducer.messageStudentByCourseid
  };
}
export default connect(
  mapStateToProps,
  bindAction
)(ModalContainer);
