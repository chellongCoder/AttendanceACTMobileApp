import * as React from "react";
import Sidebar from "../../stories/screens/Sidebar";
import { connect } from 'react-redux'
import {resetAccountFB} from './actions';
export type Object = {
	email : string;
	displayName : string;
	photoURL : string;
}
export interface Props {
	navigation: any;
	user : Object
	resetAccountFB : Function;
}
export interface State {}
class SidebarContainer extends React.Component<Props, State> {
	constructor(props) {
		super(props);
	}
	render() {
		return <Sidebar
		resetAccountFB={this.props.resetAccountFB}
		user={this.props.user}
		navigation={this.props.navigation} />;
	}
}


function bindAction(dispatch) {
	return {
		resetAccountFB :() => dispatch(resetAccountFB())
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