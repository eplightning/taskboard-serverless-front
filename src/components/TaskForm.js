import React, { Component } from 'react';
import '../styles/Home.scss';
import { Button, Toolbar, withStyles } from 'material-ui';
import Formsy from 'formsy-react';
import TextFormInput from './input/TextFormInput';
import SelectInput from './input/SelectInput';
import AssignedUserInput from './input/AssignedUserInput'

const styles = theme => ({
  container: {
    display: 'flex',
    flexWrap: 'wrap',
    padding: [[0, '20px']]
  },
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    width: 200,
  },
  inputDivFull: {
    width: '100%'
  },
  menu: {
    width: 200,
  },
  toolbar: {
    justifyContent: 'flex-end'
  },
});

class TaskForm extends Component {

  state = {
    valid: true,
    defaultPoints: ''
  };

  handleValid = () => {
    this.setState({ valid: true });
  };

  handleInvalid = () => {
    this.setState({ valid: false });
  };

  handlePointsBlur = () => {
    const model = this.refs.form.getModel();

    if (model.points === '' || model.points == null) {
      this.setState({ defaultPoints: model.planned_points });
    }
  };

  render() {
    const { classes, submit, formValues, members } = this.props;
    const { valid, defaultPoints } = this.state;

    return <Formsy onValidSubmit={submit} onValid={this.handleValid} onInvalid={this.handleInvalid} ref="form">
      <Toolbar className={classes.toolbar}>
        <Button disabled={!valid} variant="raised" color="primary" type="submit">
          Save
        </Button>
      </Toolbar>
      <div className={classes.container}>
        <SelectInput
          label="State"
          name="state"
          value={formValues.state}>
          <option value="new">New</option>
          <option value="in_progress">In progress</option>
          <option value="done">Done</option>
          <option value="blocked">Blocked</option>
        </SelectInput>
        <TextFormInput
          label="Task title"
          name="name"
          value={formValues.name}
          required
        />
        <TextFormInput
          label="Description"
          name="description"
          value={formValues.description}
          multiline
        />
        <div className={classes.inputDivFull}>
          <TextFormInput
            type="number"
            label="Planned points"
            name="planned_points"
            fullWidth={false}
            value={formValues.planned_points}
            onBlur={this.handlePointsBlur}
          />
        </div>
        <div className={classes.inputDivFull}>
          <TextFormInput
            type="number"
            label="Points"
            name="points"
            fullWidth={false}
            value={defaultPoints || formValues.points}
          />
        </div>
        <AssignedUserInput
          label="Assigned members"
          name="assigned_members"
          options={members}
          value={formValues.assigned_members}
        />
      </div>
    </Formsy>;
  }

}

export default withStyles(styles)(TaskForm);
