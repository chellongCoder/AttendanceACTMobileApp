import React, { Component } from 'react'
import { Text, View } from 'react-native'
import CourseScreen from '../../stories/screens/CourseScreen';
export interface Props {
    navigation : any;
}
export interface State {

}
export default class CoursesContainer extends Component<Props, State> {
  render() {
    return (
      <CourseScreen
        navigation={this.props.navigation}
      />
    )
  }
}