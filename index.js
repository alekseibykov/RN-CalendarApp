import React from 'react';
import {AppRegistry} from 'react-native';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import reduxThunk from 'redux-thunk';

import {name as appName} from './app.json';
import AppNavigator from './src/AppNavigator';
import reducer from './src/reducers/index';

const store = createStore(reducer, {}, applyMiddleware(reduxThunk));

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
