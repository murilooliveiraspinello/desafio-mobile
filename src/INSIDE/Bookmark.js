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
import { styleAll, backgroundColorStatus, getCardList, backgroundFooter, indicatorColor, } from "../../FixVars";
import { Actions } from "../../node_modules/react-native-router-flux";

import { createImageProgress } from 'react-native-image-progress';
import FastImage from 'react-native-fast-image';
const Image = createImageProgress(FastImage);


class Bookmark extends Component {
    constructor(props) {
        super(props);
        if (Platform.OS === "android") {
            UIManager.setLayoutAnimationEnabledExperimental(true);
        }

        this.state = {
            isLoading: false,
            listResult: new Array()
        };
    }

    componentDidMount() {
        getCardList((cardList) => this.setState({ listResult: cardList }, () => console.log("listResult", this.state.listResult)))

    }

    renderLine(key, line, onpress) {
        return <TouchableOpacity key={key} style={[styleAll.card, { marginBottom: 10, paddingHorizontal: 10 }]} onPress={() => onpress()}>

            <View style={{ flex: 1, flexDirection: "row" }}>
                <Image source={{ uri: line.Poster }} resizeMode="cover" style={{ width: 100, backgroundColor: backgroundFooter, height: 100 }} />
                <View style={{ flex: 1, marginLeft: 16 }}>

                    <Text style={[styleAll.textNormal, { color: backgroundColorStatus, alignSelf: 'flex-start' }]}>Título</Text>
                    <Text style={[styleAll.buttonTextNormal, { color: indicatorColor, alignSelf: 'flex-start', marginBottom: 10 }]}>{line.Title}</Text>

                    <Text style={[styleAll.textNormal, { color: backgroundColorStatus, alignSelf: 'flex-start' }]}>Ano</Text>
                    <Text style={[styleAll.buttonTextNormal, { color: indicatorColor, alignSelf: 'flex-start' }]}>{line.Year}</Text>
                </View>

                <Icon name={"chevron-right"} style={[styleAll.buttonTextNormal, { marginLeft: 5, color: backgroundColorStatus }]} />
            </View>

        </TouchableOpacity>
    }


    noResultsMessage() {
        return <View>
            <TouchableOpacity
                onPress={() => this.initSearch()}>
                <Icon name={"search"}
                    style={[styleAll.buttonTextNormal, { fontSize: 40, color: backgroundColorStatus, backgroundColor: 'white', borderRadius: 30, padding: 10 }]}
                />
            </TouchableOpacity>
            <View style={{ padding: 20 }}>
                <Text style={[styleAll.pageTitle, { color: 'white' }]}>
                    Nenhum item salvo
                </Text>
                <Text style={[styleAll.textNormal, { color: 'white', alignSelf: "center", textAlign: "center" }]}>
                    {'Você não selecionou nenhum título, vá a tela inicial e pesquise'}
                </Text>
            </View>
            <View style={{ flexDirection: "row", justifyContent: 'center', paddingHorizontal: 20 }}>
                <TouchableOpacity
                    onPress={() => Actions.BaseApp()}
                    style={[styleAll.buttonNormal, { justifyContent: "center" }]}>
                    <Text style={[styleAll.buttonTextNormal, {}]}> Início </Text>
                    <Icon name={"home"} style={[styleAll.buttonTextNormal, { marginLeft: 5 }]} />
                </TouchableOpacity>
            </View>
        </View>
    }

    render = () => (
        <ParentView backBtn title={this.props.title}
            isLoading={this.state.isLoading}
            content={
                <View style={{ flex: 1, backgroundColor: backgroundColorStatus }}>
                    <ScrollView keyboardShouldPersistTaps="handled" style={{ flex: 1 }}>

                        {this.state.listResult.length == 0 && this.noResultsMessage()}

                        {this.state.listResult.length > 0 &&
                            <Text style={[styleAll.textNormal, { color: 'white', paddingHorizontal: 16, paddingTop:16  }]}>
                               Lista salva na memória do telefone, sendo possível acessala mesmo sem acesso a internet
                            </Text>}

                        {this.state.listResult.map(
                            (line, key) => this.renderLine(key, line.form, () => Actions.TitleSelected({ imdbID: line.imdbID, title: line.form.Title }))
                        )}

                    </ScrollView>
                </View>
            }
        />
    );
}

export default Bookmark;
