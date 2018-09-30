import * as React from "react";
import { Item, Input, Icon, Form, Toast } from "native-base";
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

const required = value => (value ? undefined : "Required");
const maxLength = max => value => (value && value.length > max ? `Must be ${max} characters or less` : undefined);
const maxLength15 = maxLength(15);
const minLength = min => value => (value && value.length < min ? `Must be ${min} characters or more` : undefined);
const minLength8 = minLength(8);
const email = value =>
	value && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value) ? "Invalid email address" : undefined;
const alphaNumeric = value => (value && /[^a-zA-Z0-9 ]/i.test(value) ? "Only alphanumeric characters" : undefined);

export interface Props {
	navigation: any;
	valid: boolean;
}
export interface State {}
class LoginForm extends React.Component<Props, State> {
	textInput: any;
	constructor(props) {
		super(props);
		this.handleFbLogin = this.handleFbLogin.bind(this);
	}
	renderInput({ input, meta: { touched, error } }) {
		return (
			<Item error={error && touched}>
				<Icon active name={input.name === "email" ? "person" : "unlock"} />
				<Input
					ref={c => (this.textInput = c)}
					placeholder={input.name === "email" ? "Email" : "Password"}
					secureTextEntry={input.name === "password" ? true : false}
					{...input}
				/>
			</Item>
		);
	}

	handleFbLogin() {
		console.log('login');
		LoginManager.logInWithReadPermissions(['public_profile', 'email']).then(
			 (result) => {
				if (result.isCancelled) {
					console.log('Login cancelled');
				} else {
					console.log('Login success with permissions: '
						+ result.grantedPermissions.toString());
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
									console.log(result);
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
			},
			function (error) {
				console.log('Login fail with error: ' + error);
			}
		);		
	}

	authenticate = token => {
		const provider = firebase.auth.FacebookAuthProvider;
		const credential = provider.credential(token);
		let ret = firebase.auth().signInWithCredential(credential);
		return ret;
	};

	login() {
		if (this.props.valid) {
			this.props.navigation.navigate("Drawer");
		} else {
			Toast.show({
				text: "Enter Valid Username & password!",
				duration: 2000,
				position: "top",
				textStyle: { textAlign: "center" },
			});
		}
	}

	render() {
		const form = (
			<Form>
				<Field name="email" component={this.renderInput} validate={[email, required]} />
				<Field
					name="password"
					component={this.renderInput}
					validate={[alphaNumeric, minLength8, maxLength15, required]}
				/>
			</Form>
		);
		return <Login 
		fbLogin={this.handleFbLogin}
		navigation={this.props.navigation} 
		loginForm={form} onLogin={() => this.login()} />;
	}
}
const LoginContainer = reduxForm({
	form: "login",
})(LoginForm);
export default LoginContainer;
