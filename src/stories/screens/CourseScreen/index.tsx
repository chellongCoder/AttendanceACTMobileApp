import React, { Component } from "react";
import { Text, View, StyleSheet, Image, TouchableOpacity } from "react-native";
import { Container, Card, CardItem, Content, Icon, Button } from "native-base";

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
import Panel from "react-native-panel";

export interface Props {
  navigation: any;
  data: Array<Course>;
  getLessonByCourseId: Function;
  isLoading: boolean;
  getSelectedCourse: Function;
  newCourse : Course;
  submit : Function;
}
export interface State {
  isPress: boolean;
  isVisibleModal: boolean;
  selectedCouse : string;
}
const Courses = [
  {
    courseType: "C",
    courseName : "Lập trình C",
  },
  {
    courseType: "java_core",
    courseName: "Lập trình Java cơ bản",
  },
  {
    courseType: "java_web",
    courseName: "Lập trình Java Web",
  },
  {
    courseType: "CCNA",
    courseName: "Quản trị mạng CCNA",
  },
  {
    courseType: "PHP",
    courseName: "Lập trình PHP",
  }
]
export class CourseScreen extends Component<Props, State> {
  constructor(props) {
    super(props);
    this.state = {
      isPress : false,
      isVisibleModal : false,
      selectedCouse : ""
    }
    this.onPressItem = this.onPressItem.bind(this);
    this.renderCourseType = this.renderCourseType.bind(this);
    this.onPressItemPanel = this.onPressItemPanel.bind(this);
    this.onBackdropPress = this.onBackdropPress.bind(this);
  }
  onBackdropPress() {
    this.setState({isVisibleModal : false});
  }
  onPressItem() {}
  onPressItemPanel(value) {
    this.setState({isPress : true});
    setTimeout(() => {
      this.setState({ isPress: false });
    }, 500);
    this.props.newCourse.courseId = value.courseType;
  }
  renderCourseType(value, index) {
    return (
      <Button 
      onPress={() => {
          this.onPressItemPanel(value);
          this.setState({selectedCouse : value.courseName});
      }}
      key={index} style={styles.btnTypeContact} full transparent bordered>
        <Text>{value.courseName}</Text>
      </Button>
    )
  }
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
            <TouchableOpacity onPress={() => {
              this.setState({isVisibleModal : true});
            }}>
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
          isVisible={this.state.isVisibleModal}
          onBackdropPress={this.onBackdropPress}
          component={
            <View style={styles.modal}>
              <View style={{flex : 7/10}}>
                <View style={styles.title}>
                  <View style={{flex : 8/10}}><Text style={commonStyles.textLarge}>Insert New Course</Text></View>
                  <TouchableOpacity 
                    onPress={() => {
                      this.props.submit(() => {
                        this.setState({ isVisibleModal: false });
                      });
                    }}
                  style={{alignItems : 'flex-end', flex : 2/10}}><Text style={commonStyles.textButton}>Submit</Text></TouchableOpacity>
                </View>
                <InputConponent onChangeText={(text) => { 
                  this.props.newCourse.courseName = text;
                }} label="Course Name" />
                <InputConponent onChangeText={(text) => {
                  this.props.newCourse.duration = text;
                }} label="Course Duration" />
                <DatePickerComponent
                  placeholder="Initiated day"
                  onDateChange={date => {
                    this.props.newCourse.initDay = date;
                  }}
                />
                <DatePickerComponent
                  placeholder="Ended day"
                  onDateChange={date => {
                    this.props.newCourse.endDay = date;
                  }}
                />
              </View>
              <Content style={{flex : 3/10,}}>
                <Panel  
                isPress={this.state.isPress}
                header={ ()=> (

                    <View style={styles.headerPanel}>
                      <Text>Select Course</Text>
                    </View>
                  
                )}
                // header={this.state.selectedCouse}
                >
                  <View style={{ position: 'absolute', zIndex: 999, top: moderateScale(-30), right : moderateScale(40), backgroundColor : commonColor.commonBackground, } }>
                    <Text style={commonStyles.lightText}>{this.state.selectedCouse}</Text>
                  </View>
                  {
                    Courses.map((value, index) => {
                      return this.renderCourseType(value, index);
                    })
                  }
                  
                </Panel>
              </Content>
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
    height: moderateScale(commonColor.deviceHeight * (3 / 4) + 20),
    paddingHorizontal: moderateScale(10),
    borderRadius: moderateScale(5)
  },
  pnTypeContact: {
    borderWidth: 0.5,
    borderColor: commonColor.cardBorderColor
  },
  btnTypeContact: {
    // flex : 1,
    alignItems: "center",
    borderRadius : moderateScale(10),
    marginTop : moderateScale(10),
    borderColor : commonColor.commonBackground,
    justifyContent: "flex-start",
    padding : moderateScale(10)
  },
  headerPanel : {
    paddingTop : moderateScale(10),
    paddingBottom: moderateScale(10),
    paddingLeft: moderateScale(10),
    marginRight : moderateScale(10),
    marginTop : moderateScale(10),
    backgroundColor : commonColor.commonBackground,
    flex : 1,
    borderRadius : moderateScale(10),
    
  },
  title : {
    alignItems : 'center',
    paddingTop : moderateScale(10),
    flexDirection: 'row',
    borderBottomWidth : 0.6,
    borderBottomColor : commonColor.cardBorderColor,
    paddingBottom : moderateScale(10)
  }
});
