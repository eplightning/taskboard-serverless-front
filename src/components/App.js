import React, { Component } from 'react';
import Typography from 'material-ui/Typography';

import '../styles/App.scss';
import Header from './Header';
import SprintContainer from '../containers/SprintContainer';
import { ConnectedRouter } from 'react-router-redux';
import { Route } from 'react-router-dom';

class App extends Component {

  render() {
    return (
      <React.Fragment>
        <Header></Header>
        <ConnectedRouter history={this.props.history}>
          <div>
            <Route exact path="/" component={Header} />
            <Route exact path="/sprint/:id" component={SprintContainer} />
          </div>
        </ConnectedRouter>
      </React.Fragment>
    );
  }

}

export default App;
