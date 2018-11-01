import React, { Component } from "react";
import { Text, View } from "react-native";
import CourseScreen from "../../stories/screens/CourseScreen";
import { getDataCourses } from "../../Services/CoursesService";
import { API } from "../../Common/config";
import { Course } from "./interface";
import { connect } from "react-redux";
import { getListCourse, getLessonByCourseId, getSelectedCourse } from "./action";
import Spinner from "react-native-loading-spinner-overlay";
import commonColor from "../../theme/variables/commonColor";
import { NavigationService } from "../../Services/NavigationService";
import commonStyles from "../../theme/variables/commonStyles";

export interface Props {
  navigation: any;
  listCourses: Array<Course>;
  getListCourse: Function;
  getLessonByCourseId: Function;
  isLoading: boolean;
  getSelectedCourse : Function;
}
export interface State {
  spinner: boolean;
}
export class CoursesContainer extends Component<Props, State> {
  data: Array<Course>;
  constructor(props) {
    super(props);
    this.data = [];
    this.state = {
      spinner: this.props.isLoading
    };
    this.getLessonByCourseId = this.getLessonByCourseId.bind(this);
    console.log("spinner", this.props.isLoading);
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
    getSelectedCourse : (course) => dispatch(getSelectedCourse(course))
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
