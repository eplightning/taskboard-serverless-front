import React, { Component } from 'react';

import '../styles/App.scss';
import Header from './Header';
import SprintContainer from '../containers/SprintContainer';
import { Route, Switch } from 'react-router-dom';
import RequireAuth from '../containers/RequireAuth';
import Home from './Home';
import ProjectsView from './ProjectsView';
import SprintForm from './SprintForm';
import { Reboot } from 'material-ui';
import ProjectForm from './ProjectForm';
import SwimlaneForm from './SwimlaneForm';
import TaskForm from './TaskForm';
import ProjectsContainer from '../containers/ProjectsContainer';

const AuthProtected = () => {
  return <RequireAuth>
    <Switch>
      <Route exact path="/projects" component={ProjectsContainer}/>
      <Route exact path="/projects/view/:project" component={ProjectsContainer}/>
      <Route exact path="/projects/add" component={ProjectForm}/>
      <Route exact path="/sprints/add" component={SprintForm}/>
      <Route exact path="/sprints/:id/board" component={SprintContainer}/>
      <Route exact path="/sprints/:id/swimlanes/add" component={SwimlaneForm}/>
      <Route exact path="/sprints/:id/tasks/add/:swimlane" component={TaskForm}/>
    </Switch>
  </RequireAuth>;
};

class App extends Component {

  render() {
    const projects = [
      {
        id: 'test',
        name: 'eLF Konfigurator'
      },
      {
        id: 'test2',
        name: 'Inny'
      }
    ];

    const sprints = [
      {
        id: 'test',
        project: 'project',
        name: 'Sprints 18',
        startDate: '2018-01-01',
        endDate: '2018-02-02'
      },
      {
        id: 'test2',
        project: 'project',
        name: 'Sprints 17',
        startDate: '2018-01-01',
        endDate: '2018-02-02'
      },
    ];

    return (
      <Reboot>
        <Header sprints={sprints}
                projects={projects} signedIn={true} email="wrexdot@gmail.com"></Header>
        <Switch>
          <Route exact path="/" component={Home}/>
          <Route component={AuthProtected}/>
        </Switch>
      </Reboot>
    );
  }

}

export default App;
