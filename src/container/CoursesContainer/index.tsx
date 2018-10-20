import React, { Component } from 'react'
import { Text, View } from 'react-native'
import CourseScreen from '../../stories/screens/CourseScreen';
import { getDataCourses } from '../../Services/CoursesService';
import { API } from '../../Common/config';
import { Course } from './interface';
import { connect } from 'react-redux'
import { getListCourse, getLessonByCourseId } from './action';

export interface Props {
    navigation : any;
    listCourses : Array<Course>;
    getListCourse : Function;
    getLessonByCourseId : Function;
}
export interface State {

}
export class CoursesContainer extends Component<Props, State> {
  data : Array<Course>;
  constructor(props) {
    super(props);
    this.data = [];
    this.getLessonByCourseId = this.getLessonByCourseId.bind(this);
  }   
  componentWillMount () {
    console.log('unmout');
   if(this.props.listCourses.length===0) {
     this.props.getListCourse();
   }
  }
  
  getLessonByCourseId(value : Course) {
     this.props.getLessonByCourseId(value.courseId);
  }

  render() {
    return (
     <View style={{flex : 1}}>
        <CourseScreen
          getLessonByCourseId={this.getLessonByCourseId}
          data={this.props.listCourses}
          navigation={this.props.navigation}
        />
     </View>
    )
  }
}

function bindAction(dispatch) {
  return {
    getListCourse : () => dispatch(getListCourse()),
    getLessonByCourseId : (id) => dispatch(getLessonByCourseId(id)),
  };
}
function mapStateToProps(store) {
  return {
    listCourses: store.attendanceReducer.courses,
  };
}
export default connect(
  mapStateToProps,
  bindAction
)(CoursesContainer);