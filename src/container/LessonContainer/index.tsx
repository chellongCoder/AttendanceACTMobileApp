import React, { Component } from 'react';
import LessonScreen from './../../stories/screens/LessonScreen';
import { connect } from 'react-redux'
import { Lesson } from './interface';
import commonColor from '../../theme/variables/commonColor';
import commonStyles from '../../theme/variables/commonStyles';
import { Course } from '../CoursesContainer/interface';
import { getSelectedCourse } from '../CoursesContainer/action';
import { getSelectedLesson, getStudentInAttendance } from './action';
import { API } from '../../Common/config';

export interface Props {
    navigation: any;
    listLesson : Array<Lesson>;
    courseSelected : Course;
    getSelectedLesson : Function;
    getStudentInAttendance : Function;
}
export interface State {
  isVisibleModal: boolean;
}
 class LessonContainer extends Component<Props, State> {
    markDates : Object;

    constructor(props) {
        super(props);
        this.state = {
            isVisibleModal : true,
        }
        this.markDates = {};
        this._toggleModal = this._toggleModal.bind(this);
        this.onSelectDay = this.onSelectDay.bind(this);
    }
    _toggleModal() {
        this.setState({isVisibleModal : !this.state.isVisibleModal});
    }
    componentDidMount() {
        console.log('listLesson ', this.props.listLesson);
    }
    onSelectDay(dayString) {
        for(let i=0; i<this.props.listLesson.length; i++) {
            let element = this.props.listLesson[i];
            if(element.dayLearning.includes(dayString)) {
              console.log(element);
              this.props.getSelectedLesson(element);
              this.props.getStudentInAttendance(element.lessonId, API.getStudentInAttendance);
              return;
            }
          }
    }
  render() {
     if(this.props.listLesson.length>0) {
        for (const key in this.props.listLesson) {
            if (this.props.listLesson.hasOwnProperty(key)) {
              const element: Lesson = this.props.listLesson[key];
              console.log('element', element.dayLearning);
              let splits = element.dayLearning.split(/[A-Z+]/);
              console.log(splits[0]);
              this.markDates[splits[0]] = {
                customStyles: {
                    container: {
                      backgroundColor: commonColor.brandInfo,
                    },
                    text: {
                      color: commonColor.textColorWhite,
                      fontWeight: 'bold'
                    },
                  },
              };
            }
          }
          console.log('mark date', this.markDates);
     }
    return (
      <LessonScreen 
      courseSelected={this.props.courseSelected}
      onSelectDay={this.onSelectDay}
      markDates={this.markDates}
      listLesson={this.props.listLesson}
      _toggleModal={this._toggleModal}
      isVisibleModal={this.state.isVisibleModal}
      navigation={this.props.navigation}/>
    )
  }
}

function bindAction(dispatch) {
    return {
      getSelectedLesson : (lesson) => dispatch(getSelectedLesson(lesson)),
      getStudentInAttendance : (idLesson, url) => dispatch(getStudentInAttendance(idLesson, url)),
    };
}
function mapStateToProps(store) {
    return {
        listLesson : store.lessonReducer.listLesson,
        courseSelected : store.attendanceReducer.selectedCourse
        
    };
}
export default connect(
  mapStateToProps,
  bindAction
)(LessonContainer);