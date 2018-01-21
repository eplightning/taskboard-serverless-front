import React, { Component } from 'react';
import '../styles/Home.scss';
import { TextField, withStyles, Toolbar, Button } from 'material-ui';
import { Link } from 'react-router-dom';
import Formsy from 'formsy-react';
import TextFormInput from './input/TextFormInput';
import UserSelectInput from './input/UserSelectInput';
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
    name: 'Cat in the Hat',
    age: '',
    multiline: 'Controlled',
    currency: 'EUR',
    defaultPoints: ''
  };

  handleChange = name => event => {
    this.setState({
      [name]: event.target.value,
    });
  };

  handleValid = () => {
    this.setState({ valid: true });
  }

  handleInvalid = () => {
    this.setState({ valid: false });
  }

  handlePointsBlur = () => {
    const model = this.refs.form.getModel();

    if (model.points == '' || model.points == null) {
      this.setState({ defaultPoints: model.planned_points });
    }
  }

  render() {
    const { classes } = this.props;
    const { valid, defaultPoints } = this.state;

    return <Formsy onValid={this.handleValid} onInvalid={this.handleInvalid} ref="form">
      <Toolbar className={classes.toolbar}>
        <Button disabled={!valid} raised color="primary" component={Link} to="/sprints/add">
          Save
        </Button>
      </Toolbar>
      <div className={classes.container}>
        <SelectInput
          label="State"
          name="state"
          value="new">
          <option value="new">New</option>
          <option value="in_progress">In progress</option>
          <option value="done">Done</option>
          <option value="blocked">Blocked</option>
        </SelectInput>
        <TextFormInput
          label="Task title"
          name="title"
          value="Start"
          required
        />
        <TextFormInput
          label="Description"
          name="description"
          value="Start"
          multiline
        />
        <div className={classes.inputDivFull}>
          <TextFormInput
            type="number"
            label="Planned points"
            name="planned_points"
            fullWidth={false}
            value=""
            onBlur={this.handlePointsBlur}
          />
        </div>
        <div className={classes.inputDivFull}>
          <TextFormInput
            type="number"
            label="Points"
            name="points"
            fullWidth={false}
            value={defaultPoints}
          />
        </div>
        <AssignedUserInput
          label="Assigned members"
          name="assigned"
          options={['wrexdot@gmail.com', 'test@gmail.com', 'inny@gmail.com']}
          value={['wrexdot@gmail.com', 'test@gmail.com']}
        />
      </div>
    </Formsy>;
  }

}

export default withStyles(styles)(TaskForm);
