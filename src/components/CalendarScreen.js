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

import DayTasks from './DayTasks.js';

import { addTask, removeTask, fetchToDos } from '../actions/actions';

class ContentScreen extends Component {
  state = {startDate: new Date()};

  onDateChange(date) {
    this.setState({
      startDate: date,
    });
  }

  render() {
    let rawData = this.props.data;
    let data = [];
    if (rawData !== null) {
      data = Object.keys(rawData).map(function(key) {
        return {key: key, data: rawData[key]};
      })
    }

    let highlightedDates = [];
    data.map((el, index) => {
      let date = new Date(el.data.eventDate);
      highlightedDates.push({
        date,
        style: {backgroundColor: '#eeeeee'},
      })
    });

    return (
      <Container>
        <Header>
          <Left>
            <Button onPress={this.props.navigation.openDrawer} transparent>
              <Icon name='menu' />
            </Button>
          </Left>
          <Body>
            <Title>Calendar App</Title>
          </Body>
          <Right />
        </Header>
        <CalendarPicker
          enableSwipe={false}
          onDateChange={this.onDateChange.bind(this)}
          customDatesStyles={highlightedDates}
        />
      <DayTasks startDate={new Date(this.state.startDate)} />
      </Container>
    );
  }
}

const mapStateToProps = (state) => {
  const { sessionState, data } = state
  return { sessionState, data }
};

const mapDispatchToProps = dispatch => (
  bindActionCreators({
    addTask,
    removeTask,
    fetchToDos,
  }, dispatch)
);

export default connect(mapStateToProps, mapDispatchToProps)(ContentScreen);
