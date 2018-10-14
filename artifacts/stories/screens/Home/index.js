import * as React from "react";
import { Container, Header, Title, Button, Icon, Left, Body, Right, View } from "native-base";
import AwesomeButton from 'react-native-really-awesome-button';
import { ImageBackground } from "react-native";
import styles from "./styles";
import platform from './../../../theme/variables/platform';
import CommonColor from './../../../theme/variables/commonColor';
import ModalContainer from './../../../container/CoursesCotainer';
class Home extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: true,
            text: "click",
            blur: 0,
            isVisibleModal: false,
        };
        this.interval = setInterval(() => {
            this.setState({ blur: this.state.blur + 1 });
            if (this.state.blur > 10) {
                this.setState({ blur: 0 });
            }
        }, 300);
        this._toggleModal = this._toggleModal.bind(this);
    }
    componentDidMount() {
    }
    _toggleModal() {
        this.setState({
            isVisibleModal: !this.state.isVisibleModal
        });
    }
    render() {
        return (React.createElement(Container, { style: styles.container },
            React.createElement(Header, null,
                React.createElement(Left, null,
                    React.createElement(Button, { transparent: true },
                        React.createElement(Icon, { active: true, name: "menu", onPress: () => this.props.navigation.navigate("DrawerOpen") }))),
                React.createElement(Body, null,
                    React.createElement(Title, null, "Home")),
                React.createElement(Right, null)),
            React.createElement(ModalContainer, { _toggleModal: this._toggleModal, isVisibleModal: this.state.isVisibleModal, navigation: this.props.navigation }),
            React.createElement(ImageBackground, { blurRadius: this.state.blur, style: {
                    width: '100%',
                    height: '100%',
                }, source: require('./../../../../assets/java_background.jpg') },
                React.createElement(View, { style: { flex: 1, justifyContent: 'center', alignItems: 'center', position: 'absolute', left: platform.deviceWidth / 2 - 50, top: platform.deviceHeight / 2 - 80 } },
                    React.createElement(AwesomeButton, { style: {}, progress: true, 
                        // disabled={this.state.loadding}
                        textColor: CommonColor.titleFontColor, borderRadius: 100, height: 100, width: 100, backgroundDarker: CommonColor.brandInfo, backgroundActive: CommonColor.brandPrimary, backgroundColor: CommonColor.brandPrimary, raiseLevel: 5, backgroundShadow: CommonColor.brandInfo, textSize: 30, onPress: (next) => {
                            /** Do Something **/
                            this._toggleModal();
                            setTimeout(() => {
                                this.setState({ text: "ok", blur: 0 });
                                clearInterval(this.interval);
                                next();
                            }, 1000);
                        } }, this.state.text)))));
    }
}
export default Home;
//# sourceMappingURL=index.js.map