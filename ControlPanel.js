import React, { Component } from 'react';
import { Text, View, TouchableOpacity, ScrollView, ImageBackground } from 'react-native';
import { Actions } from 'react-native-router-flux';
import Icon from 'react-native-vector-icons/FontAwesome';
import { backgroundColorStatus, _infoUser, styleAll } from './FixVars';

class ControlPanel extends Component {

    constructor(props) {
        super(props);

        this.state = {
            drawerPanel: new Array()
        }
    }

    componentDidMount() {
        console.log("drawerPanel", _infoUser);

        if (_infoUser && _infoUser.drawerPanel) {
            this.setState({ drawerPanel: _infoUser.drawerPanel })
        }
    }

    _renderBtnMenu = (key, text, icon, onpress) =>
        <TouchableOpacity key={key}
            style={[{ flexDirection: 'row', padding: 10, flex: 1, justifyContent: 'flex-end', marginBottom: 6 }]}
            onPress={() => { this.props._closeDraw(); onpress() }}>
            <Text style={[styleAll.textNormal, { color: backgroundColorStatus }]}>{text}</Text>
            {icon && <Icon name={icon} style={[styleAll.buttonTextNormal, { color: backgroundColorStatus, marginLeft: 10 }]} />}
        </TouchableOpacity>

    render = () =>
        <View
            style={{ flex: 1, backgroundColor: 'white' }}>

            <View style={{ flex: 1 }}>
                <ScrollView style={{ flex: 1 }}>
                    <View style={{ flex: 1, padding: 16 }}>

                        {this.state.drawerPanel.map((line, key) =>
                            this._renderBtnMenu(key, line.title, line.icon_awesome,
                                () => Actions.push(line.name_class)))}

                        {this._renderBtnMenu(-1, 'Início', 'home', () => Actions.BaseApp())}
                        {this._renderBtnMenu(-4, 'Minha Lista', 'bookmark', () => Actions.Bookmark())}
                        {this._renderBtnMenu(-5, 'Sobre o App', 'user', () => Actions.AppInfo())}

                    </View>
                </ScrollView>

                <View style={{ padding: 20, justifyContent: 'center' }}
                    colors={[backgroundColorStatus, backgroundColorStatus]} >
                    <ImageBackground resizeMode="contain"
                        source={require("./src/ic_launcher.png")}
                        style={{ height: 60, width: 60, alignSelf: 'center' }}>
                    </ImageBackground>
                </View>
            </View>
        </View>
}

export default ControlPanel;