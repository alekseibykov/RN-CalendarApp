import React, { Component } from 'react';
import * as firebase from "firebase/app";
import "firebase/database";
import "firebase/auth";
import { Container, Header, Content, Left, Body, Right, Title, Spinner } from 'native-base';
import { connect } from 'react-redux';

import LoginForm from './LoginForm';
import ContentScreen from './ContentScreen';

class HomeScreen extends Component {
  renderMainScreen() {
    let self = this;
    let {authUser} = this.props;
    if (authUser) {
      return (
        <ContentScreen screenProps={this.props.screenProps} />
      );
    } else if (authUser === null) {
      return (
        <LoginForm navigation={self.props.navigation} />
      );
    } else {
      return (
        <Spinner />
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
