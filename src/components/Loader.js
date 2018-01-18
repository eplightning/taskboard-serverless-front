import React, { Component } from 'react';
import { CircularProgress } from 'material-ui';
import '../styles/Loader.scss';

export default class Loader extends Component {

  render() {
    return <div className="loader">
      <CircularProgress size={200}></CircularProgress>
    </div>;
  }
}
