import React, { Component } from "react";
import {
    View,
    Linking,
    ScrollView,
    UIManager,
    Platform,
    TouchableOpacity, Dimensions,
    Text
} from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import ParentView from "../ParentView";
import { styleAll, backgroundColorStatus, colorPlaceholder, indicatorColor, backgroundFooter, alertError, urlBase, apikey, _initREST, getFormByImdbID, addCardList } from "../../FixVars";
import { createImageProgress } from 'react-native-image-progress';
import FastImage from 'react-native-fast-image';
import { Actions } from "../../node_modules/react-native-router-flux";
const Image = createImageProgress(FastImage);

const { height, width } = Dimensions.get('window');

class TitleSelected extends Component {
    constructor(props) {
        super(props);
        if (Platform.OS === "android") {
            UIManager.setLayoutAnimationEnabledExperimental(true);
        }

        this.state = {
            isLoading: false
        };
    }

    componentDidMount() {

        if (this.props.imdbID) this.initSerchAPI(this.props.imdbID)
    }

    initSerchAPI(imdbID) {

        getFormByImdbID(imdbID, () => {// Não tem 

            const url = `${urlBase}?apikey=${apikey}&i=${imdbID}`
            const data = {
                method: "GET",
                headers: {
                    Connection: "close",
                    "content-type": "application/json",
                    // 'Accept': 'application/json'
                }
            }

            _initREST(url, data, result => {

                addCardList(imdbID, result, () => this.initSerchAPI(imdbID))

            },
                (isLoading) => this.setState({ isLoading }),
                (iconTitle, title, content) => alertError('Busca', 'Nenhum resultado encontrado!'))
        },
            (form) => {// Tem
                const result = form.form

                this.setState({ Title: result.Title })
                this.setState({ Poster: result.Poster })
                this.setState({ Year: result.Year })
                this.setState({ Runtime: result.Runtime })
                this.setState({ Director: result.Director })
                this.setState({ Writer: result.Writer })
                this.setState({ Actors: result.Actors })
                this.setState({ Awards: result.Awards })
                this.setState({ Production: result.Production })
                this.setState({ Website: result.Website })
                this.setState({ Metascore: result.Metascore })
                this.setState({ imdbRating: result.imdbRating })
                this.setState({ imdbVotes: result.imdbVotes })

            })
    }

    renderLineTitle = (title, text, marginBottom = 0) => <View>
        <Text style={[styleAll.textNormal, { color: backgroundColorStatus, alignSelf: 'flex-start' }]}>{title}</Text>
        <Text style={[styleAll.buttonTextNormal, { color: backgroundColorStatus, alignSelf: 'flex-start', marginBottom: marginBottom }]}>{text}</Text>
    </View>


    renderTitleSelected() {
        return <View style={{ flex: 1 }}>
            <View style={[styleAll.card, { marginBottom: 0 }]}>
                <View style={{ flex: 1, flexDirection: (this.state.imageZoom) ? "column" : "row", marginBottom: 10 }}>

                    <TouchableOpacity onPress={() => this.setState({ imageZoom: (this.state.imageZoom) ? false : true })}>
                        <Image source={{ uri: this.state.Poster }} resizeMode="cover" style={{ width: (this.state.imageZoom) ? ('100%') : 90, height: (this.state.imageZoom) ? (width) : 90, backgroundColor: backgroundFooter }} />
                    </TouchableOpacity>

                    <View style={{ flex: 1, marginLeft: (this.state.imageZoom) ? 0 : 6, marginTop: (this.state.imageZoom) ? 10 : 0 }}>

                        {this.renderLineTitle('Nome', this.state.Title, 10)}

                        <View style={{ flexDirection: "row" }}>
                            {this.renderLineTitle('Ano', this.state.Year)}
                            <View style={{ marginHorizontal: 10 }} />
                            {this.renderLineTitle('Duração', this.state.Runtime, 10)}
                        </View>

                    </View>
                </View>

                <View style={{ flexDirection: "row", justifyContent: 'space-between' }}>
                    {this.state.Metascore && this.renderLineTitle('Metascore', this.state.Metascore)}
                    <View style={{ marginHorizontal: 10 }} />
                    {this.state.imdbRating && this.renderLineTitle('IMDB', this.state.imdbRating)}
                    <View style={{ marginHorizontal: 10 }} />
                    {this.state.imdbVotes && this.renderLineTitle('Votos', this.state.imdbVotes)}
                </View>
            </View>
            <View style={[styleAll.card, { marginBottom: 0 }]}>
                {this.state.Director && this.renderLineTitle('Diretor', this.state.Director, 16)}
                {this.state.Production && this.renderLineTitle('Produção', this.state.Production, 16)}
                {this.state.Awards && this.renderLineTitle('Prêmios', this.state.Awards, 16)}
                {this.state.Writer && this.renderLineTitle('Escritor(es)', this.state.Writer, 16)}
                {this.state.Actors && this.renderLineTitle('Atores', this.state.Actors, 16)}

                {this.state.Website && <TouchableOpacity onPress={() => Linking.openURL(this.state.Website)} >
                    {this.renderLineTitle('Website (link)', this.state.Website, 0)}
                </TouchableOpacity>}

                <View style={{ flex: 1, flexDirection: "row", justifyContent: "space-between" }}>
                    <TouchableOpacity style={[styleAll.buttonNormal, { alignSelf: 'flex-end', elevation: 3, marginTop: 16, backgroundColor: 'white' }]}
                        onPress={() => Actions.pop()}>
                        <Text style={[styleAll.textNormal]}> Voltar </Text>
                    </TouchableOpacity>


                    <TouchableOpacity style={[styleAll.buttonNormal, { alignSelf: 'flex-end', elevation: 3, marginTop: 16, backgroundColor: backgroundColorStatus }]}
                        onPress={() => Actions.Bookmark()}>
                        <Text style={[styleAll.textNormal, { color: 'white' }]}> Minha Lista </Text>
                        <Icon name={'bookmark'} style={[styleAll.buttonTextNormal, { marginHorizontal: 5, color: 'white' }]} />
                    </TouchableOpacity>
                </View>

            </View>
        </View>
    }

    render = () => (
        <ParentView backBtn title={(!this.state.querySearch) ? this.props.title : this.state.querySearch}
            isLoading={this.state.isLoading}
            content={
                <View style={{ flex: 1, backgroundColor: backgroundColorStatus }}>
                    <ScrollView
                        ref="scrollView" keyboardShouldPersistTaps="handled" style={{ flex: 1 }}>

                        {this.state.Title && this.renderTitleSelected()}

                        <Text style={[styleAll.textNormal, { color: 'white', padding: 16 }]}>
                            Título salvo em sua lista, acesse Minha Lista para visualizar a lista completa
                        </Text>

                    </ScrollView>

                </View>
            }
        />
    );
}

export default TitleSelected;
