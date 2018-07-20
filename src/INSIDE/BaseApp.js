import React, { Component } from "react";
import {
    View,
    ScrollView,
    UIManager,
    LayoutAnimation,
    Platform,
    TouchableOpacity,
    Text
} from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import ParentView from "../ParentView";
import { styleAll, backgroundColorStatus, colorPlaceholder, indicatorColor, backgroundFooter, alertError, urlBase, apikey, _initREST } from "../../FixVars";
import ModalSearch from "./ModalSearch";

import { createImageProgress } from 'react-native-image-progress';
import FastImage from 'react-native-fast-image';
const Image = createImageProgress(FastImage);
import { Actions } from "../../node_modules/react-native-router-flux";

class BaseApp extends Component {
    constructor(props) {
        super(props);
        if (Platform.OS === "android") {
            UIManager.setLayoutAnimationEnabledExperimental(true);
        }
        this.state = {
            isLoading: false,
            showSearch: false,
            titulo: null,
            y: null,
            type: null,
            listResult: new Array(),
            totalResults: 0,
            page: 1
        };
    }

    initSearch = () => {
        LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
        this.setState({ showSearch: this.state.showSearch ? false : true });
    };

    setListResults(listResult) {
        this.clearResults();

        this.setState({ listResult: listResult.Search });
        this.setState({ totalResults: listResult.totalResults });
    }

    clearResults() {
        this.setState({ listResult: new Array() });
        this.setState({ showSearch: false });
        this.setState({ totalResults: 0 });
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
                    Pesquise algo!
                </Text>
                <Text style={[styleAll.textNormal, { color: 'white', alignSelf: "center", textAlign: "center" }]}>
                    Útilize o campo Pesquisar para achar os filmes, séries ou
                    episódios de sua escolha, ou acesse sua lista de seleções
                </Text>
            </View>

            <View style={{ flexDirection: "row", justifyContent: 'space-between', paddingHorizontal: 20 }}>
                <TouchableOpacity
                    onPress={() => this.initSearch()}
                    style={[styleAll.buttonNormal, { justifyContent: "center" }]}>
                    <Text style={[styleAll.buttonTextNormal, {}]}> Pesquisar </Text>
                    <Icon name={"search"} style={[styleAll.buttonTextNormal, { marginLeft: 5 }]} />
                </TouchableOpacity>

                <TouchableOpacity
                    onPress={() => Actions.Bookmark()}
                    style={[styleAll.buttonNormal, { justifyContent: "center", backgroundColor: backgroundColorStatus }]}>
                    <Text style={[styleAll.buttonTextNormal, { color: "white" }]}> Minha Lista </Text>
                    <Icon name={"bookmark"} style={[styleAll.buttonTextNormal, { marginHorizontal: 5, color: "white" }]} />
                </TouchableOpacity>
            </View>
        </View>
    }

    initSerchAPI(titulo = this.state.titulo, y = this.state.y, type = this.state.type) {

        if (y) y = `&y=${y}`; else y = ``
        if (type) type = `&type=${type}`; else type = ``

        const url = `${urlBase}?apikey=${apikey}&s=${titulo}&page=${this.state.page}${y}${type}`

        const data = {
            method: "GET",
            headers: {
                Connection: "close",
                "content-type": "application/json",
                // 'Accept': 'application/json'
            }
        }

        _initREST(url, data, result => {
            this.setListResults(result)
            this.refs.scrollView.scrollTo({ x: 0, y: 0, animated: false })
        },
            (isLoading) => this.setState({ isLoading }),
            (iconTitle, title, content) => alertError('Busca', 'Não foi possível encontrar resultados, verifique sua conexão ou se preencheu os dados corretamente'))
    }

    pagination() {
        return <View style={{ padding: 16, marginTop: 10, borderTopColor: colorPlaceholder, borderTopWidth: 0.5, paddingVertical: 10, backgroundColor: 'white', justifyContent: "space-between", flexDirection: "row" }}>

            {this.state.page > 1 &&
                <TouchableOpacity onPress={() => this.setState({ page: this.state.page - 1 }, () => this.initSerchAPI())}
                    style={[styleAll.buttonNormal, { backgroundColor: 'transparent' }]}>
                    <Icon name={"chevron-left"} style={[styleAll.buttonTextNormal, { marginRight: 5, color: backgroundColorStatus }]} />
                    <Text style={[styleAll.buttonTextNormal, { color: backgroundColorStatus }]}>
                        Anterior
                </Text>
                </TouchableOpacity>}

            <Text style={[styleAll.textNormal, { color: backgroundColorStatus }]}>
                {this.state.page}/{Math.ceil(this.state.totalResults / 10)}
            </Text>

            {this.state.page < Math.ceil(this.state.totalResults / 10) &&
                <TouchableOpacity onPress={() => this.setState({ page: this.state.page + 1 }, () => this.initSerchAPI())}
                    style={[styleAll.buttonNormal, { backgroundColor: 'transparent' }]}>
                    <Text style={[styleAll.buttonTextNormal, { color: backgroundColorStatus }]}>
                        Próximo
                </Text>
                    <Icon name={"chevron-right"} style={[styleAll.buttonTextNormal, { marginLeft: 5, color: backgroundColorStatus }]} />
                </TouchableOpacity>}
        </View>
    }

    render = () => (
        <ParentView
            title={(!this.state.querySearch) ? this.props.title : this.state.querySearch}
            search={() => this.initSearch()}
            showSearch={this.state.showSearch}
            isLoading={this.state.isLoading}
            content={
                <View style={{ flex: 1, backgroundColor: backgroundColorStatus }}>
                    <ScrollView
                        ref="scrollView" keyboardShouldPersistTaps="handled" style={{ flex: 1 }} contentContainerStyle={styleAll.scrolCenter}>
                        {this.state.listResult.length == 0 && this.noResultsMessage()}

                        {this.state.listResult.map(
                            (line, key) => this.renderLine(key, line, () => Actions.TitleSelected({ imdbID: line.imdbID, title: line.Title }))
                        )}
                    </ScrollView>

                    {this.state.totalResults > 10 && this.pagination()}

                    {this.state.showSearch && (
                        <ModalSearch isLoading={this.state.isLoading}
                            search={() => this.initSearch()}
                            initSerchAPI={(titulo, y, type) => {

                                this.setState({ page: 1 });
                                this.setState({ titulo: titulo });
                                this.setState({ y: y });
                                this.setState({ type: type });

                                this.initSerchAPI(titulo, y, type)

                            }}
                        />
                    )}
                </View>
            }
        />
    );
}

export default BaseApp;
