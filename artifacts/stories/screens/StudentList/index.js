import React, { Component } from 'react';
import { Container, Header, Content, List, Text, Left, Right, Body, Footer, Button } from "native-base";
import ListItemComponent from './../CommonScreen/ListItem.component';
export default class StudentListScreen extends Component {
    constructor(props) {
        super(props);
        this.renderItemStudent = this.renderItemStudent.bind(this);
    }
    renderItemStudent(value, index) {
        return (React.createElement(ListItemComponent, { selectedItem: this.props.selectedItem, student: value, navigation: this.props.navigation }));
    }
    render() {
        return (React.createElement(Container, null,
            React.createElement(Header, null,
                React.createElement(Left, null,
                    React.createElement(Text, null, "Student List")),
                React.createElement(Body, null),
                React.createElement(Right, null)),
            React.createElement(Content, null,
                React.createElement(List, null, this.props.listStudentByCourses.map((value, index) => {
                    return this.renderItemStudent(value, index);
                }))),
            React.createElement(Footer, null,
                React.createElement(Button, null,
                    React.createElement(Text, null, "click")))));
    }
}
//# sourceMappingURL=index.js.map