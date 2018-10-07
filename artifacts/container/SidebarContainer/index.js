import * as React from "react";
import Sidebar from "../../stories/screens/Sidebar";
import { connect } from 'react-redux';
import { resetAccountFB } from './actions';
class SidebarContainer extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        return React.createElement(Sidebar, { resetAccountFB: this.props.resetAccountFB, user: this.props.user, navigation: this.props.navigation });
    }
}
function bindAction(dispatch) {
    return {
        resetAccountFB: () => dispatch(resetAccountFB())
    };
}
function mapStateToProps(store) {
    return {
        user: store.loginReducer.accountFacebook.user
    };
}
export default connect(mapStateToProps, bindAction)(SidebarContainer);
//# sourceMappingURL=index.js.map