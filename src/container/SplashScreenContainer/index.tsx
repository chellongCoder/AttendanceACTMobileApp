import React, { Component } from "react";
import { Text, View } from "react-native";
import SpashScreen from "../../stories/screens/SpashScreen";
import { connect } from "react-redux";
import { Admin } from "../LoginContainer/interface";

export interface Props {
  navigation: any;
  rehidrate: any;
  accountFacebook: Object;
  accountAdmin: Admin;
  isLogin: boolean;
}
export interface State {}
export class SpashScreenContainer extends Component<Props, State> {
  componentDidMount = () => {
    console.log("did mount rehidrate", this.props.rehidrate);
  };

  render() {
    console.log("rehidrate", this.props.rehidrate);
    if (this.props.rehidrate && !this.props.isLogin) {
      this.props.navigation.navigate("Login");
      return null;
    } else if (this.props.rehidrate && this.props.isLogin) {
      console.log("loi");
      this.props.navigation.navigate("Drawer");
    }
    return <SpashScreen navigation={this.props.navigation} />;
  }
}

function bindAction(dispatch) {
  return {};
}

const mapStateToProps = store => ({
  rehidrate: store._persist.rehydrated,
  accountFacebook: store.loginReducer.accountFacebook,
  accountAdmin: store.loginReducer.accountAdmin,
  isLogin: store.loginReducer.isLogin
});
export default connect(
  mapStateToProps,
  bindAction
)(SpashScreenContainer);
