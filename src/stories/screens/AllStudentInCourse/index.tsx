import * as React from "react";
import {
  View,
  Text,
  Container,
  Header,
  Content,
  List,
  Icon,
  ListItem,
  CardItem,
  Form,
  Textarea,
  Button
} from "native-base";
import HeaderComponent from "../../../component/HeaderComponent";
import commonStyles from "../../../theme/variables/commonStyles";
import { Student } from "../../../container/StudentAttendanceContainer.tsx/interface";
import ListItemComponent from "../CommonScreen/ListItem.component";
import commonColor from "../../../theme/variables/commonColor";
import { Image, StyleSheet, TouchableOpacity } from "react-native";
import { moderateScale } from "react-native-size-matters";
import { connect } from "react-redux";
import { NavigationService } from "../../../Services/NavigationService";
import Modal from "react-native-modal";
import InputConponent from "../../../component/InputConponent";
import FooterComponent from "../../../component/FooterComponent";
import { randomString } from "../../../Util/view.util";
import { Error } from "../../../container/AllStudentInCourseContainer";

export interface AllStudentProps {
  navigation: any;
  fieldOfStudent: Array<{}>;
  listStudentInCourse: Array<Student>;
  onSubmit: Function;
  error: Error;
}

export interface AllStudentState {
  isPopup: boolean;
}

class AllStudent extends React.Component<AllStudentProps, AllStudentState> {
  constructor(props) {
    super(props);
    this.state = {
      isPopup: false
    };
    this.renderStudentCard = this.renderStudentCard.bind(this);
    this.onPressAddNewStudent = this.onPressAddNewStudent.bind(this);
  }
  onPressAddNewStudent() {
    this.setState({ isPopup: true });
  }
  renderField(value, index) {
    return (
      <CardItem>
        <InputConponent
          error={this.props.error}
          placeholder={value.placeholder}
          label={value.label}
          onChangeText={value.onChangeText}
          navigation={this.props.navigation}
        />
      </CardItem>
    );
  }
  renderStudentCard(value: Student, index) {
    return (
      <ListItem key={index} style={styles.listItem}>
        <View style={styles.topCard}>
          <Image
            style={[commonStyles.imageNormal]}
            source={require("./../../../../assets/incognito_avatar.png")}
          />
          <View style={styles.name}>
            <Text
              style={[
                commonStyles.defaultText,
                { textAlign: "center", fontWeight: "bold" }
              ]}
            >
              {`${value.firstName} ${value.lastName}`}
            </Text>
          </View>
        </View>
        <View style={styles.bottomCard}>
          <View style={styles.hoc}>
            <Icon
              style={{
                fontSize: moderateScale(20),
                marginRight: moderateScale(5),
                color: commonColor.brandSuccess
              }}
              type="Ionicons"
              ios="ios-checkmark-circle-outline"
              android="md-checkmark-circle"
            />
            <Text style={styles.textSoBuoiHoc}>SO BUOI HOC: </Text>
            <Text style={{ color: commonColor.brandSuccess }}>45</Text>
          </View>
          <View style={styles.hoc}>
            <Icon
              style={{
                fontSize: moderateScale(20),
                marginRight: moderateScale(5),
                color: commonColor.brandDanger
              }}
              type="Ionicons"
              ios="ios-close-circle-outline"
              android="md-close-circle"
            />
            <Text style={styles.textSoBuoiHoc}>SO BUOI NGHI: </Text>
            <Text style={{ color: commonColor.brandDanger }}>5</Text>
          </View>
        </View>
      </ListItem>
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
                name="ios-arrow-back"
                style={{
                  color: commonColor.brandInfo,
                  marginRight: moderateScale(10)
                }}
              />
              <Text style={commonStyles.buttonText}>Student in Class</Text>
            </TouchableOpacity>
          }
          right={
            <TouchableOpacity onPress={this.onPressAddNewStudent}>
              <Icon
                style={{
                  fontSize: commonColor.fontSizeH2,
                  color: commonColor.brandInfo
                }}
                android="ios-person-add"
                ios="ios-person-add-outline"
              />
            </TouchableOpacity>
          }
        />
        {this.props.listStudentInCourse.length !== 0 ? (
          <Content>
            <List style={styles.list}>
              {this.props.listStudentInCourse &&
                this.props.listStudentInCourse.map((value, index) => {
                  return this.renderStudentCard(value, index);
                })}
            </List>
          </Content>
        ) : (
          <View style={styles.empty}>
            <Icon
              name="md-alert"
              style={{
                fontSize: moderateScale(commonColor.fontSizeH2),
                color: commonColor.brandWarning
              }}
            />
            <Text style={commonStyles.textNote}>
              List student in this course is empty
            </Text>
          </View>
        )}
        <Modal
          isVisible={this.state.isPopup}
          supportedOrientations={["portrait", "landscape"]}
          style={{ borderRadius: 10 }}
        >
          <View style={styles.modalLesson}>
            <CardItem bordered>
              <Text style={commonStyles.textButton}>Insert New Student</Text>
            </CardItem>
            <Content>
              {this.props.fieldOfStudent.map((value, index) => {
                return this.renderField(value, index);
              })}
            </Content>

            <FooterComponent
              style={{ backgroundColor: "transparent" }}
              navigation={this.props.navigation}
              left={
                <Button
                  onPress={() => {
                    this.props.onSubmit();
                    this.setState({ isPopup: false });
                  }}
                  block
                  style={{ height: moderateScale(40), marginRight: 10 }}
                >
                  <Text
                    style={{
                      padding: 10,
                      fontSize: moderateScale(commonColor.DefaultFontSize)
                    }}
                  >
                    Submit
                  </Text>
                </Button>
              }
              right={
                <Button
                  bordered
                  danger
                  block
                  style={{ height: moderateScale(40) }}
                  onPress={() => {
                    this.setState({ isPopup: false });
                    // this.props.navigation.goBack();
                  }}
                >
                  <Text
                    style={{
                      padding: 10,
                      fontSize: moderateScale(commonColor.DefaultFontSize)
                    }}
                  >
                    cancel
                  </Text>
                </Button>
              }
            />
          </View>
        </Modal>
      </Container>
    );
  }
}

