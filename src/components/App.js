import React, { Component } from 'react';
import Typography from 'material-ui/Typography';

import '../styles/App.scss';
import Header from './Header';
import SprintContainer from '../containers/SprintContainer';
import { Route, Switch } from 'react-router-dom';
import RequireAuth from '../containers/RequireAuth';
import Home from './Home';

const AuthProtected = () => {
  return <RequireAuth>
    <Switch>
      <Route exact path="/sprint/:id" component={SprintContainer} />
    </Switch>
  </RequireAuth>;
};

class App extends Component {

  render() {
    return (
      <React.Fragment>
        <Header></Header>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route component={AuthProtected} />
        </Switch>
      </React.Fragment>
    );
  }

}

export default App;
