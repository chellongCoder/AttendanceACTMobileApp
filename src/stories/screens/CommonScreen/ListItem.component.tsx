import React, { Component } from 'react'
import { ListItem, Text,Icon, Left, Body, Right } from 'native-base';
import {Course} from './../../../container/StudentListContainer';
export interface Props {
  navigation: any;
  student: Course;
  selectedItem: Function;
  key? : number;
}
export interface State { 
    selected : boolean;
}

export default class ListItemComponent extends Component<Props, State> {
    constructor(props) {
        super(props);
        this.state = {
            selected : false
        }
        this.onPress = this.onPress.bind(this);
    }
    onPress(student) {
        this.setState({selected : !this.state.selected})
        this.props.selectedItem(student);
    }
    render() {
        return (
            <ListItem
            key={this.props.key}
            onPress={()=>this.onPress(this.props.student)}
                selected={this.state.selected}
            >
               <Left>
                    <Text>{`${this.props.student.firstName} ${this.props.student.lastName}`}</Text>
               </Left>
               <Body/>
               <Right>
                    <Right>
                    <Icon name="arrow-forward" />
                </Right>
               </Right>
            </ListItem>
        );
    }
}