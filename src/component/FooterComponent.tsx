import React, { Component } from 'react'
import { Footer, Button, Text, Left, Body, Right } from 'native-base';
import { moderateScale } from 'react-native-size-matters';
import { StyleSheet } from 'react-native';
import commonColor from '../theme/variables/commonColor';
export interface Props {
  navigation: any;
  style? : any;
  left? : any;
    body ? : any;
    right ? : any;
}
export interface States {}
export default class FooterComponent extends Component<Props, States> {
  render() {
    return (
     <Footer style={[
       styles.footer,
        this.props.style,
     ]}>
       {this.props.left ? ( <Left style={{flex : 1}}>
            {this.props.left}
        </Left>) : null}
        {this.props.body ? (<Body style={{flex : 1, justifyContent : 'center'}}>
            {this.props.body}
        </Body>) : null}
        {this.props.right ? (<Right style={{flex : this.props.right ? 1 : 0}}>
            {this.props.right}
        </Right>) : null} 
     </Footer>
    )
  }
}

const styles = StyleSheet.create({
    footer : {
        paddingHorizontal: 20,
        backgroundColor: commonColor.defaultBackground,
        borderTopWidth: 0,
        height: moderateScale(60),
    }
});