import React, { Component } from "react";
import {
    Text,
    View,
    Keyboard,
    TouchableOpacity,
    ImageBackground
} from "react-native";
import {
    backgroundColorStatus,
    styleAll,
    fontFamily
} from "./FixVars";
import Icon from "react-native-vector-icons/FontAwesome";
import { Actions } from "react-native-router-flux";

class MenuTopBar extends Component {
    constructor(props) {
        super(props);

        this.state = {
            keyShow: false
        };
    }

    componentDidMount() {
        Keyboard.addListener("keyboardDidShow", () =>
            this.setState({ keyShow: true })
        );
        Keyboard.addListener("keyboardDidHide", () =>
            this.setState({ keyShow: false })
        );
    }

    _renderBtnMenu = (icon, onpress) => (
        <TouchableOpacity style={{ padding: 20, flexDirection: "row" }} onPress={() => { onpress(); }}>
            <Icon name={icon} style={[styleAll.buttonTextNormal, { color: backgroundColorStatus }]} />
        </TouchableOpacity>
    );

    render() {
        return (
            <View style={{}}>
                <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center", elevation: 3, marginBottom: 1, backgroundColor: 'white' }}>

                    {this.props.backBtn && <TouchableOpacity style={{ padding: 20, paddingRight: 0, marginRight: -10, flexDirection: "row" }}
                        onPress={() => Actions.pop()}>
                        <Icon name={'chevron-left'} style={[styleAll.buttonTextNormal, { color: backgroundColorStatus }]} />
                    </TouchableOpacity>}

                    <ImageBackground resizeMode="contain"
                        source={require("./src/ic_launcher.png")}
                        style={{ height: 40, width: 40, alignSelf: 'center', marginLeft: 20 }}>
                    </ImageBackground>

                    <View style={{ flexDirection: "row", flex: 1, justifyContent: "space-between" }} >

                        {this.props.search && <TouchableOpacity style={{ padding: 10, paddingRight: 0, flexDirection: "row", flex: 1 }} onPress={() => this.props.search()}>
                            <Text style={[styleAll.buttonTextNormal, { fontFamily: fontFamily, color: backgroundColorStatus, flex: 1 }]}>
                                {(!this.props.showSearch) ? this.props.title : 'Opções a baixo'}
                            </Text>
                            <Icon name={(!this.props.showSearch) ? 'search' : 'times'} style={[styleAll.buttonTextNormal, { color: backgroundColorStatus }]} />
                        </TouchableOpacity>}

                        {!this.props.search && <View style={{ padding: 10, paddingRight: 0, flexDirection: "row", flex: 1 }}>
                            <Text style={[styleAll.buttonTextNormal, { color: backgroundColorStatus, flex: 1 }]}>
                                {this.props.title}
                            </Text>
                        </View>}

                        {this._renderBtnMenu(this.props.isOpen ? "times" : "bars", () =>
                            this.props._openDraw()
                        )}
                    </View>
                </View>
            </View>
        );
    }
}

export default MenuTopBar;
