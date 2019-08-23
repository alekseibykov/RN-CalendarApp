import React, { Component } from 'react';
import * as firebase from "firebase/app";
import "firebase/database";
import "firebase/auth";
import {
  Container, Content, Form, Item, Icon,
  Input, Label, Button, Text, Spinner,
  Header, Left, Body, Title, Right, DatePicker,
 } from 'native-base';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { StyleSheet } from 'react-native'

import { addTask, removeTask, fetchToDos } from '../actions/actions';
import EventList from './EventList';

class ContentScreen extends Component {
  state = {
    startDate: new Date(),
    name: '',
  };

  componentDidMount() {
    let uid = null;
    if (this.props.sessionState.authUser) {
      uid = this.props.sessionState.authUser.uid;
      this.props.fetchToDos(uid);
    }
  }

  setDate(newDate) {
    this.setState({ startDate: newDate });
  }

  handleInputChange(e) {
    this.setState({
      name: e.target.value
    });
  }

  handleClick(e) {
    let d = this.state.startDate;
    let nd = new Date();
    let dateId = new Date(
      d.getFullYear(),
      d.getMonth(),
      d.getDate(),
      nd.getHours(),
      nd.getMinutes(),
      nd.getSeconds(),
      nd.getMilliseconds()
    );
    this.props.addTask({
      name: this.state.name,
      startDate: dateId,
      uid: this.props.sessionState.authUser.uid
    });
    this.setState({
      name: '',
    });
  }

  renderEventList() {
    if (this.props.data === null) {
      return (
        <Spinner />
      );
    } else {
      return (
        <EventList />
      );
    }
  }

  render() {
    return (
      <Container>
        <Content>
          {this.renderEventList()}
          <Item style={styles.item}>
            <Label>Task name:</Label>
            <Input
              placeholder="Add task here"
              placeholderTextColor="#d3d3d3"
              value={this.state.name}
              onChangeText={(name) => this.setState({name})}
            />
          </Item>
          <Item>
            <Label>Task date:</Label>
            <DatePicker
              defaultDate={new Date()}
              locale={"en"}
              timeZoneOffsetInMinutes={undefined}
              modalTransparent={false}
              animationType={"fade"}
              androidMode={"default"}
              placeHolderText={this.state.startDate.toString().substr(4, 12)}
              textStyle={{ color: "green" }}
              placeHolderTextStyle={{ color: "#d3d3d3" }}
              onDateChange={this.setDate.bind(this)}
              disabled={false}
            />
          </Item>
          <Button style={{marginTop: 20, height: 60}} full onPress={this.handleClick.bind(this)}>
            <Text>Add Specific Task</Text>
          </Button>
        </Content>
      </Container>
    );
  }
}

const styles = StyleSheet.create({
  item: {
    marginTop: 20
  }
});

const mapStateToProps = (state) => {
  const { data, sessionState } = state
  return { data, sessionState }
};

const mapDispatchToProps = dispatch => (
  bindActionCreators({
    addTask,
    removeTask,
    fetchToDos,
  }, dispatch)
);

export default connect(mapStateToProps, mapDispatchToProps)(ContentScreen);
