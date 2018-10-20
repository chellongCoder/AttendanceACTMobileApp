import React, { Component } from 'react'
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
    Form,
    Spinner
} from "native-base";
import Modal from "react-native-modal";
import commonColor from "./../../../theme/variables/commonColor";
export interface Props {
  navigation: any;
  onValueChange: Function;
  onPress: Function;
  listCourses: Array<{}>;
  selectedValue : string;
  messageFetchCourses : string;
  isVisibleModal : boolean;
  _toggleModal : Function;
}
export interface State {
  isVisibleModal: boolean;
  selected : any;
}
export default class ModalScreen extends Component<Props, State> {
    constructor(props) {
        super(props);
        this.state = {
            isVisibleModal : true,
            selected : '',
        }
        this.renderPickerItem = this.renderPickerItem.bind(this);
    }
    renderPickerItem(value, index) {
        return (
            // <Picker.Item key={index} label={value.courseName} value={value.courseId} />
            <Picker.Item key={index} label={value.courseName} value={value.courseId}/>
              
        )
    }
    onLayout(e) {
        var { x, y, width, height } = e.nativeEvent.layout;
        console.log(width , height);
    }
  render() {

    return (
        <Modal
            onSwipe={()=>{
                console.log('swiper');
                this.props._toggleModal()
            }}
            
            swipeDirection="down"
            supportedOrientations={['portrait', 'landscape']}
            style={{ borderRadius: 10}}

            isVisible={this.props.isVisibleModal}>
            <View style={{ flex: 5 / 10, backgroundColor: commonColor.brandPrimary, borderRadius: 10, alignItems: 'center', justifyContent: 'center' }}>
                    
                    <Form>    
                        <Picker
                        onLayout={(e)=>this.onLayout(e)}
                        onTouchStart={()=>{console.log('touch')}}
                        textStyle={{color : commonColor.segmentTextColor}}
                        placeholder="bạn muốn điểm danh lớp nào?"
                        placeholderStyle={{ color: commonColor.segmentTextColor}}
                            renderHeader={backAction =>
                                <Header style={{ backgroundColor: commonColor.brandPrimary }}>
                                    <Left>
                                        <Button transparent onPress={backAction}>
                                            <Icon name="arrow-back" style={{ color: "#fff" }} />
                                        </Button>
                                    </Left>
                                    <Body style={{ flex: 3 }}>
                                        <Title style={{ color: "#fff" }}>Your Header</Title>
                                    </Body>
                                    <Right />
                                </Header>}
                            mode="dropdown"
                            iosIcon={<Icon style={{color : commonColor.segmentTextColor}} name="ios-arrow-down-outline" />}
                            selectedValue={this.props.selectedValue}
                            onValueChange={(value)=>this.props.onValueChange(value)}
                        >
                        {
                            this.props.listCourses && this.props.listCourses.map((value, index)=>{
                                return this.renderPickerItem(value, index)
                            })
                        }
                        </Picker>
                    <Spinner style={{position: 'absolute', top : 50, left : commonColor.deviceWidth/4}} color='red' animating={this.props.messageFetchCourses==='' ? true : false}/>
                        {/* <Button
                            danger
                            onPress={()=>this.props.onPress()}
                        >
                            <Text>oksd</Text>
                        </Button> */}
                    </Form>
                
            </View>
        </Modal>
    )
  }
}
