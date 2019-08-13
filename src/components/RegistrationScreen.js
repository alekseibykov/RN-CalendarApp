import React, { Component } from 'react';
import firebase from 'react-native-firebase';
import { View, TextInput, TouchableOpacity, Text } from 'react-native';
import { Button, Card, CardSection } from './common';

class RegistrationScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: 'Email',
      password: 'Password',
      name: 'Your name'
    };
  }

  onPress() {
    const { email, password } = this.state;
    firebase.auth().createUserWithEmailAndPassword(email, password).catch(function(error) {
      // Handle Errors here.
      var errorCode = error.code;
      var errorMessage = error.message;

      console.log(errorMessage);
    });

    console.log(this.state.email);
  }

  render() {
    return (
      <View style={{ flex: 1 }}>
        <TextInput
          style={{height: 40, borderColor: 'gray', borderWidth: 1}}
          onChangeText={(name) => this.setState({name})}
          value={this.state.name}
        />
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
        <Button style={{ height: 70 }} onPress={this.onPress.bind(this)}>
          Create account
        </Button>
      </View>
    );
  }
}

export default RegistrationScreen;
