import React from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import firebase from 'react-native-firebase';

const withAuthentication = Component => {
  class WithAuthentication extends React.Component {
    constructor(props) {
      super(props);

      this.props.onSetAuthUser(
      );
    }

    componentDidMount() {
      this.listener = firebase.auth().onAuthStateChanged(
        authUser => {
          this.props.onSetAuthUser(authUser);
        },
        () => {
          this.props.onSetAuthUser(null);
        },
      );
    }

    componentWillUnmount() {
      this.listener();
    }

    render() {
      return <Component {...this.props} />;
    }
  }

  const mapDispatchToProps = dispatch => ({
    onSetAuthUser: authUser =>
      dispatch({ type: 'AUTH_USER_SET', authUser }),
  });

  return connect(null, mapDispatchToProps)(WithAuthentication);
};

export default withAuthentication;
