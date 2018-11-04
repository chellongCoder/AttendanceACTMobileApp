import React, { Component } from "react";
import { Item, Input, Label, Text } from "native-base";
import { moderateScale } from "react-native-size-matters";
import commonColor from "../theme/variables/commonColor";
import commonStyles from "../theme/variables/commonStyles";
import { Error } from "../container/AllStudentInCourseContainer";
export interface Props {
  navigation?: any;
  style?: any;
  onChangeText?: Function;
  onBlurInput?: Function;
  disabled?: boolean;
  defaultValueInput?: string;
  label: string;
  placeholder?: string;
  error?: Error;
}
export interface States {
  isFocus: boolean;
}
export default class InputConponent extends Component<Props, States> {
  constructor(props) {
    super(props);
    this.onFocus = this.onFocus.bind(this);
    this.onBlur = this.onBlur.bind(this);
    this.state = {
      isFocus: false
    };
  }
  onFocus() {
    this.setState({ isFocus: !this.state.isFocus });
    this.props.onBlurInput && this.props.onBlurInput();
  }
  onBlur() {
    this.setState({ isFocus: false });
  }
  render() {
    let error = "";
    switch (this.props.label) {
      case "First Name":
        error = this.props.error.firstNameError;
        break;
      case "Last Name":
        error = this.props.error.lastNameError;
        break;
      case "Number Phone":
        error = this.props.error.numberPhoneError;
        break;
      default:
        break;
    }
    return (
      <Item
        error={true}
        style={[
          this.props.style,
          { borderColor: this.state.isFocus ? commonColor.brandInfo : null }
        ]}
      >
        <Label style={commonStyles.buttonText}>{this.props.label}</Label>
        <Input
          placeholder={this.props.placeholder}
          placeholderTextColor={commonColor.textNote}
          disabled={this.props.disabled}
          style={{ fontSize: moderateScale(commonColor.DefaultFontSize) }}
          defaultValue={this.props.defaultValueInput}
          onBlur={this.onBlur}
          onChangeText={text => this.props.onChangeText(text)}
          onFocus={this.onFocus}
        />
        {error !== "" && !this.state.isFocus ? (
          <Text style={commonStyles.dangerTextSmall}>{error}</Text>
        ) : null}
      </Item>
    );
  }
}
