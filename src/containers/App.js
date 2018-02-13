import React, { Component } from 'react';

import '../styles/App.scss';
import Header from '../components/Header';
import SprintContainer from './SprintContainer';
import { Route, Switch } from 'react-router-dom';
import RequireAuth from './RequireAuth';
import Home from '../components/Home';
import { Reboot } from 'material-ui';
import ProjectsContainer from './ProjectsContainer';
import ProjectAdd from './ProjectAdd';
import ProjectEdit from './ProjectEdit';
import SprintAdd from './SprintAdd';
import SprintEdit from './SprintEdit';
import SwimlaneAdd from './SwimlaneAdd';
import TaskAdd from './TaskAdd';

const AuthProtected = () => {
  return <RequireAuth>
    <Switch>
      <Route exact path="/projects" component={ProjectsContainer}/>
      <Route exact path="/projects/view/:project" component={ProjectsContainer}/>
      <Route exact path="/projects/add" component={ProjectAdd}/>
      <Route exact path="/projects/edit/:project" component={ProjectEdit}/>
      <Route exact path="/sprints/add/:project" component={SprintAdd}/>
      <Route exact path="/sprints/edit/:project/:sprint" component={SprintEdit}/>
      <Route exact path="/sprints/board/:project/:sprint" component={SprintContainer}/>
      <Route exact path="/swimlanes/add/:project/:sprint" component={SwimlaneAdd}/>
      <Route exact path="/swimlanes/edit/:project/:sprint/:swimlane" component={SwimlaneAdd}/>
      <Route exact path="/tasks/add/:project/:sprint/:swimlane" component={TaskAdd}/>
      <Route exact path="/tasks/edit/:project/:sprint/:task" component={TaskAdd}/>
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
