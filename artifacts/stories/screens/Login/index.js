var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import * as React from "react";
import { Image, Platform, Alert, } from "react-native";
import { Container, Content, Header, Body, Title, Button, Text, View, Icon, Footer } from "native-base";
import { LoginButton, AccessToken } from "react-native-fbsdk";
import * as firebase from "react-native-firebase";
class Login extends React.Component {
    constructor(props) {
        super(props);
        this.createUser = this.createUser.bind(this);
        this.asyncLogIn = this.asyncLogIn.bind(this);
        console.log(firebase);
    }
    asyncLogIn() {
        return __awaiter(this, void 0, void 0, function* () {
            console.log('login');
            const response = yield fetch('http://localhost:8080/api/ext/getAllStudent', {
                body: JSON.stringify({ username: "email", password: "passowrd" }),
                headers: {
                    Accept: "application/json",
                    "cache-control": "no-cache",
                    "Content-type": "application/json"
                },
                method: "POST"
            }).catch(error => {
                console.log(error);
            });
            const data = yield response.json();
            console.log(data);
        });
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
            .update(Object.assign({}, userData, defaults));
    }
    render() {
        return React.createElement(Container, null,
            React.createElement(Header, { style: { height: 200, paddingTop: 10 } },
                React.createElement(Body, { style: { alignItems: "center", } },
                    React.createElement(Image, { style: {
                            flex: 1,
                            paddingTop: 10
                        }, source: require('./../../../../assets/actlogo.png') }),
                    React.createElement(Title, null, "ACT Academy"),
                    React.createElement(View, { padder: true },
                        React.createElement(Text, { style: { color: Platform.OS === "ios" ? "#000" : "#FFF" } })))),
            React.createElement(Content, null,
                this.props.loginForm,
                React.createElement(View, { padder: true },
                    React.createElement(Button, { block: true, onPress: () => {
                            // this.asyncLogIn().then(result => {
                            //   console.log("result ", result);
                            // });
                            this.props.onLogin();
                        } },
                        React.createElement(Text, null, "Login"))),
                React.createElement(View, { padder: true },
                    React.createElement(LoginButton, { readPermissions: ["public_profile"], onLoginFinished: (error, result) => {
                            if (error) {
                                console("login has error: " + result);
                            }
                            else if (result.isCancelled) {
                                Alert.alert("login is cancelled.");
                            }
                            else {
                                AccessToken.getCurrentAccessToken().then(data => {
                                    let { accessToken } = data;
                                    console.log("accessToken1", accessToken);
                                    this.initUser(accessToken);
                                    console.log("data", data);
                                });
                            }
                        }, onLogoutFinished: () => console.log("logout.") }),
                    React.createElement(Button, { full: true, bordered: true, primary: true, onPress: () => this.props.fbLogin() },
                        React.createElement(Icon, { ios: "logo-facebook", android: "logo-facebook" }),
                        React.createElement(Text, null, "Continue with Facebook")))),
            React.createElement(Footer, { style: { backgroundColor: "#FFFFFF" } },
                React.createElement(View, { style: { alignItems: "center", opacity: 0.5, flexDirection: "row" } },
                    React.createElement(View, { padder: true },
                        React.createElement(Text, { style: { color: "#000" } }, "Made with love at ")),
                    React.createElement(Image, { source: require('./../../../../assets/ACT.jpg'), style: { width: 422 / 4, height: 120 / 3 } }))));
    }
}
export default Login;
//# sourceMappingURL=index.js.map