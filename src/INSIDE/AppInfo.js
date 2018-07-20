import React, { Component } from "react";
import {
    View,
    ScrollView,
    UIManager,
    ImageBackground,
    Platform,
    TouchableOpacity, Linking,
    Text
} from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import ParentView from "../ParentView";
import { styleAll, backgroundColorStatus, } from "../../FixVars";
import { Actions } from "../../node_modules/react-native-router-flux";

class AppInfo extends Component {
    constructor(props) {
        super(props);
        if (Platform.OS === "android") {
            UIManager.setLayoutAnimationEnabledExperimental(true);
        }

        this.state = {
            isLoading: false
        };
    }

    renderLink(icon, link) {
        return <TouchableOpacity onPress={() => Linking.openURL(link)}
            style={[styleAll.buttonNormal, { justifyContent: "center", backgroundColor: backgroundColorStatus }]}>
            <Icon name={icon} style={[styleAll.buttonTextNormal, { color: 'white' }]} />
        </TouchableOpacity>
    }

    render = () => (
        <ParentView backBtn title={this.props.title}
            isLoading={this.state.isLoading}
            content={
                <View style={{ flex: 1, backgroundColor: backgroundColorStatus }}>
                    <ScrollView keyboardShouldPersistTaps="handled" style={{ flex: 1 }} contentContainerStyle={styleAll.scrolCenter}>
                        <TouchableOpacity onPress={() => { }}>
                            <ImageBackground resizeMode="contain" source={require("../ic_launcher.png")} style={{ height: 100 }} />
                        </TouchableOpacity>

                        <View style={{ padding: 16 }}>
                            <Text style={[styleAll.pageTitle, { color: 'white' }]}>{this.props.title}</Text>
                            <Text style={[styleAll.textNormal, { color: 'white', alignSelf: 'center', textAlign: "center", flex: 1 }]}>{this.props.subtitle}</Text>
                        </View>
                        
                        <View style={{ flexDirection: "row", justifyContent: "space-between", paddingHorizontal: 30 }}>

                            {this.renderLink('whatsapp', 'https://bit.ly/2JwCg1g')}
                            {this.renderLink('linkedin', 'https://www.linkedin.com/in/murilo-oliveira-spinello/')}
                            {this.renderLink('github', 'https://github.com/murilooliveiraspinello')}
                            {this.renderLink('facebook', 'https://www.facebook.com/murilooliveiraspinello')}

                        </View>

                        <View style={{ flexDirection: "row", justifyContent: "space-between", paddingHorizontal: 30 }}>

                            <TouchableOpacity onPress={() => Actions.pop()}
                                style={[styleAll.buttonNormal, { marginTop: 20, justifyContent: "center" }]}>
                                <Icon name={'chevron-left'} style={[styleAll.buttonTextNormal, { marginRight: 5, color: backgroundColorStatus }]} />
                                <Text style={[styleAll.buttonTextNormal, { color: backgroundColorStatus }]}>Voltar</Text>
                            </TouchableOpacity>


                            <TouchableOpacity onPress={() => Linking.openURL('https://github.com/murilooliveiraspinello/desafio-mobile')}
                                style={[styleAll.buttonNormal, { marginTop: 20, justifyContent: "center" }]}>
                                <Icon name={'github'} style={[styleAll.buttonTextNormal, { marginRight: 5, color: backgroundColorStatus }]} />
                                <Text style={[styleAll.buttonTextNormal, { color: backgroundColorStatus }]}>Repositório</Text>
                            </TouchableOpacity>

                        </View>

                    </ScrollView>
                </View>
            }
        />
    );
}

export default AppInfo;
