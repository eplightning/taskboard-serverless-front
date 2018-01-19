import React, { Component } from 'react';
import Typography from 'material-ui/Typography';

import '../styles/App.scss';
import Header from './Header';
import SprintContainer from '../containers/SprintContainer';
import { Route, Switch } from 'react-router-dom';
import RequireAuth from '../containers/RequireAuth';
import Home from './Home';
import ProjectsView from './ProjectsView';
import { Reboot } from 'material-ui';
import ProjectForm from './ProjectForm';

const AuthProtected = () => {
  return <RequireAuth>
    <Switch>
      <Route exact path="/projects" component={ProjectsView} />
      <Route exact path="/projects/add" component={ProjectForm} />
      <Route exact path="/sprint/:id" component={SprintContainer} />
    </Switch>
  </RequireAuth>;
};

class App extends Component {

  render() {
    return (
      <Reboot>
        <Header></Header>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route component={AuthProtected} />
        </Switch>
      </Reboot>
    );
  }

}

export default App;
