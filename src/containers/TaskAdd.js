import React, { Component } from 'react';
import { connect } from 'react-redux';
import TaskForm from '../components/TaskForm';
import { addTask, getMembers } from '../redux/actions/task';
import Loader from '../components/Loader';

class TaskAdd extends Component {

  componentDidMount() {
    this.props.getMembers(this.props.match.params.project);
  }

  submit = model => {
    const points = model.points != null ? parseInt(model.points, 10) : null;
    const plannedPoints = model.planned_points != null ? parseInt(model.planned_points, 10) : null;

    this.props.addTask(this.props.match.params.project, {
      ...model,
      points: points,
      planned_points: plannedPoints,
      sprint_id: this.props.match.params.sprint,
      swimlane_id: this.props.match.params.swimlane
    });
  };

  render() {
    if (!this.props.loaded) {
      return <Loader/>;
    }

    const formValues = {
      name: '',
      description: '',
      points: null,
      planned_points: null,
      state: 'new',
      assigned_members: []
    };

    return <TaskForm formValues={formValues} submit={this.submit} members={this.props.members}/>
  }

}

export default connect(state => ({
  loaded: state.form.membersLoaded,
  members: state.form.members
}), { getMembers, addTask })(TaskAdd);
