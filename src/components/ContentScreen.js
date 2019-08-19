import React, { Component } from 'react';
import * as firebase from "firebase/app";
import "firebase/database";
import "firebase/auth";
import {
  Container, Content, Form, Item, Icon,
  Input, Label, Button, Text, Spinner,
  Header, Left, Body, Title, Right, DatePicker
 } from 'native-base';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { addTask, removeTask, fetchToDos } from '../actions/actions';
import EventList from './EventList';

class ContentScreen extends Component {
  state = {
    startDate: new Date(),
    name: 'Add task here',
  };

  componentDidMount() {
    let uid = null;
    if (this.props.sessionState.authUser) {
      uid = this.props.sessionState.authUser.uid;
      this.props.fetchToDos(uid);
    }
  }

  // componentDidMount() {
  //   var userId = firebase.auth().currentUser.uid;
  //   console.log(userId);
  //   if (userId) {
  //     let database = firebase.database();
  //     this.listener = database.ref().child('users/' + userId + '/tasks/').on('value', snap => {
  //       console.log('INSIDE');
  //       this.props.fetchToDos(snap);
  //     },
  //     (err) => {
  //       console.log(err);
  //     });
  //   }


    // this.listener = firebase.auth().onAuthStateChanged(
    //   authUser => {
    //     this.props.onSetAuthUser(authUser);
    //   },
    //   () => {
    //     this.props.onSetAuthUser(null);
    //   },
    // );
    // }

  // componentWillUnmount() {
  //   this.listener();
  // }

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

  // handleClick_2() {
  //   var userId = firebase.auth().currentUser.uid;
  //   console.log(userId);
  //   firebase.database().ref().child('users/' + userId + '/tasks/').once('value')
  //   .then((snapshot) => {
  //     console.log('INSIDE');
  //     console.log(snapshot.val());
  //     // dispatch({
  //     //   type: 'FETCH_TASKS',
  //     //   payload: snapshot.val()
  //     // });
  //   })
  // }

  renderLogout() {
    return (
      <Button onPress={() => firebase.auth().signOut()}>
        <Text>Log Out</Text>
      </Button>
    );
  }

  render() {
    console.log(this.props.data);
    return (
      <Container>

        <Content>
          <EventList />
          <Item>
            <Label>Task name:</Label>
            <Input
              placeholder="Add task here"
              placeholderTextColor="#d3d3d3"
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
          <Item>
            <Button onPress={this.handleClick.bind(this)}>
              <Text>Add</Text>
            </Button>
          </Item>
        </Content>
        {this.renderLogout()}
      </Container>
    );
  }
}

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
// const mapDispatchToProps = dispatch => (
//   bindActionCreators({
//     addTask,
//     removeTask,
//     fetchToDos: (snap) =>
//       dispatch({ type: 'FETCH_TASKS', payload: snap.val() }),
//   }, dispatch)
// );

export default connect(mapStateToProps, mapDispatchToProps)(ContentScreen);
