import React from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import * as firebase from "firebase/app";
import "firebase/database";
import "firebase/auth";

const withAuthentication = Component => {
  class WithAuthentication extends React.Component {
    constructor(props) {
      super(props);
      this.state = { reload: false }
      this.props.onSetAuthUser(
      );
    }

    reload() {
      console.log('hi there');
    }

    componentDidMount() {
      let qwe = setInterval(this.reload, 500);
      setTimeout(() => clearInterval(qwe), 18500);

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
