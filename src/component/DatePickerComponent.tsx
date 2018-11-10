import React, { Component } from "react";
import {
  Container,
  Header,
  Content,
  DatePicker,
  Text,
  View
} from "native-base";
import { StyleSheet } from "react-native";
export interface Props {
  onDateChange: Function;
  placeholder: string;
}
export interface State {
  chosenDate: Date;
}
export default class DatePickerComponent extends Component<Props, State> {
  constructor(props) {
    super(props);
    this.state = { chosenDate: new Date() };
    this.setDate = this.setDate.bind(this);
  }
  setDate(newDate) {
    this.setState({ chosenDate: newDate });
  }
  render() {
    return (
      <Container style={styles.container}>
        <View style={styles.picker}>
          <Text>{this.props.placeholder}</Text>
          <DatePicker
            defaultDate={new Date()}
            minimumDate={new Date(2019, 12, 30)}
            maximumDate={new Date(2018, 12, 31)}
            locale={"vi"}
            timeZoneOffsetInMinutes={undefined}
            modalTransparent={false}
            animationType={"fade"}
            androidMode={"default"}
            placeHolderText={new Date().toString().substr(4, 12)}
            textStyle={{ color: "green" }}
            placeHolderTextStyle={{ color: "#d3d3d3" }}
            onDateChange={date => this.props.onDateChange(date)}
          />
        </View>
      </Container>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "flex-start"
  },
  picker: {
    flexDirection: "row",
    alignItems: "center"
  }
});
