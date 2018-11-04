import React, { Component } from "react";
import { ListItem, Text, Icon, Left, Body, Right } from "native-base";
import { Course } from "./../../../container/StudentListContainer";
export interface Props {
  navigation: any;
  student: Course;
  selectedItem: Function;
  unSelectedItem: Function;
  index?: number;
  left: any;
  right: any;
}
export interface State {
  selected: boolean;
}

export default class ListItemComponent extends Component<Props, State> {
  constructor(props) {
    super(props);
    this.state = {
      selected: false
    };
    this.onPress = this.onPress.bind(this);
  }
  onPress(student) {
    if (this.state.selected) {
      console.log(this.props.index);
      this.props.unSelectedItem(student, this.props.index);
    } else {
      this.props.selectedItem(student);
    }
    this.setState({ selected: !this.state.selected });
  }
  render() {
    return (
      <ListItem
        key={this.props.index}
        onPress={() => this.onPress(this.props.student)}
        selected={this.state.selected}
      >
        <Left>{this.props.left}</Left>
        <Body />
        <Right>{this.state.selected ? this.props.right : null}</Right>
      </ListItem>
    );
  }
}
