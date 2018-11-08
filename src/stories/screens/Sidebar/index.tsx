import * as React from "react";
import {
  Text,
  Container,
  List,
  Header,
  ListItem,
  Content,
  Title
} from "native-base";
import { NavigationActions } from "react-navigation";
import { Image } from "react-native";
import commonColor from "../../../theme/variables/commonColor";
import {
  LoginButton,
  AccessToken,
  LoginManager,
  GraphRequest,
  GraphRequestManager
} from "react-native-fbsdk";
import { Router } from "../../../container/SidebarContainer/interface";
const routes: Array<Router> = [
  {
    route: "FunctionPage",
    caption: "Home"
  },
  {
    route: "BlankPage",
    caption: "Infomation user"
  },
  {
    route: "Courses",
    caption: "All Courses"
  },
  {
    route: "Login",
    caption: "Logout"
  }
];

export interface Props {
  navigation: any;
  user?: Object;
  resetAccountFB: Function;
  getListCourses: Function;
  resetAccountAdmin: Function;
}
export interface State {}
const resetAction = NavigationActions.reset({
  index: 0,
  actions: [NavigationActions.navigate({ routeName: "Login" })]
});
export default class Sidebar extends React.Component<Props, State> {
  constructor(props) {
    super(props);
    this.LogoutFB = this.LogoutFB.bind(this);
    this.renderRow = this.renderRow.bind(this);
  }
  LogoutFB() {
    LoginManager.logOut();
    this.props.resetAccountAdmin();
    this.props.resetAccountFB();

    // this.props.navigation.dispatch(resetAction);

    this.props.navigation.navigate("Login");
  }
  /**
   * TODO: viết function onpress gọi function ứng với các màn hình
   */
  renderRow(data: Router) {
    return (
      <ListItem
        button
        onPress={() => {
          console.log("click");
          switch (data.route) {
            case "Courses":
              this.props.getListCourses();
              this.props.navigation.navigate("Courses");
              break;
            case "Login":
              this.LogoutFB();
              // LoginManager.logOut();
              // this.props.resetAccountFB();
              // this.props.navigation.navigate("Login");
              break;
            case "FunctionPage":
              this.props.navigation.navigate("FunctionPage");
              break;

            default:
              break;
          }
        }}
      >
        <Text>{data.caption}</Text>
      </ListItem>
    );
  }

  render() {
    return (
      <Container>
        <Header
          style={{
            height: 200,
            backgroundColor: commonColor.brandPrimary,
            flexDirection: "column",
            alignItems: "center"
          }}
        >
          {this.props.user ? (
            <Image
              style={{ borderRadius: 50, width: 100, height: 100 }}
              source={{ uri: this.props.user.photoURL }}
            />
          ) : (
            <Image
              style={{ width: 100, height: 100 }}
              source={require("./../../../../assets/incognito_avatar.png")}
            />
          )}
          <Title style={{ color: commonColor.topTabBarActiveTextColor }}>
            {this.props.user ? this.props.user.displayName : "Admin"}
          </Title>
          <Text>{this.props.user && this.props.user.email}</Text>
        </Header>
        <Content>
          <List
            style={{ marginTop: 40 }}
            dataArray={routes}
            renderRow={this.renderRow}
          />
        </Content>
      </Container>
    );
  }
}
