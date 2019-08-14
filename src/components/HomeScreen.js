import React, { Component } from 'react';
import firebase from 'react-native-firebase';
import { Container, Header, Content, Left, Body, Right, Title, Spinner } from 'native-base';
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
        <Spinner color='blue' />
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

export default HomeScreen;
