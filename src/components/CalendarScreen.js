import React, { Component } from 'react';
import * as firebase from "firebase/app";
import "firebase/database";
import "firebase/auth";
import {
  Container, Content, Form, Item, Icon,
  Input, Label, Button, Text, Spinner,
  Header, Left, Body, Title, Right
 } from 'native-base';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import CalendarPicker from 'react-native-calendar-picker';

import { addTask, removeTask, fetchToDos } from '../actions/actions';

class ContentScreen extends Component {
  state = {selectedStartDate: null};

  onDateChange(date) {
    this.setState({
      selectedStartDate: date,
    });
  }

  render() {
    console.log(this.props.sessionState);
    return (
      <Container>
        <CalendarPicker
          onDateChange={this.onDateChange.bind(this)}
        />
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
