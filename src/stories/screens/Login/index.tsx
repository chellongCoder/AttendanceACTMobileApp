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
import Auth from "./../../../configs/auth";
import { fbLoginPermissions } from "./../../../constants";
//import styles from "./styles";
export interface Props {
  loginForm: any;
  onLogin: Function;
  navigation: any;
  fbLogin : Function;
}
export interface State {}
class Login extends React.Component<Props, State> {
  constructor(props) {
    super(props);
    this.initUser = this.initUser.bind(this);
    this.onPressLoginFB = this.onPressLoginFB.bind(this);
    this.handleFbLogout = this.handleFbLogout.bind(this);
    this.createUser = this.createUser.bind(this);
	this.asyncLogIn = this.asyncLogIn.bind(this);
    console.log(firebase);
  }
  
  async asyncLogIn(): Promise<Action> {
	  console.log('login');
    const response = await fetch('http://localhost:8080/api/ext/getAllStudent', {
      body: JSON.stringify({ username: "email", password : "passowrd" }),
      headers: {
        Accept: "application/json",
        "cache-control": "no-cache",
        "Content-type": "application/json"
      },
      method: "POST"
    }).catch(error => {
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

  handleFbLogout() {
    LoginManager.logout();
  }

  
  onPressLoginFB() {
    AccessToken.getCurrentAccessToken().then(data => {
      console.log(data);
      let { accessToken } = data;
      const infoRequest = new GraphRequest(
        "/me",
        {
          parameters: {
            fields: {
              string:
                "about,picture,cover,name,first_name,middle_name,last_name" // what you want to get
            },
            access_token: {
              string: accessToken.toString() // put your accessToken here
            }
          }
        },
        this._responseInfoCallback // make sure you define _responseInfoCallback in same class
      );
      new GraphRequestManager().addRequest(infoRequest).start();
    });
  }
  _responseInfoCallback = (error, result) => {
    if (error) {
      console.log("Error fetching data: " + error.toString());
    } else {
      console.log("Result Name: " + JSON.stringify(result));
    }
  };

  initUser(accessToken) {
    console.log("accessToken", accessToken);
    fetch(
      "https://graph.facebook.com/v2.5/me?fields=email,name,friends&access_token=" +
        accessToken
    )
      .then(response => response.json())
      .then(json => {
        // Some user object has been set up somewhere, build that user here
        console.log("json", json);
      })
      .catch(e => {
        console.log(e);
        reject("ERROR GETTING DATA FROM FACEBOOK");
      });
  }

  render() {
    return <Container>
        <Header style={{ height: 200 }}>
          <Body style={{ alignItems: "center" }}>
            <Icon name="flash" style={{ fontSize: 104 }} />
            <Title>ReactNativeSeed</Title>
            <View padder>
              <Text style={{ color: Platform.OS === "ios" ? "#000" : "#FFF" }} />
            </View>
          </Body>
        </Header>
        <Content>
          {this.props.loginForm}
          <View padder>
            <Button block onPress={() => {
                // this.props.onLogin()
                this.asyncLogIn().then(result => {
                  console.log("result ", result);
                });
              }}>
              <Text>Login</Text>
            </Button>
          </View>
          <View padder>
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
          <Button onPress={() => this.props.fbLogin()}>
              <Text>Login fb</Text>
            </Button>
            <Button onPress={this.handleFbLogout}>
              <Text>Logo</Text>
            </Button>
          </View>
        </Content>
        <Footer style={{ backgroundColor: "#F8F8F8" }}>
          <View style={{ alignItems: "center", opacity: 0.5, flexDirection: "row" }}>
            <View padder>
              <Text style={{ color: "#000" }}>Made with love at </Text>
            </View>
            <Image source={{ uri: "https://geekyants.com/images/logo-dark.png" }} style={{ width: 422 / 4, height: 86 / 4 }} />
          </View>
        </Footer>
      </Container>;
  }
}

export default Login;
