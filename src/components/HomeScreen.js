import React, { Component } from 'react';
import * as firebase from "firebase/app";
import "firebase/database";
import "firebase/auth";
import { Container, Header, Content, Left, Body, Right, Title, Spinner } from 'native-base';
import { connect } from 'react-redux';

import LoginForm from './LoginForm';
import ContentScreen from './ContentScreen';

class HomeScreen extends Component {

  // componentWillMount() {
  //   firebase.auth().onAuthStateChanged((user) => {
  //     if (user) {
  //       this.setState({ loggedIn: true });
  //     } else {
  //       this.setState({ loggedIn: false });
  //     }
  //   });
  // }

  renderMainScreen() {
    let self = this;
    let {authUser} = this.props;
    if (authUser) {
      return (
        <ContentScreen screenProps={this.props.screenProps} />
      );
    } else {
      return (
        <LoginForm navigation={self.props.navigation} />
      );
    }
  }

  render() {
    const { navigate } = this.props.navigation;

    return (
      <Container>
        <Header>
          <Body>
            <Title>Calendar App</Title>
          </Body>
          <Right />
        </Header>
        { this.renderMainScreen() }
      </Container>
    );
  }
}

const mapStateToProps = state => ({
  authUser: state.sessionState.authUser,
});

export default connect(mapStateToProps)(HomeScreen);
