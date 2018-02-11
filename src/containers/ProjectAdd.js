import React, { Component } from 'react';

import ProjectForm from '../components/ProjectForm';
import { addProject } from '../redux/actions/project';
import { connect } from 'react-redux';

class ProjectAdd extends Component {

  submit = model => {
    this.props.addProject(model);
  };

  render() {
    const formValues = {
      name: '',
      members: []
    };

    return <ProjectForm formValues={formValues} submit={this.submit} />
  }

}

export default connect(null, { addProject })(ProjectAdd);
