import React, { Component } from 'react';
import firebase from 'react-native-firebase';
import {
  Container, Content, Form, Item, Icon,
  Input, Label, Button, Text, Spinner,
  Header, Left, Body, Title, Right
 } from 'native-base';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { addTask, removeTask, fetchToDos } from '../actions/actions';

class ContentScreen extends Component {
  constructor(props) {
    super(props);

  }

  render() {
    console.log(this.props.sessionState);
    return (
      <Container>
        <Text>Hello there</Text>
        <Button onPress={() => firebase.auth().signOut()}>
          <Text>Log Out</Text>
        </Button>
      </Container>
    );
  }
}

const mapStateToProps = (state) => {
  const { sessionState } = state
  return { sessionState }
};

const mapDispatchToProps = dispatch => (
  bindActionCreators({
    addTask,
    removeTask,
    fetchToDos,
  }, dispatch)
);

export default connect(mapStateToProps, mapDispatchToProps)(ContentScreen);
