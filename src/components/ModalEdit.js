import React, { Component} from "react";
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import {
  Container, Header, Content, List, ListItem,
  Text, Button, Right, Left, Icon
} from 'native-base';
import { View } from "react-native";
import Modal from "react-native-modal";

import { changeTaskName, changeTaskDate } from '../actions/actions';

class ModalEdit extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      startDate: '',
    };
  }

  handleInputChange(e) {
    this.setState({
      name: e.target.value
    });
  }

  handleChangeName() {
    let currentTaskObject = {
      key: this.props.modalKey,
      name: this.state.name,
    }

    this.props.changeTaskName(currentTaskObject);
    this.props.handleCloseModal();
  }

  handleInputChange_2(date) {
    this.setState({
      startDate: date
    });
  }

  handleChangeDate() {
    let currentTaskObject = {
      key: this.props.modalKey,
      date: this.state.startDate,
    }

    this.props.changeTaskDate(currentTaskObject);
    this.props.handleCloseModal();
  }

  render() {
    let data = this.props.data;
    if (data === null) {
      data = [];
    }
    // let el = document.getElementById("root");
    let date = new Date(this.state.startDate ?
            this.state.startDate :
            data[this.props.modalKey] ?
            data[this.props.modalKey].eventDate
            : '');

    return (
      <Modal isVisible={this.props.isModalVisible}>
        <Content style={{backgroundColor: '#FFFFFF', padding: 20, borderRadius: 10,}}>
          <Text>Hello!</Text>
          <Button onPress={this.props.toggleModal}>
            <Text>Close</Text>
          </Button>
        </Content>
      </Modal>
    );
  }
}

const mapStateToProps = (state) => {
  const { data, dates } = state
  return { data, dates }
};

const mapDispatchToProps = dispatch => (
  bindActionCreators({
    changeTaskName,
    changeTaskDate,
  }, dispatch)
);

export default connect(mapStateToProps, mapDispatchToProps)(ModalEdit);
