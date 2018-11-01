import React, { Component } from 'react'
import { Text, View } from 'react-native'
import SpashScreen from '../../stories/screens/SpashScreen';
import { connect } from 'react-redux'
import { Admin } from '../LoginContainer/interface';

export interface Props {
    navigation: any;
    rehidrate : any;
    accountFacebook: Object;
    accountAdmin : Admin;

  }
  export interface State { 
  }
export class SpashScreenContainer extends Component<Props, State> {
    componentDidMount = () => {
        console.log('did mount rehidrate',this.props.rehidrate);
    }
    
  render() {
      console.log('rehidrate',this.props.rehidrate);
      if(this.props.rehidrate && this.props.accountAdmin.username==="" && Object.keys(this.props.accountFacebook).length===0) {
          this.props.navigation.navigate("Login");
      }
      if(this.props.rehidrate && (this.props.accountAdmin.username!=="" || Object.keys(this.props.accountFacebook).length!==0)) {
          this.props.navigation.navigate("Drawer");
      }
    return (
     <SpashScreen
        navigation={this.props.navigation}
     />
    )
  }
}


function bindAction(dispatch) {
	return {

	};
}



const mapStateToProps = store => ({
    rehidrate : store._persist.rehydrated,
    accountFacebook : store.loginReducer.accountFacebook,
    accountAdmin : store.loginReducer.accountAdmin,
});
export default connect(mapStateToProps, bindAction)(SpashScreenContainer);
