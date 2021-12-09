import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { View, TouchableHighlight, Image, SafeAreaView, StyleSheet, Alert, Text } from 'react-native';
import { ViroARSceneNavigator } from 'react-viro';
import store from './client/store'
import Home from './client/components/Home';
import Login from './client/components/LogIn';
import SignUp from './client/components/SignUp';
import SelectUserType from './client/components/SelectUserType';
import GuestHomePage from './client/components/GuestHomePage';
import HostHomePage from './client/components/HostHomePage';

const HOME = 'HOME';
const LOG_IN = 'LOG_IN';
const SIGN_UP = 'SIGN_UP';
const SELECT_TYPE = 'SELECT_TYPE';
const GUEST_PAGE = 'GUEST_PAGE';
const HOST_PAGE = 'HOST_PAGE';
const GUEST_AR = 'GUEST_AR';
const HOST_AR = 'HOST_AR';

const sharedProps = {
  apiKey: "API_KEY_HERE",
}

const InitialARScene = require('./js/HelloWorldSceneAR');
const HostARScene = require('./js/HostAR');

export default class App extends Component {
  constructor() {
    super();
    this.state = {
      navigatorType: 'HOME',
      sharedProps: sharedProps
    }
    this.HomeNavigator = this.HomeNavigator.bind(this);
    this.LogInNavigator = this.LogInNavigator.bind(this);
    this.SignUpNavigator = this.SignUpNavigator.bind(this);
    this.SelectTypeNavigator = this.SelectTypeNavigator.bind(this);
    this.GuestPageNavigator = this.GuestPageNavigator.bind(this);
    this.HostPageNavigator = this.HostPageNavigator.bind(this);
    this.GuestARNavigator = this.GuestARNavigator.bind(this);
    this.HostARNavigator = this.HostARNavigator.bind(this);
    this._getARNavigatorGuest = this._getARNavigatorGuest.bind(this);
    this._getARNavigatorHost = this._getARNavigatorHost.bind(this);

  }
  render() {
    if (this.state.navigatorType === GUEST_AR) {
      return this._getARNavigatorGuest();
    } else if (this.state.navigatorType === HOST_AR) {
      return this._getARNavigatorHost();
    } else {
      return (
        <Provider store={store}>
          <View style={{ flex: 1 }} >
            <View style={{ flex: 1 }} >
              {this.state.navigatorType === HOME ? (
                <Home signUp={this.SignUpNavigator} logIn={this.LogInNavigator} />
              ) : this.state.navigatorType === LOG_IN ? (
                <Login selectType={this.SelectTypeNavigator}
                  backHome={this.HomeNavigator}
                  guestPage={this.GuestPageNavigator}
                  hostPage={this.HostPageNavigator} />
              ) : this.state.navigatorType === SIGN_UP ? (
                <SignUp selectType={this.SelectTypeNavigator}
                  backHome={this.HomeNavigator}
                  guestPage={this.GuestPageNavigator}
                  hostPage={this.HostPageNavigator} />
              ) : this.state.navigatorType === SELECT_TYPE ? (
                <SelectUserType hostPage={this.HostPageNavigator} guestPage={this.GuestPageNavigator} />
              ) : this.state.navigatorType === HOST_PAGE ? (
                <HostHomePage hostAR={this.HostARNavigator} backHome={this.HomeNavigator} />
              ) : (
                <GuestHomePage guestAR={this.GuestARNavigator} backHome={this.HomeNavigator}/>
              )
              }
            </View>
          </View>
        </Provider>
      )
    }
  }
  HomeNavigator() {
    this.setState({ navigatorType: HOME });
  }
  LogInNavigator() {
    this.setState({ navigatorType: LOG_IN });
  }
  SignUpNavigator() {
    this.setState({ navigatorType: SIGN_UP });
  }
  SelectTypeNavigator() {
    this.setState({ navigatorType: SELECT_TYPE });
  }
  GuestPageNavigator() {
    this.setState({ navigatorType: GUEST_PAGE });
  }
  HostPageNavigator() {
    this.setState({ navigatorType: HOST_PAGE });
  }
  GuestARNavigator() {
    this.setState({ navigatorType: GUEST_AR });
  }
  HostARNavigator() {
    this.setState({ navigatorType: HOST_AR });
  }
  _getARNavigatorGuest() {
    return (
      <View style={localStyles.outer} >
        <ViroARSceneNavigator {...this.state.sharedProps}
          initialScene={{ scene: InitialARScene }} />

        <View style={{ position: 'absolute', left: 0, right: 0, bottom: 77, alignItems: 'center' }}>
          <TouchableHighlight style={localStyles.buttons}
            onPress={this._onDisplayDialog}
            underlayColor={'#00000000'}>
            <Image source={require("./js/res/button_add-tag.png")} />
          </TouchableHighlight>
        </View>
        <View style={{ position: 'absolute', left: 10, right: 0, top: 10, alignItems: 'flex-start', justifyContent: "center" }}>
          <TouchableHighlight style={localStyles.buttons}
            onPress={this.GuestPageNavigator}>
            <View style={{ backgroundColor: "#008080", padding: 8, alignItems: 'center', borderRadius: 20 }} >
              <Text style={{ fontSize: 24, color: '#fff' }}>Back</Text>
            </View>
          </TouchableHighlight>
        </View>
      </View>
    );
  }
  _getARNavigatorHost() {
    return (
      <View style={localStyles.outer} >
        <ViroARSceneNavigator {...this.state.sharedProps}
          initialScene={{ scene: HostARScene }} />

        <View style={{ position: 'absolute', left: 0, right: 0, bottom: 77, alignItems: 'center' }}>
          <TouchableHighlight style={localStyles.buttons}
            onPress={this._onDisplayDialog}
            underlayColor={'#00000000'}>
            <Image source={require("./js/res/button_add-tag.png")} />
          </TouchableHighlight>
        </View>
        <View style={{ position: 'absolute', left: 10, right: 0, top: 10, alignItems: 'flex-start', justifyContent: "center" }}>
          <TouchableHighlight style={localStyles.buttons}
            onPress={this.HostPageNavigator}>
            <View style={{ backgroundColor: "#008080", padding: 8, alignItems: 'center', borderRadius: 20 }} >
              <Text style={{ fontSize: 24, color: '#fff' }}>Back</Text>
            </View>
          </TouchableHighlight>
        </View>
      </View>
    );
  }
  _onDisplayDialog() {
    Alert.prompt(
      'Leave a tag',
      'Write a message to place in the world!',
      '...'
    );
  }
}

const localStyles = StyleSheet.create({
  outer: {
    flex: 1,
  },

  arView: {
    flex: 1,
  },

  buttons: {
    height: 80,
    width: 80,
    paddingTop: 20,
    paddingBottom: 20,
    marginTop: 10,
    marginBottom: 10,
    backgroundColor: '#00000000',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#ffffff00',
  }
});

module.exports = App;
