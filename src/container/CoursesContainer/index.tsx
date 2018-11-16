import React, { Component } from "react";
import { Text, View } from "react-native";
import CourseScreen from "../../stories/screens/CourseScreen";
import { getDataCourses } from "../../Services/CoursesService";
import { API } from "../../Common/config";
import { Course } from "./interface";
import { connect } from "react-redux";
import { getListCourse, getLessonByCourseId, getSelectedCourse, insertNewCourse } from "./action";
import Spinner from "react-native-loading-spinner-overlay";
import commonColor from "../../theme/variables/commonColor";
import { NavigationService } from "../../Services/NavigationService";
import commonStyles from "../../theme/variables/commonStyles";
import { Toast } from "native-base";

export interface Props {
  navigation: any;
  listCourses: Array<Course>;
  getListCourse: Function;
  getLessonByCourseId: Function;
  isLoading: boolean;
  getSelectedCourse: Function;
  insertNewCourse ?: Function;
}
export interface State {
  spinner: boolean;
}
export class CoursesContainer extends Component<Props, State> {
  data: Array<Course>;
  newCourse : Course;
  constructor(props) {
    super(props);
    this.data = [];
    this.state = {
      spinner: this.props.isLoading
    };
    this.newCourse = {
      courseId : "",
      courseName : "",
      duration : 0,
      initDay : null,
      endDay: null,

    };
    this.getLessonByCourseId = this.getLessonByCourseId.bind(this);
    this.submit = this.submit.bind(this);
    console.log("spinner", this.props.isLoading);
  }
  checkErrorCourseName() {
    if(this.newCourse.courseName.length<0 || this.newCourse.courseName.length>25) {
      Toast.show({
        text : "Name is invalid",
        type : "danger",
        duration : 2000,
        position : 'top'
      });
      return false;
    }
    return true;
  }
  checkDuration() {
    if (`${this.newCourse.duration}`.length===0){
      Toast.show({
        text: "Duration is invalid",
        type: "danger",
        duration: 2000,
        position: "top"
      });
      return false;
    } 
    if (!/^[0-9]*$/.test(`${this.newCourse.duration}`)) {
      Toast.show({
        text: "Duration is invalid",
        type: "danger",
        duration: 2000,
        position: "top"
      });
      return false;
    } else {
      if (parseInt(`${this.newCourse.duration}`, 10) < 0 || parseInt(`${this.newCourse.duration}`) > 1000) {
        Toast.show({
          text: "Duration is invalid",
          type: "danger",
          duration: 2000,
          position: "top"
        });
        return false;
      }
      return true;
    } 
  }
  checkDate() {
    if(!this.newCourse.initDay && !this.newCourse.endDay) {
      Toast.show({
        text: "Day is invalid",
        type: "danger",
        duration: 2000,
        position: "top"
      });
      return false;
    }
    return true;
  }
  submit(callback) {
    if(this.checkErrorCourseName() && this.checkDuration() && this.checkDate()) {
      console.log('new course', this.newCourse);
      this.props.insertNewCourse(this.newCourse, API.insertNewCourse)
      callback();
    }
  }
  componentWillMount() {
    console.log("unmout");
    if (this.props.listCourses.length === 0) {
      this.props.getListCourse();
    }
  }

  getLessonByCourseId(value: Course) {
    console.log('value', value);
    this.props.getLessonByCourseId(value.courseId);
  }

  render() {
    console.log("loadig", this.props.isLoading, "state", this.state.spinner);
    return (
      <View style={{ flex: 1 }}>
        <CourseScreen
        submit={this.submit}
        newCourse={this.newCourse}
          getSelectedCourse={this.props.getSelectedCourse}
          getLessonByCourseId={this.getLessonByCourseId}
          data={this.props.listCourses}
          navigation={this.props.navigation}
        />
        {
          this.props.isLoading ? (
            <Spinner
              visible={true}
              animation="fade"
              color={commonColor.brandPrimary}
              overlayColor="rgba(0, 0, 0, 0.6)"
              // textContent={"Loading..."}
              textStyle={commonStyles.textButton}
            />
          ) : null
        }
      </View>
    );
  }
}

function bindAction(dispatch) {
  return {
    getListCourse: () => dispatch(getListCourse()),
    getLessonByCourseId: id => dispatch(getLessonByCourseId(id)),
    getSelectedCourse : (course) => dispatch(getSelectedCourse(course)),
    insertNewCourse : (course , url) => dispatch(insertNewCourse(course, url)),
  };
}
function mapStateToProps(store) {
  return {
    listCourses: store.attendanceReducer.courses,
    isLoading: store.lessonReducer.isLoading
  };
}
export default connect(
  mapStateToProps,
  bindAction
)(CoursesContainer);
