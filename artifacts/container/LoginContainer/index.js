import * as React from "react";
import { Item, Input, Icon, Form } from "native-base";
import { Field, reduxForm } from "redux-form";
import Login from "../../stories/screens/Login";
import { AccessToken, LoginManager } from "react-native-fbsdk";
import * as firebase from "react-native-firebase";
import { saveAccountFB } from "./actions";
import { connect } from "react-redux";
const required = value => (value ? undefined : "Required");
const maxLength = max => value => value && value.length > max ? `Must be ${max} characters or less` : undefined;
const maxLength15 = maxLength(15);
const minLength = min => value => value && value.length < min ? `Must be ${min} characters or more` : undefined;
const minLength8 = minLength(8);
const email = value => value && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value)
    ? "Invalid email address"
    : undefined;
const alphaNumeric = value => value && /[^a-zA-Z0-9 ]/i.test(value)
    ? "Only alphanumeric characters"
    : undefined;
class LoginForm extends React.Component {
    constructor(props) {
        super(props);
        this.authenticate = token => {
            const provider = firebase.auth.FacebookAuthProvider;
            const credential = provider.credential(token);
            let ret = firebase.auth().signInWithCredential(credential);
            return ret;
        };
        this.state = {
            username: "",
            password: ""
        };
        this.handleFbLogin = this.handleFbLogin.bind(this);
        this.renderInput = this.renderInput.bind(this);
    }
    renderInput({ input, meta: { touched, error } }) {
        return (React.createElement(Item, { error: error && touched },
            React.createElement(Icon, { active: true, name: input.name === "email" ? "person" : "unlock" }),
            React.createElement(Input
            // onChangeText
            , { 
                // onChangeText
                onChangeText: text => {
                    if (input.name === "email") {
                        this.username = text;
                    }
                    else {
                        this.password = text;
                    }
                }, onBlur: () => { console.log('username', this.username, 'password', this.password); }, 
                // {...input}
                defaultValue: "sdasd", ref: c => (this.textInput = c), placeholder: input.name === "email" ? "Email" : "Password", secureTextEntry: input.name === "password" ? true : false })));
    }
    handleFbLogin() {
        console.log("login");
        LoginManager.logInWithReadPermissions(["public_profile", "email"]).then(result => {
            if (result.isCancelled) {
                console.log("Login cancelled");
            }
            else {
                console.log("Login success with permissions: " +
                    result.grantedPermissions.toString());
                AccessToken.getCurrentAccessToken().then(data => {
                    const token = data.accessToken;
                    fetch("https://graph.facebook.com/v2.8/me?fields=id,picture,first_name,last_name,gender,birthday&access_token=" +
                        token)
                        .then(response => response.json())
                        .then(json => {
                        console.log("json", json);
                        const imageSize = 120;
                        const facebookID = json.id;
                        const fbImage = `https://graph.facebook.com/${facebookID}/picture?height=${imageSize}`;
                        this.authenticate(data.accessToken).then(result => {
                            console.log(result);
                            this.props.saveAccountFB(result);
                            if (result) {
                                this.props.navigation.navigate("Home");
                            }
                            const { uid } = result.user;
                            console.log("uid", uid);
                            //   self.createUser(uid, json, token, fbImage);
                        });
                    })
                        .catch(function (err) {
                        console.log(err);
                    });
                });
            }
        }, function (error) {
            console.log("Login fail with error: " + error);
        });
    }
    login() {
        this.props.navigation.navigate("Drawer");
        // if (this.username==='longnn@ows.com.vn' && this.password==='longvip98') {
        //   this.props.navigation.navigate("Drawer");
        // } else {
        //   Toast.show({
        //     text: "Enter Valid Username & password!",
        //     duration: 2000,
        //     position: "top",
        //     textStyle: { textAlign: "center" }
        //   });
        // }
    }
    render() {
        let form = (React.createElement(Form, null,
            React.createElement(Field, { name: "email", component: this.renderInput, validate: [email, required] }),
            React.createElement(Field, { name: "password", component: this.renderInput, validate: [alphaNumeric, minLength8, maxLength15, required] })));
        return (React.createElement(Login, { fbLogin: this.handleFbLogin, navigation: this.props.navigation, loginForm: form, onLogin: () => this.login() }));
    }
}
function bindAction(dispatch) {
    return {
        saveAccountFB: account => dispatch(saveAccountFB(account))
    };
}
function mapStateToProps(store) {
    return {};
}
const LoginContainer = reduxForm({
    form: "login"
})(LoginForm);
export default connect(mapStateToProps, bindAction)(LoginContainer);
//# sourceMappingURL=index.js.map