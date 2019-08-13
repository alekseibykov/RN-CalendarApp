import React, { Component } from 'react';
import firebase from 'react-native-firebase';
import { View, TextInput, Text, ActivityIndicator } from 'react-native';
import { Button, Card, CardSection } from './common';

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

  async onPress() {
    const { email, password } = this.state;

    this.setState({ error: '', loading: true });
    await firebase.auth().signInWithEmailAndPassword(email, password);
  }

  // onLoginSuccess() {
  //   this.setState({
  //     email: '',
  //     password: '',
  //     loading: false,
  //     error: ''
  //   });
  // }

  onLoginFail() {
    this.setState({ error: 'Authentication Failed', loading: false });
  }

  renderButton() {
    if (this.state.loading) {
      return <ActivityIndicator size="small" />;
    }

    return (
      <Button style={{ height: 70 }} onPress={this.onPress.bind(this)}>
        Log In
      </Button>
    );
  }

  render() {
    const {navigate} = this.props.navigation;
    return (
      <View style={{ flex: 1 }}>
        <TextInput
          style={{height: 40, borderColor: 'gray', borderWidth: 1}}
          onChangeText={(email) => this.setState({email})}
          value={this.state.email}
        />
        <TextInput
          style={{height: 40, borderColor: 'gray', borderWidth: 1}}
          onChangeText={(password) => this.setState({password})}
          value={this.state.password}
        />
        <Text style={styles.errorTextStyle}>
          {this.state.error}
        </Text>

        { this.renderButton() }

        <Button style={{ height: 70 }} onPress={() => navigate('Registration')}>
          Registation
        </Button>
      </View>
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
