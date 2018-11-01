import React, { Component } from "react";
import { Text, View, StyleSheet, Image } from "react-native";
import { Container, Content, List, ListItem, Title, Icon } from "native-base";
import HeaderComponent from "../../../component/HeaderComponent";
import commonStyles from "../../../theme/variables/commonStyles";
import { moderateScale } from "react-native-size-matters";
import commonColor from "../../../theme/variables/commonColor";
import { Student } from "../../../container/StudentAttendanceContainer.tsx/interface";
export interface Props {
  navigation: any;
  listStudent : Array<Student>
}
export interface State {}
export class StudentAttendance extends Component<Props, State> {
  renderStudentCard(value : Student, index) {
    return (
      <ListItem style={styles.listItem}>
      <View style={styles.topCard}>
          <Image
            style={[commonStyles.imageNormal]}
            source={require("./../../../../assets/incognito_avatar.png")}
          />
          <View style={styles.name}>
            <Text
              style={[commonStyles.defaultText, { textAlign: "center" , fontWeight: 'bold'}]}
            >
              {`${value.firstName} ${value.lastName}`}
            </Text>
          </View>
        </View>
        <View style={styles.bottomCard}>
          <View style={styles.hoc}>
            <Icon style={{fontSize: moderateScale(20), marginRight: moderateScale(5), color : commonColor.brandSuccess}} type="Ionicons" ios="ios-checkmark-circle-outline" android="md-checkmark-circle"/>
            <Text style={styles.textSoBuoiHoc}>SO BUOI HOC: </Text>
            <Text style={{color : commonColor.brandSuccess}}>45</Text>
          </View>
          <View style={styles.hoc}>
            <Icon style={{fontSize: moderateScale(20), marginRight: moderateScale(5), color : commonColor.brandSuccess}} type="Ionicons" ios="ios-close-circle-outline" android="md-close-circle"/>
            <Text style={styles.textSoBuoiHoc}>SO BUOI NGHI: </Text>
            <Text style={{color : commonColor.brandDanger}}>5</Text>
          </View>
        </View>
      </ListItem>
    )
  }
  render() {
    return (
      <Container>
        <HeaderComponent
          navigation={this.props.navigation}
          left={
            <View>
              <Text style={commonStyles.buttonText}>Student in Class</Text>
            </View>
          }
        />
        <Content>
          <List style={styles.list}>
              {
                this.props.listStudent && this.props.listStudent.map((value, index)=>{
                  return this.renderStudentCard(value, index);
                })
              }
            
           
          </List>
        </Content>
      </Container>
    );
  }
}

export default StudentAttendance;

const styles = StyleSheet.create({
  list: {
    flex: 1,
    flexDirection: "row",
    flexWrap: "wrap",
    textAlign: "auto",
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
  hoc : {
    flex : 1,
     flexDirection: 'row',
     alignItems : 'center',
     justifyContent : 'center'
  },
  textSoBuoiHoc: {
    fontSize : moderateScale(10)
  }
});
