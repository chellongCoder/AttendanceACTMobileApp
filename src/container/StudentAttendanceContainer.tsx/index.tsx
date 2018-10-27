import React, { Component } from 'react'
import { Text, View } from 'react-native'
import StudentAttendance from '../../stories/screens/StudentAttendance';
export interface Props {
    navigation : any;
}
export interface State {

}
export class StudentAttendanceContainer extends Component<Props, State> {
  render() {
    return (
      <StudentAttendance
        navigation={this.props.navigation}
      />
    )
  }
}

export default StudentAttendanceContainer;