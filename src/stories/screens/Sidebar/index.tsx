import * as React from "react";
import { Text, Container, List, Header, ListItem, Content, Title } from "native-base";
import { NavigationActions } from "react-navigation";
import {Image} from 'react-native';
import {Object} from './../../../container/SidebarContainer';

const routes = [
	{
		route: "Home",
		caption: "Home",
	},
	{
		route: "BlankPage",
		caption: "Blank Page",
	},
	{
		route: "Login",
		caption: "Logout",
	},
];

export interface Props {
	navigation: any;
	user?: Object
}
export interface State {}
const resetAction = NavigationActions.reset({
	index: 0,
	actions: [NavigationActions.navigate({ routeName: "Login" })],
});
export default class Sidebar extends React.Component<Props, State> {
	render() {
		return (
			<Container>
				<Header style={{height : 200, flexDirection : 'column', alignItems : 'center'}}>
					<Image
						style={{ width: 100, height: 100 }}
						source={{ uri: this.props.user.photoURL }} />
					<Title>{this.props.user.displayName}</Title>
					<Text>{this.props.user.email}</Text>
				</Header>
				<Content>
					<List
						style={{ marginTop: 40 }}
						dataArray={routes}
						renderRow={data => {
							return (
								<ListItem
									button
									onPress={() => {
										data.route === "Login"
											? this.props.navigation.dispatch(resetAction)
											: this.props.navigation.navigate(data.route);
									}}
								>
									<Text>{data.caption}</Text>
								</ListItem>
							);
						}}
					/>
				</Content>
			</Container>
		);
	}
}
