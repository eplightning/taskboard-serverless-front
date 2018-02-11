import React, { Component } from 'react';
import { addSprint } from '../redux/actions/project';
import { connect } from 'react-redux';
import SprintForm from '../components/SprintForm';

class SprintAdd extends Component {

  submit = model => {
    this.props.addSprint(this.props.match.params.project, model);
  };

  render() {
    const formValues = {
      name: '',
      start_date: '',
      end_date: ''
    };

    return <SprintForm formValues={formValues} submit={this.submit}/>
  }

}

export default connect(null, { addSprint })(SprintAdd);
