import * as React from "react";
import Sidebar from "../../stories/screens/Sidebar";
import { connect } from "react-redux";
import { resetAccountFB, getListCourse, resetAccountAdmin } from "./actions";
import { Account } from "./interface";

export interface Props {
  navigation: any;
  user: Account;
  resetAccountFB: Function;
  getListCourses: Function;
  resetAccountAdmin: Function;
}
export interface State {}
class SidebarContainer extends React.Component<Props, State> {
  constructor(props) {
    super(props);
    this.resetAccountAdmin = this.resetAccountAdmin.bind(this);
  }
  resetAccountAdmin() {
    console.log("ok");
  }
  render() {
    return (
      <Sidebar
        getListCourses={this.props.getListCourses}
        resetAccountFB={this.props.resetAccountFB}
        resetAccountAdmin={this.props.resetAccountAdmin}
        user={this.props.user}
        navigation={this.props.navigation}
      />
    );
  }
}

function bindAction(dispatch) {
  return {
    resetAccountFB: () => dispatch(resetAccountFB()),
    getListCourses: () => dispatch(getListCourse()),
    resetAccountAdmin: () => dispatch(resetAccountAdmin())
  };
}
function mapStateToProps(store) {
  return {
    user: store.loginReducer.accountFacebook.user
  };
}
export default connect(
  mapStateToProps,
  bindAction
)(SidebarContainer);
