import React, { Component } from 'react';
import { Header, Title, Button, Icon, Left, Body, Right, View, Picker, Form, Spinner } from "native-base";
import Modal from "react-native-modal";
import commonColor from "./../../../theme/variables/commonColor";
export default class ModalScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isVisibleModal: true,
            selected: '',
        };
        this.renderPickerItem = this.renderPickerItem.bind(this);
    }
    renderPickerItem(value, index) {
        return (
        // <Picker.Item key={index} label={value.courseName} value={value.courseId} />
        React.createElement(Picker.Item, { key: index, label: value.courseName, value: value.courseId }));
    }
    onLayout(e) {
        var { x, y, width, height } = e.nativeEvent.layout;
        console.log(width, height);
    }
    render() {
        return (React.createElement(Modal, { onSwipe: () => {
                console.log('swiper');
                this.props._toggleModal();
            }, swipeDirection: "down", supportedOrientations: ['portrait', 'landscape'], style: { borderRadius: 10 }, isVisible: this.props.isVisibleModal },
            React.createElement(View, { style: { flex: 5 / 10, backgroundColor: commonColor.brandPrimary, borderRadius: 10, alignItems: 'center', justifyContent: 'center' } },
                React.createElement(Form, null,
                    React.createElement(Picker, { onLayout: (e) => this.onLayout(e), onTouchStart: () => { console.log('touch'); }, textStyle: { color: commonColor.segmentTextColor }, placeholder: "bạn muốn điểm danh lớp nào?", placeholderStyle: { color: commonColor.segmentTextColor }, renderHeader: backAction => React.createElement(Header, { style: { backgroundColor: commonColor.brandPrimary } },
                            React.createElement(Left, null,
                                React.createElement(Button, { transparent: true, onPress: backAction },
                                    React.createElement(Icon, { name: "arrow-back", style: { color: "#fff" } }))),
                            React.createElement(Body, { style: { flex: 3 } },
                                React.createElement(Title, { style: { color: "#fff" } }, "Your Header")),
                            React.createElement(Right, null)), mode: "dropdown", iosIcon: React.createElement(Icon, { style: { color: commonColor.segmentTextColor }, name: "ios-arrow-down-outline" }), selectedValue: this.props.selectedValue, onValueChange: (value) => this.props.onValueChange(value) }, this.props.listCourses && this.props.listCourses.map((value, index) => {
                        return this.renderPickerItem(value, index);
                    })),
                    React.createElement(Spinner, { style: { position: 'absolute', top: 50, left: commonColor.deviceWidth / 4 }, color: 'red', animating: this.props.messageFetchCourses === '' ? true : false })))));
    }
}
//# sourceMappingURL=index.js.map