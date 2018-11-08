import * as React from "react";
import {
  Container,
  Header,
  Title,
  Content,
  Text,
  Button,
  Icon,
  Left,
  Right,
  Body,
  Card,
  List
} from "native-base";

import { StyleSheet, View, TouchableOpacity } from "react-native";
import commonColor from "../../../theme/variables/commonColor";
import { moderateScale } from "react-native-size-matters";
import commonStyles from "../../../theme/variables/commonStyles";

export interface Props {
  navigation: any;
}
export interface State {}
class BlankPage extends React.Component<Props, State> {
  items: Array<{}>;
  constructor(props) {
    super(props);
    this.items = [
      {
        icon: (
          <Icon
            style={styles.icon}
            ios="ios-bookmarks-outline"
            android="md-bookmarks"
          />
        ),
        title: "All Courses"
      },
      {
        icon: (
          <Icon style={styles.icon} ios="ios-hand-outline" android="md-hand" />
        ),
        title: "Attendance"
      },
      {
        icon: (
          <Icon style={styles.icon} ios="logo-github" android="logo-github" />
        ),
        title: "My infomation"
      },
      {
        icon: (
          <Icon
            style={styles.icon}
            ios="ios-people-outline"
            android="md-people"
          />
        ),
        title: "View Staff"
      }
    ];
  }
  renderCard(value, index) {
    console.log(value);
    return (
      <TouchableOpacity
        onPress={() => {
          switch (value.title) {
            case "All Courses":
              this.props.navigation.navigate("Courses");
              break;
            case "Attendance":
              this.props.navigation.navigate("Home");
              break;

            default:
              break;
          }
        }}
        style={styles.card}
      >
        <View style={styles.cardTop}>{value.icon}</View>
        <View style={styles.cardBottom}>
          <Text style={styles.text}>{value.title}</Text>
        </View>
      </TouchableOpacity>
    );
  }
  render() {
    const param = this.props.navigation.state.params;
    return (
      <Container>
        <Header style={styles.header}>
          <Left>
            <Button
              transparent
              onPress={() => this.props.navigation.navigate("DrawerOpen")}
            >
              <Icon
                style={{ color: commonColor.whitebackground }}
                android="md-menu"
                ios="ios-menu-outline"
              />
            </Button>
          </Left>

          <Body style={{ flex: 3 }}>
            <Title style={commonStyles.lightText}>
              {param ? param.name.item : "Home"}
            </Title>
          </Body>

          <Right />
        </Header>

        <Content padder>
          <List style={styles.list}>
            {this.items.map((value, index) => {
              return this.renderCard(value, index);
            })}
          </List>
        </Content>
      </Container>
    );
  }
}

export default BlankPage;
const styles = StyleSheet.create({
  header: {
    backgroundColor: commonColor.brandPrimary
  },
  list: {
    flex: 1,
    flexWrap: "wrap",
    flexDirection: "row",
    justifyContent: "center"
  },
  card: {
    backgroundColor: commonColor.brandPrimary,
    width: moderateScale(120),
    height: moderateScale(120),
    margin: moderateScale(10),
    padding: 0,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.5,
    shadowRadius: 2,
    elevation: 1,
    borderRadius: 5
  },
  cardTop: {
    flex: 7 / 10,
    alignItems: "center",
    justifyContent: "center",
    borderBottomWidth: 0.7,
    borderBottomColor: commonColor.cardBorderColor
  },
  icon: {
    fontSize: moderateScale(70),
    color: commonColor.textColorWhite
  },
  cardBottom: {
    flex: 3 / 10,
    alignItems: "center"
  },
  text: {
    fontSize: commonColor.fontSizeH4,
    fontWeight: "200",
    color: commonColor.textColorWhite
  }
});
