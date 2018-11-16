import React, { Component } from "react";
import {
  Container,
  Header,
  Title,
  Content,
  Text,
  Button,
  Left,
  Body,
  Right,
  List,
  ListItem,
  View,
  Icon,
  Picker,
  Form,
  Spinner,
  Item,
  Label,
  Input,
  DatePicker
} from "native-base";
import Modal from "react-native-modal";
import commonColor from "../../../theme/variables/commonColor";
import HeaderComponent from "../../../component/HeaderComponent";
import commonStyles from "../../../theme/variables/commonStyles";
import { Calendar, CalendarList, Agenda } from "react-native-calendars";
import { LocaleConfig } from "react-native-calendars";
import { TouchableOpacity, StyleSheet } from "react-native";
import { Lesson } from "../../../container/LessonContainer/interface";
import { connect } from "react-redux";
import { moderateScale } from "react-native-size-matters";
import { Course } from "../../../container/CoursesContainer/interface";
import { getDate } from "../../../Util/view.util";
// import Icon from 'react-native-vector-icons';

export interface Props {
  navigation: any;
  isVisibleModal: boolean;
  _toggleModal: Function;
  listLesson: Array<Lesson>;
  markDates: Object;
  onSelectDay: Function;
  getAllStudent: Function;
  courseSelected: Course;
}
export interface State {
  chosenDate: Date;
}
export default class LessonScreen extends Component<Props, State> {
  markDates: Object;
  constructor(props) {
    super(props);
    this.state = { chosenDate: new Date() };
    this.setDate = this.setDate.bind(this);
    this.markDates = {};
    LocaleConfig.locales["en"] = {
      monthNames: [
        "January",
        "February",
        "March",
        "April",
        "May",
        "Jule",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December"
      ],
      monthNamesShort: [
        "Jan",
        "Feb",
        "Mar",
        "Ap",
        "May",
        "Jul",
        "July",
        "Au",
        "Sep",
        "Oct",
        "Nov",
        "Dec"
      ],
      dayNames: [
        "Monday",
        "Tueday",
        "Wednesday",
        "Thurday",
        "Friday",
        "Saturday",
        "Sunday"
      ],
      dayNamesShort: ["Mon", "Tue", "Wed", "Thur", "Fri", "Sat", "Sun"]
    };

    LocaleConfig.defaultLocale = "en";
  }
  componentDidMount() {}

  setDate(newDate) {
    this.setState({ chosenDate: newDate });
  }

