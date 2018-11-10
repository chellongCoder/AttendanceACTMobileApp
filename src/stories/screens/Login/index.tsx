import * as React from "react";
import { Image, Platform, Alert } from "react-native";
import {
  Container,
  Content,
  Header,
  Body,
  Title,
  Button,
  Text,
  View,
  Icon,
  Footer
} from "native-base";
import {
  LoginButton,
  AccessToken,
  LoginManager,
  GraphRequest,
  GraphRequestManager
} from "react-native-fbsdk";
import * as firebase from "react-native-firebase";
import commonColor from "../../../theme/variables/commonColor";

export interface Props {
  loginForm: any;
  onLogin: Function;
  navigation: any;
  fbLogin?: Function;
}
export interface State {}
class Login extends React.Component<Props, State> {
  constructor(props) {
    super(props);
    this.createUser = this.createUser.bind(this);
    this.asyncLogIn = this.asyncLogIn.bind(this);
    console.log(firebase);
  }

  async asyncLogIn(): Promise<Action> {
    console.log("login");
    const response = await fetch(
      "http://localhost:8080/api/ext/getAllStudent",
      {
        body: JSON.stringify({ username: "email", password: "passowrd" }),
        headers: {
          Accept: "application/json",
          "cache-control": "no-cache",
          "Content-type": "application/json"
        },
        method: "POST"
      }
    ).catch(error => {
      console.log(error);
    });
    const data = await response.json();
    console.log(data);
  }
  createUser(uid, userData, token, dp) {
    const defaults = {
      uid,
      token,
      dp,
      ageRange: [20, 30]
    };
    firebase
      .database()
      .ref("users")
      .child(uid)
      .update({ ...userData, ...defaults });
  }

  render() {
    return (
      <Container>
        <Header style={{ height: 200, paddingTop: 10 }}>
          <Body style={{ alignItems: "center" }}>
            <Image
              style={{
                flex: 1,
                paddingTop: 10
              }}
              source={require("./../../../../assets/actlogo.png")}
            />
            <Title>ACT Academy</Title>
            <View padder>
              <Text
                style={{ color: Platform.OS === "ios" ? "#000" : "#FFF" }}
              />
            </View>
          </Body>
        </Header>
        <Content>
          {this.props.loginForm}
          <View padder>
            <Button
              block
              onPress={() => {
                // this.asyncLogIn().then(result => {
                //   console.log("result ", result);
                // });
                this.props.onLogin();
              }}
            >
              <Text>Login</Text>
            </Button>
          </View>
          <View padder>
            <Button full bordered primary onPress={() => this.props.fbLogin()}>
              <Icon ios="logo-facebook" android="logo-facebook" />
              <Text>Continue with Facebook</Text>
            </Button>
          </View>
        </Content>
        <Footer style={{ backgroundColor: "#FFFFFF" }}>
          <View
            style={{ alignItems: "center", opacity: 0.5, flexDirection: "row" }}
          >
            <View padder>
              <Text style={{ color: "#000" }}>Made with love at </Text>
            </View>
            <Image
              source={require("./../../../../assets/ACT.jpg")}
              style={{ width: 422 / 4, height: 120 / 3 }}
            />
          </View>
        </Footer>
      </Container>
    );
  }
}

export default Login;
