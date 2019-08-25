import React, { Component } from "react";
import {
  createDrawerNavigator,
  createAppContainer,
  createMaterialTopTabNavigator
} from 'react-navigation';
import { bindActionCreators, compose  } from 'redux';
import { connect } from 'react-redux';

import HomeScreen from './components/HomeScreen';
import RegistrationScreen from './components/RegistrationScreen';
import CalendarScreen from './components/CalendarScreen';
import withAuthentication  from './components/Session/withAuthentication';
import SideBar from './components/SideBar';

const TabNavigator = createMaterialTopTabNavigator(
  {
    Home: {screen: HomeScreen},
    Calendar: {screen: CalendarScreen},
  },
  {
    defaultNavigationOptions: ({ navigation }) => ({
      tabBarVisible: false
    }),
    tabBarOptions: {
      activeTintColor: 'tomato',
      inactiveTintColor: 'gray',
    },
  }
);

const MainNavigator = createDrawerNavigator({
  Home: TabNavigator,
  Registration: {screen: RegistrationScreen},
  Calendar: {screen: CalendarScreen},
},
{
  contentComponent: props => <SideBar {...props} />
});

const AppNavigator = createAppContainer(MainNavigator);

export default compose(
  withAuthentication,
  connect(

  ),
)(AppNavigator);
