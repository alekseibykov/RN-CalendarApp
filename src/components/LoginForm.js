import React, { Component } from 'react';
import firebase from 'react-native-firebase';
import {
  Container, Content, Form, Item,
  Input, Label, Button, Text, Spinner,
 } from 'native-base';

class LoginForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: 'Email@gmail.com',
      password: 'Password',
      error: '',
      loading: false
    };
  }

  onPress() {
    const { email, password } = this.state;

    this.setState({ error: '', loading: true });
    firebase.auth().signInWithEmailAndPassword(email, password)
    .then((authUser) => {
      // console.log(authUser);
      // this.onLoginSuccess();
    })
    .catch((err) => {
      this.onLoginFail();
    })
  }

  onLoginFail() {
    this.setState({ error: 'Authentication Failed', loading: false });
  }

  renderButton() {
    if (this.state.loading) {
      return <Spinner color='blue' />;
    }

    return (
      <Button style={{marginTop: 40}} block onPress={this.onPress.bind(this)}>
        <Text>Log In</Text>
      </Button>
    );
  }

  render() {
    const {navigate} = this.props.navigation;
    return (
      <Container>
        <Content>
          <Form>
            <Item floatingLabel>
              <Label>Username</Label>
              <Input
                onChangeText={(email) => this.setState({email})}
                value={this.state.email}
              />
            </Item>
            <Item floatingLabel last>
              <Label>Password</Label>
              <Input
                onChangeText={(password) => this.setState({password})}
                value={this.state.password}
              />
            </Item>
          </Form>
          <Text style={styles.errorTextStyle}>
            {this.state.error}
          </Text>
          { this.renderButton() }
          <Button style={{marginTop: 10}} block onPress={() => navigate('Registration')}>
            <Text>Registration</Text>
          </Button>
        </Content>
      </Container>
    );
  }
}

const styles = {
  errorTextStyle: {
    fontSize: 20,
    alignSelf: 'center',
    color: 'red'
  }
};

export default LoginForm;
