import React, { Component } from 'react';

import ProjectForm from '../components/ProjectForm';
import { editProject, getProject } from '../redux/actions/project';
import { connect } from 'react-redux';
import Loader from '../components/Loader';

class ProjectEdit extends Component {

  componentDidMount() {
    this.props.getProject(this.props.match.params.project);
  }

  submit = model => {
    this.props.editProject(this.props.data.id, model);
  };

  render() {
    if (this.props.loaded) {
      return <ProjectForm formValues={this.props.data} submit={this.submit}/>
    } else {
      return <Loader></Loader>;
    }
  }

}

export default connect(state => ({
  loaded: state.form.loaded,
  data: state.form.data
}), { getProject, editProject })(ProjectEdit);
