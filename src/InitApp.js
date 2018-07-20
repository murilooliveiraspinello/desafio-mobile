import React, { Component } from "react";
import {
    View,
    Linking,
    ScrollView,
    TouchableOpacity,
    ImageBackground, Text
} from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import ParentView from "./ParentView";
import { styleAll, backgroundColorStatus } from "../FixVars";
import { Actions } from "../node_modules/react-native-router-flux";

class InitApp extends Component {
    constructor(props) {
        super(props);

        this.state = {
            isLoading: false
        };
    }

    openPageProject = () => Linking.openURL("http://www.zup.com.br/");

    render = () => (
        <View style={{ flex: 1, backgroundColor: backgroundColorStatus }}>
            <ScrollView
                keyboardShouldPersistTaps="handled"
                style={{ flex: 1 }}
                contentContainerStyle={styleAll.scrolCenter}
            >
                <TouchableOpacity onPress={() => this.openPageProject()}>
                    <ImageBackground
                        resizeMode="contain"
                        source={require("./ic_launcher.png")}
                        style={{ height: 100 }}
                    />
                </TouchableOpacity>

                <View style={{ paddingTop: 16 }}>
                    <Text style={[styleAll.pageTitle, { color: 'white' }]}>{this.props.title}</Text>
                    <Text style={[styleAll.textNormal, { color: 'white', alignSelf: 'center' }]}>{this.props.subtitle}</Text>
                </View>


                <TouchableOpacity onPress={() => Actions.reset('BaseApp', { title: 'Pesquisar' })}
                    style={[styleAll.buttonNormal, { marginTop: 20, justifyContent: "center" }]}>
                    <Text style={[styleAll.buttonTextNormal, { color: backgroundColorStatus }]}>Avançar</Text>
                    <Icon name={'chevron-right'} style={[styleAll.buttonTextNormal, { marginLeft: 5, color: backgroundColorStatus }]} />
                </TouchableOpacity>

            </ScrollView>
        </View>

    );
}

export default InitApp;
