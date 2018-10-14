import * as React from "react";
import { Text, Container, List, Header, ListItem, Content, Title } from "native-base";
import { NavigationActions } from "react-navigation";
import {Image} from 'react-native';
import {Object} from './../../../container/SidebarContainer';
import commonColor from "../../../theme/variables/commonColor";
import {
	LoginButton,
	AccessToken,
	LoginManager,
	GraphRequest,
	GraphRequestManager
} from "react-native-fbsdk";
const routes = [
  {
    route: "Home",
    caption: "Home"
  },
  {
    route: "BlankPage",
    caption: "Infomation user"
  },
  {
    route: "Login",
    caption: "Logout"
  },
  {
    route: "Courses",
    caption: "All Courses"
  }
];

export interface Props {
	navigation: any;
	user?: Object;
	resetAccountFB : Function;
}
export interface State {}
const resetAction = NavigationActions.reset({
	index: 0,
	actions: [NavigationActions.navigate({ routeName: "Login" })],
});
export default class Sidebar extends React.Component<Props, State> {
	constructor(props) {
		super(props);
		this.LogoutFB = this.LogoutFB.bind(this);
	}
	LogoutFB() {
		LoginManager.logOut();
		this.props.resetAccountFB();
		this.props.navigation.dispatch(resetAction);
		// console.log(this.props.resetAccountFB);
		
		// this.props.navigation.navigate("Login");
	}
	render() {
		return <Container>
        <Header style={{ height: 200, backgroundColor: commonColor.brandPrimary, flexDirection: "column", alignItems: "center" }}>
          {this.props.user ? <Image style={{ borderRadius: 50, width: 100, height: 100 }} source={{ uri: this.props.user.photoURL }} /> : <Image style={{ width: 100, height: 100 }} source={require("./../../../../assets/incognito_avatar.png")} />}
          <Title style={{ color: commonColor.topTabBarActiveTextColor }}>
            {this.props.user ? this.props.user.displayName : "Admin"}
          </Title>
          <Text>{this.props.user && this.props.user.email}</Text>
        </Header>
        <Content>
          <List style={{ marginTop: 40 }} dataArray={routes} renderRow={data => {
              return <ListItem button onPress={() => {
                    data.route === "Login" ? this.LogoutFB() : this.props.navigation.navigate(data.route);
                  }}>
                  <Text>{data.caption}</Text>
                </ListItem>;
            }} />
          <LoginButton readPermissions={["public_profile"]} onLoginFinished={(error, result) => {
              if (error) {
                console("login has error: " + result);
              } else if (result.isCancelled) {
                Alert.alert("login is cancelled.");
              } else {
                AccessToken.getCurrentAccessToken().then(data => {
                  let { accessToken } = data;
                  console.log("accessToken1", accessToken);
                  this.initUser(accessToken);
                  console.log("data", data);
                });
              }
            }} onLogoutFinished={() => console.log("logout.")} />
        </Content>
      </Container>;
	}
}
