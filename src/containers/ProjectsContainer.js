import React, { Component } from 'react';

import ProjectsView from '../components/ProjectsView';
import { connect } from 'react-redux';
import { loadProjects, loadSprints, removeProject, removeSprint } from '../redux/actions/project';

class ProjectsContainer extends Component {

  componentDidMount() {
    this.props.loadProjects();

    if (this.props.match.params.project) {
      this.props.loadSprints(this.props.match.params.project);
    }
  }

  componentDidUpdate(prevProps) {
    if (this.props.match.params.project && this.props.match.params.project !== prevProps.match.params.project) {
      this.props.loadSprints(this.props.match.params.project);
    }
  }

  canModifyProject = (project) => {
    return project.owner === this.props.email;
  };

  render() {
    const { match, loadProjects, loadSprints, ...other } = this.props;

    return <ProjectsView canModifyProject={this.canModifyProject} activeProject={match.params.project} {...other} />
  }

}

export default connect((state) => ({
  projects: state.project.projects,
  sprints: state.project.sprints,
  email: state.user.profile.email
}), { removeProject, removeSprint, loadProjects, loadSprints })(ProjectsContainer);
