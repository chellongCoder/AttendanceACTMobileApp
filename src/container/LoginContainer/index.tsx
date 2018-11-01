import * as React from "react";
import { Item, Input, Icon, Form, Toast, View, Text } from "native-base";
import { Field, reduxForm } from "redux-form";
import Login from "../../stories/screens/Login";
import {
  LoginButton,
  AccessToken,
  LoginManager,
  GraphRequest,
  GraphRequestManager
} from "react-native-fbsdk";
import * as firebase from "react-native-firebase";
import { saveAccountFB, fetchListStudentByCourseId, getAccountAdmin} from "./actions";
import { connect } from "react-redux";
import { API } from "../../Common/config";
import styles from "../../stories/screens/Login/styles";
import { StyleSheet } from "react-native";
import app_constant from "../../Common/app_constant";
import { Admin } from "./interface";

const required = value => (value ? undefined : "Required");
const maxLength = max => value =>
  value && value.length > max ? `Must be ${max} characters or less` : undefined;
const maxLength15 = maxLength(15);
const minLength = min => value =>
  value && value.length < min ? `Must be ${min} characters or more` : undefined;
const minLength8 = minLength(8);
const email = value =>
  value && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value)
    ? "Invalid email address"
    : undefined;
const alphaNumeric = value =>
  value && /[^a-zA-Z0-9 ]/i.test(value)
    ? "Only alphanumeric characters"
    : undefined;

export interface Props {
  navigation: any;
  valid: boolean;
  saveAccountFB: Function;
  fetchListStudentByCourseId: Function;
  accountFacebook: Object;
  getAccountAdmin : Function;
  accountAdmin : Admin;
}
export interface State {
  username: string;
  password: string;
}
class LoginForm extends React.Component<Props, State> {
  textInput: any;
  username : string;
  password : string;
  constructor(props) {
    super(props);
    this.username = "";
    this.password = "";
	this.handleFbLogin = this.handleFbLogin.bind(this);
	  this.renderInput = this.renderInput.bind(this);
  }
  renderInput({ input, meta: { touched, error } }) {
    return (
      <Item error={error && touched}>
        <Icon active name={input.name === "email" ? "person" : "unlock"} />
        <Input
          // onChangeText
          onChangeText={text => {
            if (input.name === "email") {
			        this.username = text;
            } else {
             this.password = text;
            }
		  }}
		  onBlur={()=>{console.log('username', this.username, 'password', this.password)}}
          // {...input}
          ref={c => (this.textInput = c)}
          placeholder={input.name === "email" ? "Email" : "Password"}
          secureTextEntry={input.name === "password" ? true : false}
        />
      </Item>
    );
  }
componentDidMount() {
  setTimeout(() => {
    console.log("length", Object.keys(this.props.accountFacebook).length);
    if (Object.keys(this.props.accountFacebook).length !== 0) {
      this.props.navigation.navigate("Drawer");
      return;
    } 
    if(this.props.accountAdmin.username!=="") {
      this.props.navigation.navigate("Drawer");
    }
  }, 100);
}
  handleFbLogin() {
    console.log("login");
    LoginManager.logInWithReadPermissions(["public_profile", "email"]).then(
      result => {
        if (result.isCancelled) {
          console.log("Login cancelled");
        } else {
          console.log(
            "Login success with permissions: " +
              result.grantedPermissions.toString()
          );
          AccessToken.getCurrentAccessToken().then(data => {
            const token = data.accessToken;
            fetch(
              "https://graph.facebook.com/v2.8/me?fields=id,picture,first_name,last_name,gender,birthday&access_token=" +
                token
            )
              .then(response => response.json())
              .then(json => {
                console.log("json", json);
                const imageSize = 120;
                const facebookID = json.id;
                const fbImage = `https://graph.facebook.com/${facebookID}/picture?height=${imageSize}`;
                this.authenticate(data.accessToken).then(result => {
                  console.log('result',result.user);
                  this.props.saveAccountFB(result);
                  if (Object.keys(this.props.accountFacebook).length===0) {
                    this.props.fetchListStudentByCourseId(API.insertStudent, result);
                  } 
                  if (result) {
                    
                    this.props.navigation.navigate("Home");
                  }
                  const { uid } = result.user;
                  console.log("uid", uid);
                  //   self.createUser(uid, json, token, fbImage);
                });
              })
              .catch(function(err) {
                console.log(err);
              });
          });
        }
      },
      function(error) {
        console.log("Login fail with error: " + error);
      }
    );
  }

  authenticate = token => {
    const provider = firebase.auth.FacebookAuthProvider;
    const credential = provider.credential(token);
    let ret = firebase.auth().signInWithCredential(credential);
    return ret;
  };

  async login() {
    let account = {
      username : this.username.toLocaleLowerCase(),
      password : this.password.toLocaleLowerCase(),
    }

    console.log(account);
    const result = await this.props.getAccountAdmin(account, API.getUserAdmin);
    console.log('result', result);
    if(result[0].type===app_constant.LOGIN.GET_ACCOUT_ADMIN_SUSCESS) {
      this.props.navigation.navigate("Drawer");
    } else {
      Toast.show({
        text: "Enter Valid Username & password!",
        duration: 2000,
        position: "top",
        textStyle: { textAlign: "center" }
      });
    }
    // if (this.props.getAccountAdmin(account, API.getUserAdmin)) {
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
    let form = (
      <Form>
        <Field
          name="email"
          component={this.renderInput}
          validate={[email, required]}
        />
        <Field
          name="password"
          component={this.renderInput}
          validate={[alphaNumeric, minLength8, maxLength15, required]}
        />
      </Form>
    );
    return (
      <Login
        fbLogin={this.handleFbLogin}
        navigation={this.props.navigation}
        loginForm={form}
        onLogin={() => this.login()}
      />
    );
  }
}

function bindAction(dispatch) {
  return {
    saveAccountFB: account => dispatch(saveAccountFB(account)),
    fetchListStudentByCourseId: (url, account) => dispatch(fetchListStudentByCourseId(url, account)),
    getAccountAdmin : (account, url) => dispatch(getAccountAdmin(account,url)),
  };
}
function mapStateToProps(store) {
  return {
    accountFacebook : store.loginReducer.accountFacebook,
    accountAdmin : store.loginReducer.accountAdmin,
  };
}


export default connect(
  mapStateToProps,
  bindAction
)(
  reduxForm({
    form: "login"
  })(LoginForm)
);

