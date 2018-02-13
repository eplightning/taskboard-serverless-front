import React, { Component } from 'react';
import '../styles/Home.scss';
import { withStyles, Toolbar, Button } from 'material-ui';
import Formsy from 'formsy-react';
import TextFormInput from './input/TextFormInput';
import UserSelectInput from './input/UserSelectInput';

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
  menu: {
    width: 200,
  },
  toolbar: {
    justifyContent: 'flex-end'
  },
});

class ProjectForm extends Component {

  state = {
    valid: true
  };

  handleValid = () => {
    this.setState({ valid: true });
  };

  handleInvalid = () => {
    this.setState({ valid: false });
  };

  render() {
    const { classes, submit, formValues } = this.props;
    const { valid } = this.state;

    return <Formsy onValidSubmit={submit} onValid={this.handleValid} onInvalid={this.handleInvalid}>
      <Toolbar className={classes.toolbar}>
        <Button disabled={!valid} variant="raised" color="primary" type="submit">
          Save
        </Button>
      </Toolbar>
      <div className={classes.container}>
        <TextFormInput
          label="Project name"
          name="name"
          value={formValues.name}
          required
        />
        <UserSelectInput
          label="Members"
          name="members"
          value={formValues.members}
        />
      </div>
    </Formsy>;
  }

}

export default withStyles(styles)(ProjectForm);
