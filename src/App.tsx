import React from "react";
import { StackNavigator, DrawerNavigator } from "react-navigation";
import { Root } from "native-base";
import { Dimensions } from "react-native";

const deviceWidth = Dimensions.get("window").width;

import Login from "./container/LoginContainer";
import Home from "./container/HomeContainer";
import BlankPage from "./container/BlankPageContainer";
import Sidebar from "./container/SidebarContainer";
import StudentList from './container/StudentListContainer';
import CoursesContainer from './container/CoursesCotainer';
const Drawer = DrawerNavigator(
	{
		Home: { screen: Home },
	},
	{
		drawerWidth: deviceWidth - 50,
		drawerPosition: "left",
		contentComponent: (props: any) => <Sidebar {...props} />,
	}
);

const App = StackNavigator(
  {
    Login: { screen: Login },
    BlankPage: { screen: BlankPage },
    Drawer: { screen: Drawer },
		StudentList: { screen: StudentList },
		Courses: { screen: CoursesContainer},

  },
  {
		initialRouteName: "Login",
    headerMode: "none"
  }
);

export default () => (
	<Root>
		<App />
	</Root>
);
