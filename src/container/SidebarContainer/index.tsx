import * as React from "react";
import Sidebar from "../../stories/screens/Sidebar";
import { connect } from 'react-redux'

export type Object = {
	email : string;
	displayName : string;
	photoURL : string;
}
export interface Props {
	navigation: any;
	user : Object
}
export interface State {}
class SidebarContainer extends React.Component<Props, State> {
	constructor(props) {
		super(props);
		console.log("url", this.props.user.photoURL);
	}
	render() {
		return <Sidebar
		user={this.props.user}
		navigation={this.props.navigation} />;
	}
}


function bindAction(dispatch) {
	return {
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