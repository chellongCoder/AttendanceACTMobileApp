import React, { Component } from 'react'
import { Text, View } from 'react-native'
export interface Props {
    navigation: any;
}
export interface State {

}
export class CourseScreen extends Component<Props, State> {
  render() {
    return (
      <View>
        <Text> textInComponent </Text>
      </View>
    )
  }
}

export default CourseScreen;