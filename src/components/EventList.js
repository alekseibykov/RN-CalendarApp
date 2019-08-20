import React, { Component} from "react";
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import {
  Container, Header, Content, List, ListItem,
  Text, Button,
} from 'native-base';

import { removeTask } from '../actions/actions';

// import TaskAdder from './TaskAdder';
// import ModalEdit from './ModalEdit';

class EventList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showModal: false,
      modalKey: '',
    };

    this.handleRemove = this.handleRemove.bind(this);
    this.handleOpenModal = this.handleOpenModal.bind(this);
    this.handleCloseModal = this.handleCloseModal.bind(this);
  }

  handleRemove(key) {
    this.props.removeTask(key)
  }

  handleOpenModal(key) {
    this.setState({ showModal: true, modalKey: key });
  }

  handleCloseModal() {
    this.setState({ showModal: false });
  }

  render() {
    console.log('QWE', this.props.data);
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
      if (date >= today && date <= tomorrow) {
        return (
          <ListItem key={el.key}>
            <Text>{el.data.name + ' '}</Text>
            <Button onPress={() => this.handleRemove(el.key)}><Text>Remove</Text></Button>
          </ListItem>
        );
      }
    });
    let tomorrowList = data.map((el, index) => {
      let date = new Date(el.data.eventDate);
      if (date >= tomorrow && date <= upcoming) {
        return (
          <ListItem key={el.key}>
            <Text>{el.data.name + ' '}</Text>
            <Button onPress={() => this.handleRemove(el.key)}><Text>Remove</Text></Button>
          </ListItem>
        );
      }
    });
    let upcomingList = data.map((el, index) => {
      let date = new Date(el.data.eventDate);
      if (date >= upcoming) {
        return (
          <ListItem key={el.key}>
            <Text>{el.data.name + ' '}</Text>
            <Button onPress={() => this.handleRemove(el.key)}><Text>Remove</Text></Button>
          </ListItem>
        );
      }
    });

    // let tomorrowList = data.map((el, index) => {
    //   let date = new Date(el.data.eventDate);
    //   if (date >= tomorrow && date <= upcoming) {
    //     return (
    //       <li className="task_item" key={el.key}>
    //         <span onClick={() => this.handleOpenModal(el.key)}>
    //           {el.data.name + ' '}
    //         </span>
    //         <button onClick={() => this.handleRemove(el.key, uid)} type="button">Remove</button>
    //       </li>
    //     );
    //   }
    //   return null;
    // });
    //
    // // TODO upcoming should be no date insted of today + 2
    // let upcomingList = data.map((el, index) => {
    //   let date = new Date(el.data.eventDate);
    //   if (date >= upcoming) {
    //     return (
    //       <li className="task_item" key={el.key}>
    //         <span onClick={() => this.handleOpenModal(el.key)}>
    //           {el.data.name + ' '}
    //         </span>
    //         <button onClick={() => this.handleRemove(el.key, uid)} type="button">Remove</button>
    //       </li>
    //     );
    //   }
    //   return null;
    // });

    return (
      <Content>
        <List>
          <ListItem itemDivider>
            <Text>Today</Text>
          </ListItem>
          {todayList}
          <ListItem itemDivider>
            <Text>Tomorrow</Text>
          </ListItem>
          {tomorrowList}
          <ListItem itemDivider>
            <Text>Upcoming</Text>
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
