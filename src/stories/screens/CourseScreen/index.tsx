import React, { Component } from "react";
import { Text, View, StyleSheet, Image, TouchableOpacity } from "react-native";
import { Container, Card, CardItem, Content, Icon } from "native-base";

import { moderateScale } from "react-native-size-matters";
import commonColor from "../../../theme/variables/commonColor";
import { getRandomColor } from "../../../Util/view.util";
import { Course } from "../../../container/CoursesContainer/interface";
import HeaderComponent from "../../../component/HeaderComponent";
import { CourseName } from "../../../Common/config";
import commonStyles from "../../../theme/variables/commonStyles";
import { connect } from "react-redux";
import Spinner from "react-native-loading-spinner-overlay";
import { NavigationService } from "../../../Services/NavigationService";
import ModalComponent from "../../../component/ModalComponent";
import InputConponent from "../../../component/InputConponent";
import DatePickerComponent from "../../../component/DatePickerComponent";
export interface Props {
  navigation: any;
  data: Array<Course>;
  getLessonByCourseId: Function;
  isLoading: boolean;
  getSelectedCourse: Function;
}
export interface State {}
export class CourseScreen extends Component<Props, State> {
  constructor(props) {
    super(props);
    this.onPressItem = this.onPressItem.bind(this);
  }
  onPressItem() {}
  renderCard(value: Course, index) {
    let img = null;
    if (value.courseName.toLowerCase().includes(CourseName.C.toLowerCase())) {
      img = require("./../../../../assets/c.png");
    } else if (
      value.courseName.toLowerCase().includes(CourseName.Java.toLowerCase())
    ) {
      img = require("./../../../../assets/java.png");
    } else if (
      value.courseName.toLowerCase().includes(CourseName.CCNA.toLowerCase())
    ) {
      img = require("./../../../../assets/ccna.jpg");
    } else if (
      value.courseName.toLowerCase().includes(CourseName.PHP.toLowerCase())
    ) {
      img = require("./../../../../assets/php.png");
    }
    return (
      <Card key={index} style={styles.card}>
        <CardItem style={styles.cardItem}>
          <Image
            style={styles.image}
            source={require("./../../../../assets/ACT.jpg")}
          />
        </CardItem>
        <TouchableOpacity
          onPress={() => {
            this.props.getSelectedCourse(value);
            this.props.getLessonByCourseId(value);
          }}
        >
          <CardItem style={styles.cardItemOpacity} />
          <View style={styles.course}>
            <Image style={commonStyles.imageNormal} source={img} />
            <Text>{value.courseName}</Text>
          </View>
        </TouchableOpacity>
      </Card>
    );
  }
  render() {
    return (
      <Container>
        <HeaderComponent
          navigation={this.props.navigation}
          left={
            <TouchableOpacity
              onPress={() => {
                NavigationService.goBack();
              }}
              style={{ flexDirection: "row", alignItems: "center" }}
            >
              <Icon
                style={[
                  commonStyles.textButton,
                  { marginRight: moderateScale(5) }
                ]}
                android="md-arrow-dropleft"
                ios="ios-arrow-back-outline"
              />
              <Text style={commonStyles.textButton}>Course</Text>
            </TouchableOpacity>
          }
          right={
            <TouchableOpacity>
              <Icon
                style={styles.iconAdd}
                android="md-add"
                ios="ios-add-outline"
              />
            </TouchableOpacity>
          }
        />
        <Content>
          {this.props.data.map((value, index) => {
            return this.renderCard(value, index);
          })}
        </Content>
        <ModalComponent
          isVisible={true}
          component={
            <View style={styles.modal}>
              <InputConponent onChangeText={() => {}} label="Course Name" />
              <DatePickerComponent
                placeholder="Initiated day"
                onDateChange={date => console.log(date)}
              />
              <DatePickerComponent
                placeholder="Ended day"
                onDateChange={date => console.log(date)}
              />
              <DatePickerComponent
                placeholder="Ended day"
                onDateChange={date => console.log(date)}
              />
              <DatePickerComponent
                placeholder="Ended day"
                onDateChange={date => console.log(date)}
              />
              <DatePickerComponent
                placeholder="Ended day"
                onDateChange={date => console.log(date)}
              />
            </View>
          }
        />
      </Container>
    );
  }
}
function bindAction(dispatch) {
  return {};
}
function mapStateToProps(store) {
  return {
    listCourses: store.attendanceReducer.courses,
    isLoading: store.lessonReducer.isLoading
  };
}
export default connect(
  mapStateToProps,
  bindAction
)(CourseScreen);

const styles = StyleSheet.create({
  card: {
    flex: 1
  },
  cardItem: {
    // flex : 1/4
    paddingLeft: 0,
    flex: 1
  },
  cardItemOpacity: {
    flex: 1,
    position: "absolute",
    bottom: 0,
    width: moderateScale(commonColor.deviceWidth),
    backgroundColor: getRandomColor(),
    flexDirection: "column",
    opacity: 0.2,
    height: moderateScale(commonColor.deviceHeight / 10)
  },
  course: {
    position: "absolute",
    bottom: moderateScale(10),
    backgroundColor: "transparent",
    flexDirection: "row",
    alignItems: "center"
  },
  imageIcon: {
    width: moderateScale(commonColor.iconSizeLarge),
    height: moderateScale(commonColor.iconSizeLarge),
    resizeMode: "contain"
  },
  text: {
    color: "#FFFFFF"
  },
  cardImage: {
    backgroundColor: "red"
    // flex : 8/10
  },
  image: {
    width: moderateScale(commonColor.deviceWidth - 10),
    height: moderateScale(commonColor.deviceHeight / 5)
  },
  iconAdd: {
    fontSize: moderateScale(commonColor.fontSizeH3),
    color: commonColor.commonBackground
  },
  modal: {
    backgroundColor: commonColor.whitebackground,
    alignItems: "flex-start",
    height: commonColor.deviceHeight / 2,
    paddingHorizontal: moderateScale(10),
    borderRadius: moderateScale(5)
  }
});
