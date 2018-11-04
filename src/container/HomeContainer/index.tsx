import * as React from "react";
import { connect } from "react-redux";
import Home from "../../stories/screens/Home";
import datas from "./data";
import { fetchList } from "./actions";
export interface Props {
  navigation: any;
  fetchList: Function;
  data: Object;
}
export interface State {}
class HomeContainer extends React.Component<Props, State> {
  constructor(props) {
    super(props);
    console.log("data", this.props.data);
  }
  componentDidMount() {
    this.props.fetchList(datas);
  }
  render() {
    console.log("redeer", this.props.data);
    return <Home navigation={this.props.navigation} list={this.props.data} />;
  }
}

function bindAction(dispatch) {
  return {
    fetchList: url => dispatch(fetchList(url))
  };
}

const mapStateToProps = state => ({
  data: state.homeReducer.list,
  isLoading: state.homeReducer.isLoading
});
export default connect(
  mapStateToProps,
  bindAction
)(HomeContainer);
