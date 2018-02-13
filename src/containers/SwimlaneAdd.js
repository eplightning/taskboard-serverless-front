import React, { Component } from 'react';
import { connect } from 'react-redux';
import SwimlaneForm from '../components/SwimlaneForm';
import { addSwimlane } from '../redux/actions/swimlane';

class SwimlaneAdd extends Component {

  submit = model => {
    const points = model.points != null ? parseInt(model.points, 10) : null;

    this.props.addSwimlane(this.props.match.params.project, this.props.match.params.sprint, {
      ...model,
      points: points
    });
  };

  render() {
    const formValues = {
      name: '',
      description: '',
      points: null
    };

    return <SwimlaneForm formValues={formValues} submit={this.submit}/>
  }

}

export default connect(null, { addSwimlane })(SwimlaneAdd);
