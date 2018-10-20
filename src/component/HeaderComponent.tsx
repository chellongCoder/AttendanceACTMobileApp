import React, { Component } from "react";
import {
  View,
  Text,
  Header,
  Container,
  Left,
  Right,
  Body,
  Icon,
  Button,
  Title,
  Card,
  List,
  ListItem,
  CardItem,
  Content
} from "native-base";
import { scale, verticalScale, moderateScale } from "react-native-size-matters";
import { StyleSheet } from "react-native";
export interface Props {
  navigation: any;
  left?: any;
  body?: any;
  right?: any;
  style? : any;
}
export interface States {}
export default class HeaderComponent extends Component<Props, States> {
  render() {
    return (
        <Header 
        style={[
          styles.header,
          this.props.style
        ]}
        >
        {this.props.body ? (
          <Left style={{ flex: 1, flexWrap: 'nowrap' }}>
            {this.props.left}
          </Left>
        ) : <Left style={{ flex: 7 / 10, flexWrap: 'nowrap' }}>
            {this.props.left}
          </Left>}

        {this.props.body ? (
          <Body style={{ flex: 1 }}>
            {this.props.body}
          </Body>
        ) : null}

        {this.props.body ? (
          <Right style={{ flex: 1, }}>
            {this.props.right}
          </Right>
        ) : <Right style={{ flex: 3 / 10, }}>
            {this.props.right}
          </Right>}
        </Header>
    );
  }
}

const styles = StyleSheet.create({
  header : {
    height: moderateScale(70),
    borderBottomWidth: moderateScale(0),
    shadowOffset: { width: moderateScale(2), height: moderateScale(2) },
    shadowOpacity: moderateScale(0.5),
    shadowRadius: moderateScale(10),
    elevation: moderateScale(1),
    marginBottom: 2,
  }
});