import React from "react";
import { StackNavigator, DrawerNavigator } from "react-navigation";
import { Root } from "native-base";
import { Dimensions } from "react-native";

const deviceWidth = Dimensions.get("window").width;

import Login from "./container/LoginContainer";
import Home from "./container/HomeContainer";
import FunctionPage from "./container/FunctionPageContainer";
import Sidebar from "./container/SidebarContainer";
import StudentList from "./container/StudentListContainer";
import CoursesContainer from "./container/CoursesContainer";
import AttendanceContainer from "./container/AttendanceContainer";
import LessonContainer from "./container/LessonContainer";
import { NavigationService } from "./Services/NavigationService";
import StudentAttendanceContainer from "./container/StudentAttendanceContainer.tsx";
import SplashScreenContainer from "./container/SplashScreenContainer";
import AllStudentInCourseContainer from "./container/AllStudentInCourseContainer";
const Drawer = DrawerNavigator(
  {
    FunctionPage: { screen: FunctionPage },
    Courses: { screen: CoursesContainer },
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
    SplashScreen: { screen: SplashScreenContainer },
    Login: { screen: Login },
    Home: { screen: Home },
    FunctionPage: { screen: FunctionPage },
    Courses: { screen: CoursesContainer },
    Drawer: {
      screen: Drawer,
      navigationOptions: { gesturesEnabled: false }
    },
    StudentList: { screen: StudentList },

    Attendance: { screen: AttendanceContainer },
    Lesson: { screen: LessonContainer },
    StudentAttendance: { screen: StudentAttendanceContainer },
    AllStudentInCourse: { screen: AllStudentInCourseContainer }
  },
  {
    initialRouteName: "SplashScreen",
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
