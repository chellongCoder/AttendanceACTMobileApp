
import React, { Component } from 'react'
import { View, Text } from 'react-native'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import StudentAttendance from '../../stories/screens/StudentAttendance';
import { Student } from './interface';
export interface Props {
  navigation : any;
  listStudent : Array<Student>
}
export interface State {

}
export class StudentAttendanceContainer extends Component<Props, State> {

  render() {
    return (
      <StudentAttendance
      listStudent={this.props.listStudent}
        navigation={this.props.navigation}
      />
    )
  }
}

const mapStateToProps = (state) => ({
  listStudent : state.lessonReducer.listStudent,
})

const mapDispatchToProps = (dispatch) => {
  return {

  }
}


export default connect(mapStateToProps, mapDispatchToProps)(StudentAttendanceContainer);