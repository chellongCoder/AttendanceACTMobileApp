import React, { Component } from 'react'
import { Item, Input, Label } from 'native-base';
import { moderateScale } from 'react-native-size-matters';
import commonColor from '../theme/variables/commonColor';
export interface Props {
  navigation?: any;
  style?: any;
  onChangeText?: Function;
  onBlurInput?: Function;
  disabled? : boolean;
  defaultValueInput? : string;
}
export interface States {
    isFocus : boolean;
}
export default class InputConponent extends Component<Props, States> {
    constructor(props) {
        super(props);
        this.onFocus = this.onFocus.bind(this);
        this.onBlur = this.onBlur.bind(this);
        this.state = {
            isFocus : false
        }
    }
    onFocus() {
        this.setState({isFocus : !this.state.isFocus});
        this.props.onBlurInput && this.props.onBlurInput();
    }
    onBlur() {
        this.setState({isFocus : false})
    }
  render() {
    return (
    <Item
        floatingLabel
        style={[this.props.style,{borderColor : this.state.isFocus ? commonColor.brandInfo : null}]}
    > 
        <Label>Lesson title</Label>
        <Input 
        disabled={this.props.disabled}
        style={{fontSize : moderateScale(commonColor.DefaultFontSize)}}
        defaultValue={this.props.defaultValueInput}
        onBlur={this.onBlur}
        onChangeText={(text)=>this.props.onChangeText(text)}
        onFocus={this.onFocus}/>
    </Item>
    )
  }
}

