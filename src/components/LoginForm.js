import React, { Component } from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import * as firebase from "firebase/app";
import "firebase/database";
import "firebase/auth";
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

  reload() {
    console.log('hi there');
  }

  onPress() {
    const { email, password } = this.state;
    let qwe = setInterval(this.reload, 500);
    setTimeout(() => clearInterval(qwe), 18500);

    this.setState({ error: '', loading: true });
    firebase.auth().signInWithEmailAndPassword(email, password)
    .then((authUser) => {
      this.props.onSetAuthUser(authUser);
    })
    .catch((err) => {
      this.onLoginFail(err);
    })
  }

  onLoginFail(err) {
    console.log(err);
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

const mapDispatchToProps = dispatch => ({
  onSetAuthUser: authUser =>
    dispatch({ type: 'AUTH_USER_SET', authUser }),
});

const styles = {
  errorTextStyle: {
    fontSize: 20,
    alignSelf: 'center',
    color: 'red'
  }
};

export default connect(null, mapDispatchToProps)(LoginForm);