  render() {
    let courseSelected: Course = this.props.courseSelected;
    return (
      <Container>
        <HeaderComponent
          navigation={this.props.navigation}
          left={
            <View>
              <Text style={{ color: commonColor.brandInfo }}>Lesson</Text>
            </View>
          }
          right={
            <TouchableOpacity onPress={() => this.props.getAllStudent()}>
              <Icon
                color={commonColor.brandInfo}
                style={styles.iconStudent}
                android="md-contact"
                ios="ios-contact-outline"
              />
            </TouchableOpacity>
          }
        />
        <Content>
          <Calendar
            // Initially visible month. Default = Date()
            current={new Date() - 1}
            // Minimum date that can be selected, dates before minDate will be grayed out. Default = undefined
            minDate={"2018-01-01"}
            // Maximum date that can be selected, dates after maxDate will be grayed out. Default = undefined
            maxDate={"2020-12-30"}
            // Handler which gets executed on day press. Default = undefined
            onDayPress={day => {
              console.log("selected day", day);
              // for(let i=0; i<this.props.listLesson.length; i++) {
              //   let element = this.props.listLesson[i];
              //   if(element.dayLearning.includes(day.dateString)) {
              //     console.log(element);
              //   }
              // }
              this.props.onSelectDay(day.dateString);
            }}
            // Handler which gets executed on day long press. Default = undefined
            onDayLongPress={day => {
              console.log("selected day", day), this.props.listLesson;
              for (let i = 0; i < this.props.listLesson.length; i++) {
                let element = this.props.listLesson[i];
                if (element.dayLearning.includes(day.dateString)) {
                  console.log(element);
                }
              }
            }}
            // Month format in calendar title. Formatting values: http://arshaw.com/xdate/#Formatting
            monthFormat={"yyyy MM"}
            // Handler which gets executed when visible month changes in calendar. Default = undefined
            onMonthChange={month => {
              console.log("month changed", month);
            }}
            // Hide month navigation arrows. Default = false
            hideArrows={false}
            // Replace default arrows with custom ones (direction can be 'left' or 'right')
            // Do not show days of other months in month page. Default = false
            hideExtraDays={false}
            // If hideArrows=false and hideExtraDays=false do not switch month when tapping on greyed out
            // day from another month that is visible in calendar page. Default = false
            disableMonthChange={false}
            // If firstDay=1 week starts from Monday. Note that dayNames and dayNamesShort should still start from Sunday.
            firstDay={1}
            // Hide day names. Default = false
            hideDayNames={false}
            // Show week numbers to the left. Default = false
            showWeekNumbers={true}
            // Handler which gets executed when press arrow icon left. It receive a callback can go back month
            onPressArrowLeft={substractMonth => substractMonth()}
            // Handler which gets executed when press arrow icon left. It receive a callback can go next month
            onPressArrowRight={addMonth => addMonth()}
            markedDates={this.props.markDates}
            markingType={"custom"}
          />
          <View style={styles.content}>
            <View style={styles.row}>
              <View style={styles.leftRow}>
                <Icon active style={styles.icon} name="logo-tux" />
                <Title>Course Name: </Title>
              </View>
              <View style={styles.rightRow}>
                <Text style={commonStyles.textButton}>
                  {courseSelected.courseName}
                </Text>
              </View>
            </View>
            <View style={styles.row}>
              <View style={styles.leftRow}>
                <Icon type="Ionicons" active style={styles.icon} name="time" />
                <Title>Duration: </Title>
              </View>
              <View style={styles.rightRow}>
                <Text style={commonStyles.textButton}>
                  {courseSelected.duration}
                </Text>
              </View>
            </View>
            <View style={styles.row}>
              <View style={styles.leftRow}>
                <Icon
                  type="Octicons"
                  active
                  style={styles.icon}
                  name="calendar"
                />
                <Title>Start day: </Title>
              </View>
              <View style={styles.rightRow}>
                <Text style={commonStyles.textButton}>{`${
                  getDate(courseSelected.initDay.toString().slice(0,10))
                }`}</Text>
              </View>
            </View>
            <View style={styles.row}>
              <View style={styles.leftRow}>
                <Icon
                  type="Ionicons"
                  active
                  style={styles.icon}
                  name="calendar"
                />
                <Title>End day: </Title>
              </View>
              <View style={styles.rightRow}>
                <Text style={commonStyles.textButton}>{`${
                  getDate(courseSelected.endDay.toString().slice(0, 10))
                }`}</Text>
              </View>
            </View>
          </View>
        </Content>
      </Container>
    );
  }
}

const styles = StyleSheet.create({
  content: {
    marginTop: moderateScale(20),
    textAlign: "center",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: commonColor.whitebackground
  },
  row: {
    flex: 1,
    justifyContent: "center",
    flexDirection: "row",
    marginHorizontal: moderateScale(20),
    borderBottomWidth: 0.5,
    borderBottomColor: commonColor.cardBorderColor
  },
  leftRow: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start"
  },
  rightRow: {
    flex: 1,
    alignItems: "flex-end"
  },
  icon: {
    color: commonColor.brandPrimary,
    marginRight: moderateScale(10)
  },
  iconStudent: {
    color: commonColor.brandInfo,
    width: moderateScale(commonColor.iconSizeMedium),
    height: moderateScale(commonColor.iconSizeMedium)
  }
});
