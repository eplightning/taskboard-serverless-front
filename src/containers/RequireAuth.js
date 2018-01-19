import React, { Component } from 'react';

import auth from '../utils/auth';
import Loader from '../components/Loader';
import { connect } from 'react-redux';

class RequireAuthView extends Component {

  constructor(props) {
    super(props);
  }

  componentDidMount() {
    if (!this.props.signedIn) {
      auth.login();
    }
  }

  render() {
    return this.props.signedIn ? this.props.children : <Loader />;
  }

}

const RequireAuth = connect((state) => ({
  signedIn: state.user.signedIn
}))(RequireAuthView);

export default RequireAuth;
