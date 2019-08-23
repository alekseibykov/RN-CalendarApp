import React, { Component} from "react";
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import {
  Container, Header, Content, List, ListItem,
  Text, Button, Input, Right, Form, Item, Icon
} from 'native-base';
import { View } from 'react-native'

import { addTask, removeTask } from '../actions/actions';

class TaskAdder extends Component {
  constructor(props) {
    super(props);

    this.state = {
      showAddToday: false,
      nameAddToday: '',
    };
  }

  handleClick(e) {
    e.preventDefault();
    this.setState({
      showAddToday: true,
    });
  }

  handleClick_2(e) {
    e.preventDefault();
    this.setState({
      showAddToday: false,
    });
  }

  handleClick_3(val) {
    this.setState({
      nameAddToday: val,
    });
  }

  handleClick_4() {
    let eventDate;
    if (this.props.day instanceof Date) {
      eventDate = this.props.day;
    }
    if (this.props.day === 'today') {
      eventDate = new Date();
    }
    if (this.props.day === 'tomorrow') {
      eventDate = new Date().addDays(1);
    }
    if (this.props.day === 'upcoming') {
      eventDate = new Date().addDays(2);
    }
    this.props.addTask({
      name: this.state.nameAddToday,
      startDate: eventDate,
      uid: this.props.sessionState.authUser.uid
    });
    this.setState({
      showAddToday: false,
      nameAddToday: '',
    });
  }

  render() {
    let renderAddTodayTask;
    if (this.state.showAddToday) {
      renderAddTodayTask = (
        <Item style={{width: 300}} >
          <Input
            style={{backgroundColor: 'white'}}
            onChangeText={this.handleClick_3.bind(this)}
            value={this.state.nameAddToday}
          />
          <Button success onPress={this.handleClick_4.bind(this)}>
            <Text>Add</Text>
          </Button>
          <Button danger onPress={this.handleClick_2.bind(this)}>
            <Text>Cancel</Text>
          </Button>
        </Item>
      );
    } else {
      renderAddTodayTask = (
        <Right>
          <Button transparent onPress={this.handleClick.bind(this)}>
            <Icon name="ios-add-circle-outline" />
          </Button>
        </Right>
      );
    }

    return (
      <View style={{marginLeft: 20 }}>
        {renderAddTodayTask}
      </View>
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
  }, dispatch)
);

export default connect(mapStateToProps, mapDispatchToProps)(TaskAdder);
