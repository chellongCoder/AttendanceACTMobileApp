import React, { Component } from "react";
import { Text, View, StyleSheet, Image } from "react-native";
import { Container, Content, List, ListItem, Title, Icon } from "native-base";
import HeaderComponent from "../../../component/HeaderComponent";
import commonStyles from "../../../theme/variables/commonStyles";
import { moderateScale } from "react-native-size-matters";
import commonColor from "../../../theme/variables/commonColor";
export interface Props {
  navigation: any;
}
export interface State {}
export class StudentAttendance extends Component<Props, State> {
  render() {
    return (
      <Container>
        <HeaderComponent
          navigation={this.props.navigation}
          left={
            <View style={styles.topCard}>
              <Text style={commonStyles.buttonText}>Student in Class</Text>
            </View>
          }
        />
        <Content>
          <List style={styles.list}>
            <ListItem style={styles.listItem}>
             <View style={styles.topCard}>
            
                 <Image 
                 style={[commonStyles.imageNormal]}
                 source={require('./../../../../assets/incognito_avatar.png')}/>
                  <Title>nguyen nhat long</Title>
             </View>
             <View style={styles.bottomCard}>
                 <Text>bottom</Text>
             </View>
            </ListItem>
            <ListItem style={styles.listItem}>
              <Text>hello</Text>
            </ListItem>
            <ListItem style={styles.listItem}>
              <Text>hello</Text>
            </ListItem>
            <ListItem style={styles.listItem}>
              <Text>hello</Text>
            </ListItem>
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
    alignItems: "center",
    justifyContent: "center"
  },
  listItem: {
    width: moderateScale(commonColor.deviceWidth / 2 - 50),
    height: moderateScale(commonColor.deviceWidth / 2 - 20),
    justifyContent: "center",
    flexDirection: 'column',
    // alignItems: "center",
    margin: moderateScale(10),
    paddingRight : 0,
    padding : 0,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.5,
    shadowRadius: 2,
    elevation: 1,
    backgroundColor : commonColor.whitebackground,
    borderRadius : 5
  },
  topCard : {
      flex : 7/10,
      borderBottomWidth : 0.6,
      borderBottomColor : commonColor.cardBorderColor,
      alignItems : 'center',
      justifyContent : 'center'
  },
  bottomCard : {
      flex : 3/10,
  }
});
