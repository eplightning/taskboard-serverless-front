import React, { Component } from 'react';
import Typography from 'material-ui/Typography';

import '../styles/App.scss';
import Header from './Header';
import SprintContainer from '../containers/SprintContainer';
import { Route } from 'react-router-dom';

class App extends Component {

  render() {
    return (
      <React.Fragment>
        <Header></Header>
        <div>
          <Route exact path="/" component={SprintContainer} />
          <Route exact path="/sprint/:id" component={SprintContainer} />
        </div>
      </React.Fragment>
    );
  }

}

export default App;
