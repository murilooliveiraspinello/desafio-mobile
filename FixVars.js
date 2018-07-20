import {
  StyleSheet,
  Alert,
  AsyncStorage,
  Text, TouchableOpacity, View
} from "react-native";
import React from "react";
import Icon from "react-native-vector-icons/FontAwesome";

export const urlBase = `http://www.omdbapi.com/`;
export const apikey = '933dbdbc'
export const backgroundColorStatus = "#01374f"; // `#5D5E93`;
export const backgroundFooter = "#999999a8";
export const colorPlaceholder = "#999999";
export const indicatorColor = "black";

export const alertError = (title, msg) => Alert.alert(title, msg)

export const _checkBoxCustom = (list, calback) => <View style={[{ marginBottom: 20, paddingLeft: 26 }]}>
  {list.map((line, key) => <TouchableOpacity key={key}
    style={[{ flexDirection: "row", justifyContent: 'center', borderBottomColor: colorPlaceholder, borderBottomWidth: 0.5 }, { padding: 10 }]}
    onPress={() => calback(line.value)}>
    <Text style={[styleAll.textNormal, { flex: 1, paddingRight: 10, textAlign: 'left' }]}>{line.title} / {line.value}</Text>
    <Icon name={'circle-o'} style={[styleAll.textNormal, { fontSize: fontSize_3, color: backgroundColorStatus }]} />
  </TouchableOpacity>)}
</View>

export const getCardList = async call => {
  //await AsyncStorage.clear()
  let cardList = await AsyncStorage.getItem("cardList");


  if (!cardList) call(new Array());
  else {
    cardList = JSON.parse(cardList);
    if (cardList.length == null) {
      cardList = [cardList];
    }
    call(cardList);
  }
};

export const getFormByImdbID = async (imdbID, dintHave, have) => {
  let cardList = await AsyncStorage.getItem("cardList");

  if (cardList == null) dintHave();
  else {

    cardList = JSON.parse(cardList);
    console.log("cardList", cardList)

    let had = false
    cardList.map((line, key) => {
      if (line.imdbID == imdbID) {
        have(line)
        had = true
      }
    })

    if (!had)
      dintHave();
  }
};

export const addCardList = async (imdbID, form, call) => {
  let cardList = await AsyncStorage.getItem("cardList");

  if (!cardList) cardList = new Array();
  else cardList = JSON.parse(cardList);

  cardList.push({ imdbID, form });

  await AsyncStorage.setItem("cardList", JSON.stringify(cardList));
  call();
};

export const showErroInput = text => {
  return <Text style={styleAll.warningInputError}>{text}</Text>;
};

export const _initREST = (url, data, callResult, isLoading, messageError) => {
  console.log(`initREST(${url})`);
  isLoading(true);

  console.log("url", url);
  console.log("data", data);

  fetch(url, data)
    .then(response => response.json())
    .then(responseJson => {
      console.log("responseJson", responseJson);
      isLoading(false);

      if (responseJson.Error)
        messageError("exclamation", "Requisição", responseJson.Error);
      else callResult(responseJson);

      // if (responseJson.error || responseJson.success == false) {
      //     if (responseJson.message) messageError('exclamation', 'Requisição', responseJson.message)
      //     else messageError('exclamation', 'Atenção', responseJson.error)

      // } else if (responseJson.errors) {
      //     let textError = '';
      //     responseJson.errors.map((line, key) => {
      //         textError += `\n${line}`
      //     })
      //     messageError('exclamation', 'Atenção', textError)

      // } else
      //  callResult(responseJson);
    })
    .catch(error => {
      console.log("error", error);
      isLoading(false);
      messageError(
        "exclamation",
        "Atenção",
        "Não foi possível identificar o erro!"
      );
    });
};

export const _initREST_text = (url, data, callResult, isLoading) => {
  console.log(`initREST(${url})`);
  isLoading(true);

  console.log("url", url);
  console.log("data", data);

  fetch(url, data)
    .then(response => response.text())
    .then(responseJson => {
      console.log("responseJson", responseJson);
      isLoading(false);
    })
    .catch(error => {
      isLoading(false);

      console.log("error", error);
      Alert.alert("Erro Retorno", "Não foi possível identificar o erro!");
    });
};

export const colorHint = "#9A8C9E";
export const redColor = "#ec3e62";
export const greyRefusePropost = "#949292";
export const yellowForce = "#F7B827";
export const greyColor = "#242424";
export const fontSize_1 = 13;
export const fontSize_2 = 16;
export const fontSize_3 = 25;
export const fontFamily = "Montserrat-Regular";
export const fontFamilyBold = "Montserrat-Bold";

export const styleAll = StyleSheet.create({

  card: {
    backgroundColor: 'white',
    borderRadius: 10,
    margin: 16,
    padding: 16
  },
  scrolCenter: {
    justifyContent: "center",
    flexGrow: 1
  },
  hr: {
    borderBottomColor: colorHint,
    borderBottomWidth: 0,
    alignSelf: "flex-end",
    marginVertical: 16,
    width: "50%"
  },
  pageTitle: {
    color: indicatorColor,
    textAlign: "center",
    fontSize: fontSize_3,
    fontFamily: fontFamilyBold
  },

  label: {
    color: indicatorColor,
    fontSize: fontSize_1,
    fontFamily: fontFamilyBold
  },

  warningInputError: {
    textAlign: "right",
    color: redColor,
    fontSize: fontSize_1,
    fontFamily: fontFamily
  },
  scrolCenter: {
    justifyContent: "center",
    flexGrow: 1
  },

  contentInputLogin: {
    marginBottom: 30,
    borderBottomColor: colorPlaceholder,
    borderBottomWidth: 1,
    flexDirection: "row",
    justifyContent: "center"
  },

  contentInput: {
    paddingHorizontal: 16,
    flexDirection: "row",
    justifyContent: 'center',
    marginTop: 16,
    backgroundColor: '#EBEBEB',
    borderRadius: 30,
    justifyContent: 'center'
  },

  input: {
    alignSelf: 'center',
    color: indicatorColor,
    textAlign: 'right',
    fontSize: fontSize_1,
    height: 37,
    flex: 1,
    fontFamily: fontFamily
  },

  buttonNormal: {
    flexDirection: "row",
    alignSelf: "center",
    alignItems: "center",
    backgroundColor: 'white',
    borderWidth: 1,
    borderRadius: 30,
    borderColor: 'white',
    paddingVertical: 8,
    paddingHorizontal: 10
  },

  buttonTextNormal: {
    alignSelf: "center",
    fontSize: fontSize_2,
    color: indicatorColor,
    fontFamily: fontFamilyBold
  },
  textNormal: {
    alignSelf: "center",
    fontSize: fontSize_2,
    color: indicatorColor,
    fontFamily: fontFamily
  }
});
