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
    Spinner,
    Item,
    Label,
    Input,
    DatePicker
} from "native-base";
import Modal from "react-native-modal";
import commonColor from '../../../theme/variables/commonColor';
import HeaderComponent from '../../../component/HeaderComponent';
import commonStyles from '../../../theme/variables/commonStyles';
export interface Props {
    navigation: any;
    isVisibleModal : boolean;
    _toggleModal : Function;
}
export interface State {
    chosenDate : Date;
}
export default class LessonScreen extends Component<Props, State> {
    constructor(props) {
        super(props);
        this.state = { chosenDate: new Date() };
        this.setDate = this.setDate.bind(this);
    }
    setDate(newDate) {
        this.setState({ chosenDate: newDate });
    }
  render() {
    return (
        <Container>
            <HeaderComponent 
                navigation={this.props.navigation}
                left={(
                    <View>
                        <Text style={commonStyles.buttonText}>Lesson</Text>
                    </View>
                )}
            />
        </Container>
        // <Modal
        //     onSwipe={() => {
        //         console.log('swiper');
        //         this.props._toggleModal();
        //     }}

        //     swipeDirection="down"
        //     supportedOrientations={['portrait', 'landscape']}
        //     style={{ borderRadius: 10 }}

        //     isVisible={this.props.isVisibleModal}>
        //     <View style={{ flex:  8/10, backgroundColor:commonColor.brandPrimary }}>
        //         <Content>
        //         <Form style={{marginHorizontal : 20}}>
        //             <Item 
        //             floatingLabel>
        //                 <Label style={{color : commonColor.segmentTextColor,}}>Tiêu đề khoá học</Label>
        //                 <Input style={{margin : 0, padding : 0}} />
        //             </Item>
        //             <Item style={{paddingTop : 20}}>
        //                     <Label style={{ color: commonColor.segmentTextColor,}}>Ngày Học</Label>
        //                     <DatePicker           
        //                         defaultDate={new Date(2018, 4, 4)}
        //                         minimumDate={new Date(2018, 1, 1)}
        //                         maximumDate={new Date(2018, 12, 31)}
        //                         locale={"vi"}
        //                         timeZoneOffsetInMinutes={undefined}
        //                         modalTransparent={true}
        //                         animationType={"fade"}
        //                         androidMode={"default"}
        //                         placeHolderText={this.state.chosenDate.toString().substr(4, 20)}
        //                         textStyle={{ color: commonColor.segmentTextColor }}
        //                         placeHolderTextStyle={{ color: "#d3d3d3" }}
        //                         onDateChange={this.setDate}
        //                     />
        //                 </Item>
        //                 <Item>
        //                     <Input placeholderTextColor={commonColor.segmentTextColor} placeholder="asdasd" disabled/>
        //                 </Item>
                    
                    
        //         </Form>
        //         </Content>
        //     </View>
        // </Modal>
    )
  }
}
