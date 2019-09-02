import React, { Component} from "react";
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import {
  Container, Header, Content, List, ListItem,
  Text, Button, Right, Left, Icon
} from 'native-base';
import Modal from "react-native-modal";

import { removeTask } from '../actions/actions';

import TaskAdder from './TaskAdder';
import ModalEdit from './ModalEdit';

class EventList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modalKey: '',
      isModalVisible: false,
    };

    this.handleRemove = this.handleRemove.bind(this);
    this.handleOpenModal = this.handleOpenModal.bind(this);
  }

  toggleModal() {
    this.setState({ isModalVisible: !this.state.isModalVisible });
  };

  handleRemove(key) {
    this.props.removeTask(key)
  }

  handleOpenModal(key) {
    this.setState({ isModalVisible: true, modalKey: key });
  }

  render() {
    let today = this.props.dates.today;
    let tomorrow = this.props.dates.tomorrow;
    let upcoming = this.props.dates.upcoming;
    let rawData = this.props.data;
    let data = [];

    if (rawData !== null) {
      data = Object.keys(rawData).map(function(key) {
        return {key: key, data: rawData[key]};
      })
    }

    let todayList = data.map((el, index) => {
      let date = new Date(el.data.eventDate);
      if (date >= today && date < tomorrow) {
        return (
          <ListItem onPress={() => this.handleOpenModal(el.key)} key={el.key}>
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
    });
    let tomorrowList = data.map((el, index) => {
      let date = new Date(el.data.eventDate);
      if (date >= tomorrow && date < upcoming) {
        return (
          <ListItem onPress={() => this.handleOpenModal(el.key)} key={el.key}>
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
    });
    let upcomingList = data.map((el, index) => {
      let date = new Date(el.data.eventDate);
      if (date >= upcoming) {
        return (
          <ListItem onPress={() => this.handleOpenModal(el.key)} key={el.key}>
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
    });

    return (
      <Content>
        <ModalEdit
          isModalVisible={this.state.isModalVisible}
          toggleModal={this.toggleModal.bind(this)}
          modalKey={this.state.modalKey}
        />
        <List>
          <ListItem itemDivider>
            <Text>Today</Text>
            <TaskAdder day="today" />
          </ListItem>
          {todayList}
          <ListItem itemDivider>
            <Text>Tomorrow</Text>
            <TaskAdder day="tomorrow" />
          </ListItem>
          {tomorrowList}
          <ListItem itemDivider>
            <Text>Upcoming</Text>
            <TaskAdder day="upcoming" />
          </ListItem>
          {upcomingList}
        </List>
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
    removeTask,
  }, dispatch)
);

export default connect(mapStateToProps, mapDispatchToProps)(EventList);
