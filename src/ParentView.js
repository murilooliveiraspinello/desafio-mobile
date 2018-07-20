import React, { Component } from "react";
import { View, Keyboard, TouchableOpacity, Text } from "react-native";
import ProgressBar from "../ProgressBar";
import Drawer from 'react-native-drawer-menu';
import MenuTopBar from "../MenuTopBar";
import ControlPanel from "../ControlPanel";
import { backgroundColorStatus, styleAll } from "../FixVars";

class ParentView extends Component {
  constructor(props) {
    super(props);

    this.state = {
      keyShow: false,
      disabled: true
    };
  }

  _openDraw = () => this.state.drawer.openDrawer();
  _closeDraw = () => this.state.drawer.closeDrawer();

  componentDidMount() {

    Keyboard.addListener("keyboardDidShow", () =>
      this.setState({ keyShow: true })
    );
    Keyboard.addListener("keyboardDidHide", () =>
      this.setState({ keyShow: false })
    );
  }

  render = () => (
    <View style={{ flex: 1, backgroundColor: "white" }}>
      <MenuTopBar  {...this.props}
        isOpen={this.state.isOpen}
        _openDraw={() => {
          if (!this.state.drawer.isRightOpen) this._openDraw();
          else this._closeDraw();
        }}
      />
      <Drawer
        onDrawerOpen={() => this.setState({ isOpen: true })}
        onDrawerClose={() => this.setState({ isOpen: false })}
        type="overlay"
        ref={comp => (this.state.drawer = comp)}
        drawerWidth={220}
        drawerContent={<ControlPanel _closeDraw={() => this._closeDraw()} />}
        drawerPosition={Drawer.positions.Right}
      >
        {this.props.content}
      </Drawer>

      {this.state.keyShow && (
        <TouchableOpacity
          style={{ backgroundColor: 'white', padding: 10 }}
          onPress={() => Keyboard.dismiss()}>
          <Text style={[styleAll.buttonTextNormalt, { color: backgroundColorStatus, textAlign: "right" }]}>{"PRONTO"}</Text>
        </TouchableOpacity>
      )}
      {this.props.isLoading && <ProgressBar />}
    </View>
  );
}

export default ParentView;
