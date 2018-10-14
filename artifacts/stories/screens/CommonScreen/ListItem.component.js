import React, { Component } from 'react';
import { ListItem, Text, Icon, Left, Body, Right } from 'native-base';
export default class ListItemComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            selected: false
        };
        this.onPress = this.onPress.bind(this);
    }
    onPress(student) {
        this.setState({ selected: !this.state.selected });
        this.props.selectedItem(student);
    }
    render() {
        return (React.createElement(ListItem, { onPress: () => this.onPress(this.props.student), selected: this.state.selected },
            React.createElement(Left, null,
                React.createElement(Text, null, `${this.props.student.firstName} ${this.props.student.lastName}`)),
            React.createElement(Body, null),
            React.createElement(Right, null,
                React.createElement(Right, null,
                    React.createElement(Icon, { name: "arrow-forward" })))));
    }
}
//# sourceMappingURL=ListItem.component.js.map