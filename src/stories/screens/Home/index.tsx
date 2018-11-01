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
  Body,
  Right,
  List,
  ListItem,
  View,
  Picker,
  Form
} from "native-base";
import AwesomeButton from 'react-native-really-awesome-button';
import { Image, ImageBackground, TouchableOpacity } from "react-native";
import styles from "./styles";
import platform from './../../../theme/variables/platform';
import CommonColor from './../../../theme/variables/commonColor';
import Modal from "react-native-modal";
import commonColor from "./../../../theme/variables/commonColor";
 import ModalContainer from './../../../container/AttendanceContainer';
export interface Props {
  navigation: any;
  list: any;
}
export interface State {
  loading: boolean;
  text: any;
  blur : number;
  isVisibleModal : boolean;
}
class Home extends React.Component<Props, State> {
  interval : any;
  constructor(props){
    super(props);
    this.state = {
      loading : true,
      text : "click",
      blur : 0,
      isVisibleModal : false,
    }
    this.interval = setInterval(() => {
      this.setState({ blur: this.state.blur + 1 });
      if (this.state.blur > 10) {
        this.setState({ blur: 0 });
      }
    }, 300);
    this._toggleModal = this._toggleModal.bind(this);
    console.log('list', this.props.list);
  }
  componentDidMount() {
    
  }
  _toggleModal() {
    this.setState({
      isVisibleModal : !this.state.isVisibleModal
    })
  }
  render() {

    return (
      <Container style={styles.container}>
        <Header>
          <Left>
            <Button transparent>
              <Icon 
                active
                name="menu"
                onPress={() => this.props.navigation.navigate("DrawerOpen")}
              />
            </Button>
          </Left>
          <Body>
            <Title>Attendance</Title>
          </Body>
          <Right />
        </Header>
        <ModalContainer 
        _toggleModal={this._toggleModal}
        isVisibleModal={this.state.isVisibleModal}
        navigation={this.props.navigation}/>
        <ImageBackground 
          blurRadius={this.state.blur}
          style={{
            width : '100%',
            height : '100%',  
          }}
        source={require('./../../../../assets/java_background.jpg')}>
          
        <View style={{flex : 1, justifyContent : 'center', alignItems : 'center', position : 'absolute', left : platform.deviceWidth/2-50, top : platform.deviceHeight/2-80}}>
          <AwesomeButton
          style={{ }}
            progress={true}
            
            // disabled={this.state.loadding}
            textColor={CommonColor.titleFontColor}
            borderRadius={100}
            height={100}
            width={100}
            backgroundDarker={CommonColor.brandInfo}
              backgroundActive={CommonColor.brandPrimary}
              backgroundColor={CommonColor.brandPrimary}
            raiseLevel={5}
              backgroundShadow={CommonColor.brandInfo}
            textSize={30}
            onPress={(next) => {
              /** Do Something **/
              this._toggleModal();
              setTimeout(() => {
                this.setState({text: "ok", blur : 0});
                clearInterval(this.interval);
                next()
              }, 1000);
            }}
          >{this.state.text}</AwesomeButton>
        </View>
        </ImageBackground>
      </Container>
    );
  }
}

export default Home;
