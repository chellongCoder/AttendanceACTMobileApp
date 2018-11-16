import React, { Component } from "react";
import { Text, StyleSheet, View } from "react-native";
import Modal from "react-native-modal";
import { moderateScale } from "react-native-size-matters";
import commonColor from "../theme/variables/commonColor";
export interface Props {
  isVisible: boolean;
  component: any;
  onBackdropPress : Function;
}
export interface State {
  isVisible : boolean;
}
export default class ModalComponent extends Component<Props, State> {
  constructor(props) {
    super(props);
    this.state = {
      isVisible : false,
    }
  }
  render() {
    return (
      <Modal
        onBackdropPress={() => this.props.onBackdropPress()}
        isVisible={this.props.isVisible}
        backdropColor={"black"}
        backdropOpacity={0.5}
        animationIn="zoomInDown"
        animationOut="zoomOutUp"
        animationInTiming={1000}
        animationOutTiming={1000}
        backdropTransitionInTiming={1000}
        backdropTransitionOutTiming={1000}
      >
        {this.props.component}
      </Modal>
    );
  }
}

const styles = StyleSheet.create({
  modal: {}
});
