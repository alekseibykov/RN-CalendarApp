import React, { Component } from 'react';
import firebase from 'react-native-firebase';
import {
  Container, Content, Form, Item, Icon,
  Input, Label, Button, Text, Spinner,
  Header, Left, Body, Title, Right
 } from 'native-base';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { expandItem } from '../actions/ListActions';

class ContentScreen extends Component {
  constructor(props) {
    super(props);

  }

  render() {
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
  const { content, show } = state
  return { content, show }
};

const mapDispatchToProps = dispatch => (
  bindActionCreators({
    expandItem,
  }, dispatch)
);

export default connect(mapStateToProps, mapDispatchToProps)(ContentScreen);
