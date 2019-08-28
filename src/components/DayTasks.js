import React, { Component} from "react";
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import {
  Container, Header, Content, List, ListItem,
  Text, Button, Input, Right, Form, Item, Icon, Left
} from 'native-base';
import { View } from 'react-native'

import { addTask, removeTask } from '../actions/actions';
import TaskAdder from './TaskAdder';
// import ModalEdit from './ModalEdit';

class DayTasks extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showModal: false,
      modalKey: '',
    };

    this.handleOpenModal = this.handleOpenModal.bind(this);
    this.handleCloseModal = this.handleCloseModal.bind(this);
  }

  handleRemove(key, uid) {
    this.props.removeTask(key, uid)
  }

  handleOpenModal(key) {
    this.setState({ showModal: true, modalKey: key });
  }

  handleCloseModal() {
    this.setState({ showModal: false });
  }

  renderTasks() {
    let startDate = new Date(this.props.startDate);
    let rawData = this.props.data;
    let data = [];
    if (rawData !== null) {
      data = Object.keys(rawData).map(function(key) {
        return {key: key, data: rawData[key]};
      })
    }
    let today = new Date(startDate.getFullYear(), startDate.getMonth(), startDate.getDate())
    let tomorrow = new Date(startDate.getFullYear(), startDate.getMonth(), startDate.getDate()).addDays(1)

    return data.map((el, index) => {
      let date = new Date(el.data.eventDate);
      if (date >= today && date < tomorrow) {
        return (
          <ListItem key={el.key}>
            <Left>
              <Text>{el.data.name + ' '}</Text>
            </Left>
            <Right>
              <Button transparent onPress={() => this.handleRemove(el.key)}>
                <Icon name="trash" />
              </Button>
            </Right>
          </ListItem>
        );
      }
      return null;
    });
  }

  render() {
    return (
      <Content>
        <List>
        <ListItem itemDivider>
          <Text>
            Tasks:
          </Text>
          <TaskAdder day={this.props.startDate} />
        </ListItem>
        </List>
        {this.renderTasks()}
      </Content>
    );

  }
}

const mapStateToProps = (state) => {
  const { data, dates, sessionState } = state
  return { data, dates, sessionState }
};

const mapDispatchToProps = dispatch => (
  bindActionCreators({
    addTask,
    removeTask,
  }, dispatch)
);

export default connect(mapStateToProps, mapDispatchToProps)(DayTasks);
