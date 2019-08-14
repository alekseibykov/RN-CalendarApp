import React, { Component } from 'react';
import firebase from 'react-native-firebase';
import {
  Container, Content, Form, Item, Icon,
  Input, Label, Button, Text, Spinner, Header, Left, Body, Title, Right
 } from 'native-base';

class RegistrationScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: ' ',
      password: ' ',
      name: ' ',
      error: '',
    };
  }

  onPress() {
    const { email, password } = this.state;
    firebase.auth().createUserWithEmailAndPassword(email, password)
    .catch((error) => {
      // Handle Errors here.
      var errorCode = error.code;
      var errorMessage = error.message;
      this.setState({error: error.message})
      console.log(errorMessage);
    });
  }

  onBack() {
    this.props.navigation.navigate('Home');
  }

  render() {
    const {navigate} = this.props.navigation;
    return (
      <Container>
        <Header>
          <Left>
            <Button onPress={this.onBack.bind(this)} transparent>
              <Icon name='arrow-back' />
            </Button>
          </Left>
          <Body>
            <Title>Calendar App</Title>
          </Body>
          <Right />
        </Header>
        <Content>
          <Form>
            <Item floatingLabel>
              <Label>Full name</Label>
              <Input
                onChangeText={(name) => this.setState({name})}
                value={this.state.name}
              />
            </Item>
            <Item floatingLabel>
              <Label>Email</Label>
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
          <Button style={{marginTop: 40}} block onPress={this.onPress.bind(this)}>
            <Text>Create account</Text>
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

export default RegistrationScreen;
