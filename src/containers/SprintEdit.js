import React, { Component } from 'react';
import { editSprint, getSprint } from '../redux/actions/project';
import { connect } from 'react-redux';
import Loader from '../components/Loader';
import SprintForm from '../components/SprintForm';

class SprintEdit extends Component {

  componentDidMount() {
    this.props.getSprint(this.props.match.params.project, this.props.match.params.sprint);
  }

  submit = model => {
    this.props.editSprint(this.props.data.project_id, this.props.data.id, model);
  };

  render() {
    if (this.props.loaded) {
      return <SprintForm formValues={this.props.data} submit={this.submit}/>
    } else {
      return <Loader />;
    }
  }

}

export default connect(state => ({
  loaded: state.form.loaded,
  data: state.form.data
}), { getSprint, editSprint })(SprintEdit);
