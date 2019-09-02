import React, { Component} from "react";
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import {
  Container, Header, Content, List, ListItem, Input,
  Text, Button, Right, Left, Icon, Item, Label, DatePicker
} from 'native-base';
import { View } from "react-native";
import Modal from "react-native-modal";

import { changeTaskName, changeTaskDate } from '../actions/actions';

class ModalEdit extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: null,
      startDate: '',
    };
  }

  setDate(newDate) {
    this.setState({ startDate: newDate });
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
    this.props.toggleModal();
  }

  handleChangeDate() {
    let date = this.state.startDate ? this.state.startDate : new Date();
    let currentTaskObject = {
      key: this.props.modalKey,
      date: date,
    }

    this.props.changeTaskDate(currentTaskObject);
    this.props.toggleModal();
  }

  render() {
    let data = this.props.data;
    if (data === null) {
      data = [];
    }
    let date = new Date(this.state.startDate ?
            this.state.startDate :
            data[this.props.modalKey] ?
            data[this.props.modalKey].eventDate
            : new Date());

    console.log(date);
    return (
      <Modal
        onSwipeComplete={this.props.toggleModal}
        swipeDirection={'down'}
        animationInTiming={800}
        isVisible={this.props.isModalVisible}>
        <Content style={{
            backgroundColor: '#FFFFFF',
            padding: 20,
            borderRadius: 10,
        }}>
        <Item>
          <Label>Task name:</Label>
          <Input
            placeholder="Change task name"
            placeholderTextColor="#d3d3d3"
            value={this.state.name !== null ?
                  this.state.name :
                  data[this.props.modalKey] ?
                  data[this.props.modalKey].name
                  : ''}
            onChangeText={(name) => this.setState({name})}
          />
          <Right>
            <Button style={{width: 135}} small success onPress={this.handleChangeName.bind(this)}>
              <Text>Change name</Text>
            </Button>
          </Right>
        </Item>
        <Item>
          <Label>Task date:</Label>
          <DatePicker
            defaultDate={date}
            locale={"en"}
            timeZoneOffsetInMinutes={undefined}
            modalTransparent={false}
            animationType={"fade"}
            androidMode={"default"}
            textStyle={{ color: "green" }}
            placeHolderTextStyle={{ color: "#d3d3d3" }}
            onDateChange={this.setDate.bind(this)}
            disabled={false}
          />
          <Right>
            <Button style={{width: 135}} small success onPress={this.handleChangeDate.bind(this)}>
              <Text>Change date</Text>
            </Button>
          </Right>
        </Item>
          <Button full style={{marginTop: 20}} onPress={this.props.toggleModal}>
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
