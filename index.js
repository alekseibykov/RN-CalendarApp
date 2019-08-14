import React from 'react';
import {AppRegistry} from 'react-native';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import {name as appName} from './app.json';
import AppNavigator from './src/AppNavigator';
import reducer from './src/reducers/index';

const store = createStore(reducer);

class App extends React.Component {

  render() {
    return (
      <Provider store={ store }>
        <AppNavigator />
      </Provider>
    );
  }
}



AppRegistry.registerComponent(appName, () => App);
