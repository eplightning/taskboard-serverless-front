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
import SwimlaneEdit from './SwimlaneEdit';
import TaskAdd from './TaskAdd';
import TaskEdit from './TaskEdit';
import { connect } from 'react-redux';
import { userLogout } from '../redux/actions/user';

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
      <Route exact path="/swimlanes/edit/:project/:sprint/:swimlane" component={SwimlaneEdit}/>
      <Route exact path="/tasks/add/:project/:sprint/:swimlane" component={TaskAdd}/>
      <Route exact path="/tasks/edit/:project/:sprint/:task" component={TaskEdit}/>
    </Switch>
  </RequireAuth>;
};

class App extends Component {

  render() {
    const { sprints, projects, signedIn, email, userLogout } = this.props;

    return (
      <Reboot>
        <Header sprints={sprints} userLogout={userLogout}
                projects={projects} signedIn={signedIn} email={email} />
        <Switch>
          <Route exact path="/" component={Home}/>
          <Route component={AuthProtected}/>
        </Switch>
      </Reboot>
    );
  }

}

export default connect(state => ({
  signedIn: state.user.signedIn,
  email: state.user.profile.email,
  projects: state.project.projects,
  sprints: state.project.sprints
}), { userLogout })(App);
