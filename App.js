import React, { Component } from "react";
import { View, StatusBar } from "react-native";

import { Stack, Scene, Router } from "react-native-router-flux";
import { backgroundColorStatus } from "./FixVars";
import InitApp from "./src/InitApp";
import BaseApp from "./src/INSIDE/BaseApp";
import TitleSelected from "./src/INSIDE/TitleSelected";
import AppInfo from "./src/INSIDE/AppInfo";
import Bookmark from "./src/INSIDE/Bookmark";

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  render = () => (
    <View style={{ flex: 1 }}>
      <StatusBar backgroundColor={backgroundColorStatus} />
      <Router titleStyle={{ fontSize: 16 }} sceneStyle={{ backgroundColor: 'white' }}>
        <Stack key="root">
          <Scene key="InitApp" component={InitApp} title="Bem Vindo" subtitle="Desafio Mobile | Pesquisar Filmes" hideNavBar />
          <Scene key="BaseApp" component={BaseApp} title="Pesquisar" subtitle="Filtre seus resultados" hideNavBar />
          <Scene key="Bookmark" component={Bookmark} title="Minha Lista" subtitle="Selecionados" hideNavBar />
          <Scene key="AppInfo" component={AppInfo} title="Desafio Mobile" subtitle="Aplicativo para o processo seletivo da Zup, desenvolvido por Murilo Oliveira" hideNavBar />
          <Scene key="TitleSelected" component={TitleSelected} title="Título" subtitle="Informações Adicionais" hideNavBar />
        </Stack>
      </Router>
    </View>
  );
}

export default App;
