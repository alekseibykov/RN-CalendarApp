import {createStackNavigator, createAppContainer} from 'react-navigation';
import { bindActionCreators, compose  } from 'redux';
import { connect } from 'react-redux';

import HomeScreen from './components/HomeScreen';
import RegistrationScreen from './components/RegistrationScreen';
import withAuthentication  from './components/Session/withAuthentication';

const MainNavigator = createStackNavigator({
  Home: {screen: HomeScreen},
  Registration: {screen: RegistrationScreen},
},
{
  headerMode: 'none',
});

const AppNavigator = createAppContainer(MainNavigator);

export default compose(
  withAuthentication,
  connect(

  ),
)(AppNavigator);
