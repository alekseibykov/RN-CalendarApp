import React from "react";
import { AppRegistry, Image, StatusBar } from "react-native";
import {
  Button,
  Text,
  Container,
  List,
  ListItem,
  Content,
  Icon
} from "native-base";
import * as firebase from "firebase/app";
import "firebase/database";
import "firebase/auth";

class SideBar extends React.Component {
  onLogout() {
    firebase.auth().signOut();
    this.props.navigation.closeDrawer();
  }

  renderLogout() {
    if (firebase.auth().currentUser) {
      return (
        <Button onPress={this.onLogout.bind(this)}>
          <Text>Log Out</Text>
        </Button>
      );
    }
  }

  render() {
    return (
      <Container>
        <Content>
          <List>
            <ListItem
              button
              onPress={() => this.props.navigation.navigate('Home')}
            >
              <Text>Home</Text>
            </ListItem>
            <ListItem
              button
              onPress={() => this.props.navigation.navigate('Calendar')}
            >
              <Text>Calendar</Text>
            </ListItem>
          </List>
        </Content>
        {this.renderLogout()}
      </Container>
    );
  }
}

export default SideBar;
