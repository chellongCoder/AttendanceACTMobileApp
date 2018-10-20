import * as React from "react";
import Sidebar from "../../stories/screens/Sidebar";
import { connect } from 'react-redux'
import {resetAccountFB, getListCourse} from './actions';
import { Account } from "./interface";

export interface Props {
	navigation: any;
	user: Account
	resetAccountFB : Function;
	getListCourses: Function;

}
export interface State {}
class SidebarContainer extends React.Component<Props, State> {
  constructor(props) {
	super(props);
  }

  render() {
    return (
      <Sidebar
        getListCourses={this.props.getListCourses}
        resetAccountFB={this.props.resetAccountFB}
        user={this.props.user}
        navigation={this.props.navigation}
      />
    );
  }
}


function bindAction(dispatch) {
	return {
		resetAccountFB :() => dispatch(resetAccountFB()),
		getListCourses : () => dispatch(getListCourse())
	}
}
function mapStateToProps(store) {
	return {
		user: store.loginReducer.accountFacebook.user
	}
}
export default connect(
  mapStateToProps,
  bindAction
)(SidebarContainer);