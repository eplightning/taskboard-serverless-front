import React, { Component } from 'react';
import { connect } from 'react-redux';
import TaskForm from '../components/TaskForm';
import { editTask, getMembers, getTask, uploadAttachment } from '../redux/actions/task';
import Loader from '../components/Loader';

class TaskEdit extends Component {

  componentDidMount() {
    this.props.getMembers(this.props.match.params.project);
    this.props.getTask(this.props.match.params.project, this.props.match.params.task);
  }

  submit = model => {
    const points = model.points != null ? parseInt(model.points, 10) : null;
    const plannedPoints = model.planned_points != null ? parseInt(model.planned_points, 10) : null;

    this.props.editTask(this.props.match.params.project, this.props.match.params.task, {
      ...model,
      points: points,
      planned_points: plannedPoints,
      sprint_id: this.props.data.sprint_id,
      swimlane_id: this.props.data.swimlane_ud
    });
  };

  uploadAttachment = (file) => {
    this.props.uploadAttachment(this.props.match.params.project, this.props.match.params.task, file);
  };

  render() {
    if (!this.props.loaded) {
      return <Loader/>;
    }

    const { uploading } = this.props;

    const formValues = {
      name: this.props.data.name,
      description: this.props.data.description,
      points: this.props.data.points,
      planned_points: this.props.data.planned_points,
      state: this.props.data.state,
      assigned_members: this.props.data.assigned_members
    };

    return <TaskForm formValues={formValues} uploadAttachment={this.uploadAttachment} uploading={uploading}
                     attachments={this.props.data.attachments}
                     submit={this.submit} members={this.props.members} />
  }

}

export default connect(state => ({
  loaded: state.form.membersLoaded && state.form.loaded,
  members: state.form.members,
  data: state.form.data,
  uploading: state.form.uploading
}), { getMembers, editTask, getTask, uploadAttachment })(TaskEdit);
