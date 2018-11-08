import * as React from "react";
import FunctionPage from "../../stories/screens/FunctionPage";
export interface Props {
  navigation: any;
}
export interface State {}
export default class BlankPageContainer extends React.Component<Props, State> {
  render() {
    return <FunctionPage navigation={this.props.navigation} />;
  }
}
