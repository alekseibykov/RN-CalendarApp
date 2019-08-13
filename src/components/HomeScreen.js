import React, { Component } from 'react';
import { View, Text, ActivityIndicator } from 'react-native';
import firebase from 'react-native-firebase';
import { Header, Button } from './common';
import LoginForm from './LoginForm';
import ContentScreen from './ContentScreen';

class HomeScreen extends Component {
  constructor(props) {
    super();
    this.state = { loggedIn: null };
  }

  componentWillMount() {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        this.setState({ loggedIn: true });
      } else {
        this.setState({ loggedIn: false });
      }
    });
  }

  renderMainScreen() {
    let self = this;
    if (this.state.loggedIn) {
      return (
        <ContentScreen screenProps={this.props.screenProps} />
      );
    } else if (this.state.loggedIn === false) {
      return (
        <LoginForm navigation={self.props.navigation} />
      );
    } else {
      return (
        <ActivityIndicator />
      );
    }
  }

  render() {
    const { navigate } = this.props.navigation;

    return (
      <View style={{ flex: 1 }}>
        <Header headerText='Authentication' />
        { this.renderMainScreen() }
      </View>
    );
  }
}

export default HomeScreen;
