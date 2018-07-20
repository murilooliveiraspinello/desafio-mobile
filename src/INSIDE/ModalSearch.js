import React, { Component } from "react";
import {
    View,
    ScrollView,
    TouchableOpacity,
    TextInput, Text
} from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";

import { styleAll, backgroundColorStatus, colorPlaceholder, _checkBoxCustom, showErroInput, alertError, _initREST, urlBase, apikey, backgroundFooter } from "../../FixVars";
import ProgressBar from "../../ProgressBar";

class ModalSearch extends Component {
    constructor(props) {
        super(props); 

        this.state = {
            isLoading: false,
            listType: [{ title: 'Filmes', value: 'movie' }, { title: 'Séries', value: 'series' }, { title: 'Episódios', value: 'episode' }],
            titulo: '',
            ano: '',
            tipo: ''
        };
    }

    initSerchAPI() {
        if (this.state.titulo == '') alertError('Validação', "Título necessário para pesquisar")
        else {
 
            this.props.initSerchAPI(this.state.titulo.trim(), this.state.ano.trim(),  this.state.tipo)
 
        }
    }

    componentDidMount(){
        this.refs.titulo.focus()
    }

    render = () => <View style={{ flex: 1, backgroundColor: backgroundFooter, position: 'absolute', width: '100%', height: '100%' }}>
        <ScrollView
            keyboardShouldPersistTaps="handled"
            style={{ flex: 1 }}>

            <View style={styleAll.card}>

                <Text style={[styleAll.label, { marginBottom: -5 }]}> Filtrar Pesquisa </Text>

                <View style={[styleAll.contentInput]}>
                    <Text style={styleAll.textNormal}>Título</Text>
                    <TextInput ref="titulo"
                        onChange={(event) => this.setState({ titulo: event.nativeEvent.text })}
                        value={this.state.titulo} placeholder="Título é" underlineColorAndroid='transparent'
                        placeholderTextColor={colorPlaceholder} selectionColor={colorPlaceholder} style={styleAll.input} />
                </View>
                {this.state.titulo == '' && showErroInput("Título necessário")}

                <TouchableOpacity style={[styleAll.contentInput]} onPress={() => this.setState({ editType: (this.state.editType) ? false : true })}>
                    <Text style={styleAll.textNormal}>Tipo</Text>
                    <TextInput ref="tipo" keyboardType={'numeric'} editable={false}
                        value={this.state.tipo} placeholder="Selecionar" underlineColorAndroid='transparent'
                        placeholderTextColor={backgroundColorStatus} selectionColor={colorPlaceholder} style={styleAll.input} />
                </TouchableOpacity>
                {this.state.editType && _checkBoxCustom(this.state.listType, (tipo) => this.setState({ tipo }, () => this.setState({ editType: false })))}

                <View style={[styleAll.contentInput]}>
                    <Text style={styleAll.textNormal}>Ano</Text>
                    <TextInput ref="ano" keyboardType={'numeric'}
                        onChange={(event) => this.setState({ ano: event.nativeEvent.text })}
                        value={this.state.ano} placeholder="(Opcional)" underlineColorAndroid='transparent'
                        placeholderTextColor={colorPlaceholder} selectionColor={colorPlaceholder} style={styleAll.input} />
                </View>

                <View style={{ flex: 1, flexDirection: "row", justifyContent: "space-between" }}>

                    <TouchableOpacity style={[styleAll.buttonNormal, { alignSelf: 'flex-end', elevation: 3, marginTop: 16, backgroundColor: 'white' }]}
                        onPress={() => this.props.search()}>
                        <Text style={[styleAll.textNormal]}> Cancelar </Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={[styleAll.buttonNormal, { alignSelf: 'flex-end', elevation: 3, marginTop: 16, backgroundColor: backgroundColorStatus }]}
                        onPress={() => this.initSerchAPI()}>
                        <Text style={[styleAll.textNormal, { color: 'white' }]}> Pesquisar </Text>
                        <Icon name={'search'} style={[styleAll.buttonTextNormal, { marginLeft: 5, color: 'white' }]} />
                    </TouchableOpacity>
                </View>

            </View>

        </ScrollView>

        {this.state.isLoading && <ProgressBar/>}
    </View>

}

export default ModalSearch;
