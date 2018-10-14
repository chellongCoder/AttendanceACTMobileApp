import React, { Component } from 'react';
import LessonScreen from './../../stories/screens/LessonScreen';
import { connect } from 'react-redux'

export interface Props {
    navigation: any;
}
export interface State {
  isVisibleModal: boolean;
}
 class LessonContainer extends Component<Props, State> {
    constructor(props) {
        super(props);
        this.state = {
            isVisibleModal : true,
        }
        this._toggleModal = this._toggleModal.bind(this);
    }
    _toggleModal() {
        this.setState({isVisibleModal : !this.state.isVisibleModal});
    }
  render() {
    return (
      <LessonScreen 
      _toggleModal={this._toggleModal}
      isVisibleModal={this.state.isVisibleModal}
      navigation={this.props.navigation}/>
    )
  }
}

function bindAction(dispatch) {
    return {

    };
}
function mapStateToProps(store) {
    return {
        selectedCourse: store.courseReducer.selec
    };
}
export default connect(
  mapStateToProps,
  bindAction
)(LessonContainer);