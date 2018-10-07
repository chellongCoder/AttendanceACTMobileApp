import React, { Component } from "react";
import StudentListScreen from "./../../stories/screens/StudentList";
import { connect } from "react-redux";
class StudentListContainer extends Component {
    constructor(props) {
        super(props);
        this.state = {};
        this.selectedItem = this.selectedItem.bind(this);
    }
    selectedItem(student) {
        console.log('student', student);
    }
    render() {
        return (React.createElement(StudentListScreen, { selectedItem: this.selectedItem, listStudentByCourses: this.props.listStudentByCourses, navigation: this.props.navigation }));
    }
}
function bindAction(dispatch) {
    return {};
}
function mapStateToProps(store) {
    return {
        listStudentByCourses: store.courseReducer.studentsByIdCourse
    };
}
export default connect(mapStateToProps, bindAction)(StudentListContainer);
//# sourceMappingURL=index.js.map