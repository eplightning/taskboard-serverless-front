import React, { Component } from 'react';

import { Button, Typography } from 'material-ui';
import '../styles/Home.scss';
import { Link } from 'react-router-dom';

class Home extends Component {

  render() {
    return <div className="homeContainer">
      <Button raised component={Link} to="/projects">Start</Button>
    </div>;
  }

}

export default Home;
