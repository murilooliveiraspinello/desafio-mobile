import React, { Component } from "react";
import { View, ActivityIndicator } from "react-native";

export default class ProgressBar extends Component {
  render = () => (
    <View
      visible
      style={{
        backgroundColor: "#fefefe78",
        position: "absolute",
        zIndex: 1,
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
        alignItems: "center",
        justifyContent: "center"
      }}
    >
      <ActivityIndicator size="large" color="#a89956" />
    </View>
  );
}