const styles = StyleSheet.create({
  list: {
    flex: 1,
    flexDirection: "row",
    flexWrap: "wrap",
    alignItems: "center",
    justifyContent: "center"
  },
  listItem: {
    width: moderateScale(commonColor.deviceWidth / 2 - 50),
    height: moderateScale(commonColor.deviceWidth / 2 - 20),
    justifyContent: "center",
    flexDirection: "column",
    // alignItems: "center",
    margin: moderateScale(10),
    paddingRight: 0,
    padding: 0,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.5,
    shadowRadius: 2,
    elevation: 1,
    backgroundColor: commonColor.whitebackground,
    borderRadius: 5
  },
  topCard: {
    flex: 7 / 10,
    flexWrap: "wrap",
    borderBottomWidth: 0.6,
    borderBottomColor: commonColor.cardBorderColor,
    alignItems: "center",
    justifyContent: "center"
  },
  bottomCard: {
    flex: 3 / 10,
    paddingTop: moderateScale(10)
  },
  name: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginHorizontal: moderateScale(10)
  },
  hoc: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center"
  },
  textSoBuoiHoc: {
    fontSize: moderateScale(10)
  },
  header: {
    backgroundColor: commonColor.brandPrimary
  },
  leftItem: {
    flex: 8 / 10,
    flexDirection: "row"
  },
  modalLesson: {
    backgroundColor: commonColor.whitebackground,
    height: moderateScale(450),
    borderRadius: 10
  },
  textArea: {
    marginHorizontal: moderateScale(10)
  },
  empty: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center"
  }
});

function bindAction(dispatch) {
  return {};
}

const mapStateToProps = store => ({
  listStudentInCourse: store.attendanceReducer.studentsByIdCourse
});
export default connect(
  mapStateToProps,
  bindAction
)(AllStudent);
