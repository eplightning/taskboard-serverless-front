import React, { Component } from 'react';
import { connect } from 'react-redux';
import SwimlaneForm from '../components/SwimlaneForm';
import { editSwimlane } from '../redux/actions/swimlane';
import Loader from '../components/Loader';

class SwimlaneEdit extends Component {

  submit = model => {
    const points = model.points != null ? parseInt(model.points, 10) : null;

    this.props.editSwimlane(
      this.props.match.params.project, this.props.match.params.sprint,
      this.props.match.params.swimlane,
      {
        ...model,
        points: points
      }
    );
  };

  render() {
    if (!this.props.loaded) {
      return <Loader/>;
    }

    const formValues = {
      name: this.props.data.name,
      description: this.props.data.description,
      points: this.props.data.points
    };

    return <SwimlaneForm formValues={formValues} submit={this.submit}/>
  }

}

export default connect(state => ({
  loaded: state.form.loaded,
  data: state.form.data
}), { editSwimlane })(SwimlaneEdit);
