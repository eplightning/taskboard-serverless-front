import React, { Component } from 'react';

import ProjectsView from '../components/ProjectsView';
import { connect } from 'react-redux';
import { loadProjects, loadSprints, removeProject, removeSprint } from '../redux/actions/project';

class ProjectsContainer extends Component {

  constructor(props) {
    super(props);

    this.props.loadProjects();

    if (props.match.params.project) {
      this.props.loadSprints(props.match.params.project);
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.match.params.project && this.props.match.params.project !== nextProps.match.params.project) {
      this.props.loadSprints(nextProps.match.params.project);
    }
  }

  render() {
    const { match, loadProjects, loadSprints, ...other } = this.props;

    return <ProjectsView activeProject={match.params.project} {...other} />
  }

}

export default connect((state) => ({
  projects: state.project.projects,
  sprints: state.project.sprints
}), { removeProject, removeSprint, loadProjects, loadSprints })(ProjectsContainer);
