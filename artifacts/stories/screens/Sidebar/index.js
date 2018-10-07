import * as React from "react";
import { Text, Container, List, Header, ListItem, Content, Title } from "native-base";
import { NavigationActions } from "react-navigation";
import { Image } from 'react-native';
import commonColor from "../../../theme/variables/commonColor";
import { LoginButton, AccessToken, LoginManager } from "react-native-fbsdk";
const routes = [
    {
        route: "Home",
        caption: "Home",
    },
    {
        route: "BlankPage",
        caption: "Infomation user",
    },
    {
        route: "Login",
        caption: "Logout",
    },
];
const resetAction = NavigationActions.reset({
    index: 0,
    actions: [NavigationActions.navigate({ routeName: "Login" })],
});
export default class Sidebar extends React.Component {
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
        return React.createElement(Container, null,
            React.createElement(Header, { style: { height: 200, backgroundColor: commonColor.brandPrimary, flexDirection: "column", alignItems: "center" } },
                this.props.user ? React.createElement(Image, { style: { borderRadius: 50, width: 100, height: 100 }, source: { uri: this.props.user.photoURL } }) : React.createElement(Image, { style: { width: 100, height: 100 }, source: require("./../../../../assets/incognito_avatar.png") }),
                React.createElement(Title, { style: { color: commonColor.topTabBarActiveTextColor } }, this.props.user && this.props.user.displayName),
                React.createElement(Text, null, this.props.user && this.props.user.email)),
            React.createElement(Content, null,
                React.createElement(List, { style: { marginTop: 40 }, dataArray: routes, renderRow: data => {
                        return React.createElement(ListItem, { button: true, onPress: () => {
                                data.route === "Login" ? this.LogoutFB() : this.props.navigation.navigate(data.route);
                            } },
                            React.createElement(Text, null, data.caption));
                    } }),
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
                    }, onLogoutFinished: () => console.log("logout.") })));
    }
}
//# sourceMappingURL=index.js.map