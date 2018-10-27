import React from "react";
import { StackNavigator, DrawerNavigator } from "react-navigation";
import { Root } from "native-base";
import { Dimensions } from "react-native";

const deviceWidth = Dimensions.get("window").width;

import Login from "./container/LoginContainer";
import Home from "./container/HomeContainer";
import BlankPage from "./container/BlankPageContainer";
import Sidebar from "./container/SidebarContainer";
import StudentList from "./container/StudentListContainer";
import CoursesContainer from "./container/CoursesContainer";
import AttendanceContainer from "./container/AttendanceContainer";
import LessonContainer from "./container/LessonContainer";
import { NavigationService } from "./Services/NavigationService";
import StudentAttendanceContainer from "./container/StudentAttendanceContainer.tsx";
const Drawer = DrawerNavigator(
  {
    Home: { screen: Home }
  },
  {
    drawerWidth: deviceWidth - 50,
    drawerPosition: "left",
    contentComponent: (props: any) => <Sidebar {...props} />
  }
);

const Stack = StackNavigator(
  {
    Login: { screen: Login },
    BlankPage: { screen: BlankPage },
    Drawer: { screen: Drawer },
    StudentList: { screen: StudentList },
    Courses: { screen: CoursesContainer },
    Attendance: { screen: AttendanceContainer },
    Lesson: { screen: LessonContainer },
    StudentAttendance : {screen : StudentAttendanceContainer}
  },
  {
    initialRouteName: "StudentAttendance",
    headerMode: "none"
  }
);

export default class App extends React.Component {
  render() {
    return (
      <Root>
        <Stack
          ref={navigatorRef => {
            NavigationService.setTopLevelNavigator(navigatorRef);
          }}
        />
      </Root>
    );
  }
}
