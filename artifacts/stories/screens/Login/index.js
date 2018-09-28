import * as React from "react";
import { Image, Platform, Alert } from "react-native";
import { Container, Content, Header, Body, Title, Button, Text, View, Icon, Footer } from "native-base";
import { LoginButton, AccessToken, LoginManager, GraphRequest, GraphRequestManager } from "react-native-fbsdk";
// import firebase from "./../../../configs/firebase";
import * as firebase from 'react-native-firebase';
class Login extends React.Component {
    constructor(props) {
        super(props);
        this.authenticate = (token) => {
            const provider = firebase.auth.FacebookAuthProvider;
            const credential = provider.credential(token);
            let ret = firebase.auth().signInWithCredential(credential);
            return ret;
        };
        this._responseInfoCallback = (error, result) => {
            if (error) {
                console.log("Error fetching data: " + error.toString());
            }
            else {
                console.log("Result Name: " + JSON.stringify(result));
            }
        };
        this.initUser = this.initUser.bind(this);
        this.onPressLoginFB = this.onPressLoginFB.bind(this);
        this.handleFbLogin = this.handleFbLogin.bind(this);
        this.handleFbLogout = this.handleFbLogout.bind(this);
        this.createUser = this.createUser.bind(this);
        console.log(firebase);
    }
    handleFbLogin() {
        console.log(AccessToken);
        AccessToken.getCurrentAccessToken().then((data) => {
            const token = data.accessToken;
            fetch('https://graph.facebook.com/v2.8/me?fields=id,picture,first_name,last_name,gender,birthday&access_token=' + token)
                .then((response) => response.json())
                .then((json) => {
                console.log('json', json);
                let self = this;
                const imageSize = 120;
                const facebookID = json.id;
                const fbImage = `https://graph.facebook.com/${facebookID}/picture?height=${imageSize}`;
                this.authenticate(data.accessToken)
                    .then((result) => {
                    console.log(result);
                    if (result) {
                        this.props.navigation.navigate('Home');
                    }
                    const { uid } = result.user;
                    console.log('uid', uid);
                    //   self.createUser(uid, json, token, fbImage);
                });
            })
                .catch(function (err) {
                console.log(err);
            });
        });
    }
    createUser(uid, userData, token, dp) {
        const defaults = {
            uid,
            token,
            dp,
            ageRange: [20, 30]
        };
        firebase.database().ref('users').child(uid).update(Object.assign({}, userData, defaults));
    }
    handleFbLogout() {
        LoginManager.logout();
    }
    onPressLoginFB() {
        AccessToken.getCurrentAccessToken().then(data => {
            console.log(data);
            let { accessToken } = data;
            const infoRequest = new GraphRequest("/me", {
                parameters: {
                    fields: {
                        string: "about,picture,cover,name,first_name,middle_name,last_name" // what you want to get
                    },
                    access_token: {
                        string: accessToken.toString() // put your accessToken here
                    }
                }
            }, this._responseInfoCallback // make sure you define _responseInfoCallback in same class
            );
            new GraphRequestManager().addRequest(infoRequest).start();
        });
    }
    initUser(accessToken) {
        console.log("accessToken", accessToken);
        fetch("https://graph.facebook.com/v2.5/me?fields=email,name,friends&access_token=" +
            accessToken)
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
        return (React.createElement(Container, null,
            React.createElement(Header, { style: { height: 200 } },
                React.createElement(Body, { style: { alignItems: "center" } },
                    React.createElement(Icon, { name: "flash", style: { fontSize: 104 } }),
                    React.createElement(Title, null, "ReactNativeSeed"),
                    React.createElement(View, { padder: true },
                        React.createElement(Text, { style: { color: Platform.OS === "ios" ? "#000" : "#FFF" } })))),
            React.createElement(Content, null,
                this.props.loginForm,
                React.createElement(View, { padder: true },
                    React.createElement(Button, { block: true, onPress: () => this.props.onLogin() },
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
                                    console.log('accessToken1', accessToken);
                                    this.initUser(accessToken);
                                    console.log('data', data);
                                });
                            }
                        }, onLogoutFinished: () => console.log("logout.") }),
                    React.createElement(Button, { onPress: this.handleFbLogin },
                        React.createElement(Text, null, "Login fb")),
                    React.createElement(Button, { onPress: this.handleFbLogout },
                        React.createElement(Text, null, "Logout fb")))),
            React.createElement(Footer, { style: { backgroundColor: "#F8F8F8" } },
                React.createElement(View, { style: { alignItems: "center", opacity: 0.5, flexDirection: "row" } },
                    React.createElement(View, { padder: true },
                        React.createElement(Text, { style: { color: "#000" } }, "Made with love at ")),
                    React.createElement(Image, { source: { uri: "https://geekyants.com/images/logo-dark.png" }, style: { width: 422 / 4, height: 86 / 4 } })))));
    }
}
export default Login;
//# sourceMappingURL=index.js.map