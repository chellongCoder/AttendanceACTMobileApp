import React, { Component } from "react";
import { View, StyleSheet } from "react-native";
import {
  Container,
  Header,
  Content,
  List,
  ListItem,
  Text,
  Left,
  Right,
  Icon,
  Body,
  Footer,
  Button,
  CardItem,
  Form,
  Textarea,
  Item
} from "native-base";
import ListItemComponent from "./../CommonScreen/ListItem.component";
import LessonScreenContainer from "./../../../container/LessonContainer";
import { moderateScale } from "react-native-size-matters";
import commonColor from "../../../theme/variables/commonColor";
import FooterComponent from "../../../component/FooterComponent";
import commonStyles from "../../../theme/variables/commonStyles";
import { Student } from "../../../container/StudentAttendanceContainer.tsx/interface";
import Modal from "react-native-modal";
import InputConponent from "../../../component/InputConponent";

export interface Props {
  navigation: any;
  listStudentByCourses: Array<{}>;
  selectedItem: Function;
  submitStudentInClass: Function;
  onChangeLessonTitle: Function;
  onChangeNote: Function;
  onSubmit: Function;
}
export interface State {
  isPopup: boolean;
}

export default class StudentListScreen extends Component<Props, State> {
  constructor(props) {
    super(props);
    this.state = {
      isPopup: false
    };
    this.renderItemStudent = this.renderItemStudent.bind(this);
  }

  componentDidMount = () => {
    if (!this.state.isPopup) {
      setTimeout(() => {
        this.setState({ isPopup: true });
      }, 500);
    }
  };

  renderItemStudent(value: Student, index) {
    return (
      <ListItemComponent
        left={
          <View style={styles.leftItem}>
            <Icon
              style={{ fontSize: commonColor.fontSizeH2 }}
              type="Ionicons"
              name="logo-reddit"
            />
            <Text>{`${value.firstName} ${value.lastName}`}</Text>
          </View>
        }
        right={
          <View>
            <Icon
              style={{ color: commonColor.brandSuccess }}
              android="md-checkmark"
              ios="ios-checkmark-outline"
            />
          </View>
        }
        key={index}
        selectedItem={this.props.selectedItem}
        student={value}
        navigation={this.props.navigation}
      />
    );
  }

  render() {
    return (
      <Container>
        <Header style={styles.header}>
          <Left>
            <Text style={commonStyles.lightText}>Student List</Text>
          </Left>
          <Body />
          <Right />
        </Header>
        <Content>
          <List>
            {this.props.listStudentByCourses.map((value, index) => {
              return this.renderItemStudent(value, index);
            })}
          </List>
        </Content>
        <Modal
          isVisible={this.state.isPopup}
          supportedOrientations={["portrait", "landscape"]}
          style={{ borderRadius: 10 }}
        >
          <View style={styles.modalLesson}>
            <CardItem bordered>
              <Text style={commonStyles.textButton}>What's New Lesson?</Text>
            </CardItem>
            <CardItem>
              <InputConponent onChangeText={this.props.onChangeLessonTitle} />
            </CardItem>
            <Form style={styles.textArea}>
              <Textarea
                onChangeText={this.props.onChangeNote}
                rowSpan={5}
                bordered
                placeholder="Textarea"
              />
            </Form>
            <FooterComponent
              style={{ backgroundColor: "transparent" }}
              navigation={this.props.navigation}
              left={
                <Button
                  onPress={this.props.onSubmit}
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
                    this.props.navigation.goBack();
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
        <FooterComponent
          left={
            <Button
              block
              style={{ height: moderateScale(40), marginRight: 10 }}
            >
              <Text
                style={{
                  padding: 10,
                  fontSize: moderateScale(commonColor.DefaultFontSize)
                }}
              >
                Check in
              </Text>
            </Button>
          }
          right={
            <Button
              bordered
              danger
              block
              style={{ height: moderateScale(40) }}
              onPress={() => this.props.navigation.goBack()}
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
          style={{ height: moderateScale(60) }}
          navigation={this.props.navigation}
        />
      </Container>
    );
  }
}

const styles = StyleSheet.create({
  header: {
    backgroundColor: commonColor.brandPrimary
  },
  leftItem: {
    flex: 8 / 10,
    flexDirection: "row"
  },
  modalLesson: {
    backgroundColor: commonColor.whitebackground,
    height: commonColor.deviceHeight / 2,
    borderRadius: 10
  },
  textArea: {
    marginHorizontal: moderateScale(10)
  }
});
