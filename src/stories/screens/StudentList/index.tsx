import React, { Component } from 'react'
import {View, } from 'react-native';
import {
  Container,
  Header,
  Content,
  List,
  ListItem,
  Text,
  Left,
  Right,
  Icon,
  Body,
  Footer,
  Button
} from "native-base";
import ListItemComponent from './../CommonScreen/ListItem.component';
export interface Props {
  navigation: any;
  listStudentByCourses : Array<{}>;
  selectedItem : Function
}
export interface State {
}

export default class StudentListScreen extends Component<Props, State> {
    constructor(props) {
        super(props);
        this.renderItemStudent = this.renderItemStudent.bind(this);

    }

    renderItemStudent(value, index) {
        return (
            <ListItemComponent
            key={index} 
            selectedItem={this.props.selectedItem}
            student={value}
            navigation={this.props.navigation}/>
            // <ListItem 
            // key={index}
            // onPress={()=>{
            //     this.setState({selectedItem : !this.state.selectedItem})
            // }}
            // selected={this.state.selectedItem}>
            //     <Left>
            //         <Text>{value.courseName}</Text>
            //     </Left>
            //     <Right>
            //         <Icon name="arrow-forward" />
            //     </Right>
            // </ListItem>
        )
    }
  render() {
    return (
      <Container>
          <Header>
              <Left>
                    <Text>Student List</Text>
              </Left>
              <Body/>
              <Right/>
          </Header>
          <Content>
                <List>
                    {
                        this.props.listStudentByCourses.map((value , index)=>{
                            return this.renderItemStudent(value, index);
                        })
                    }
                </List>

          </Content>
          <Footer>
              <Button>
                  <Text>click</Text>
              </Button>
          </Footer>
      </Container>
    )
  }
}
