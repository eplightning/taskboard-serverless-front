import React, { Component } from 'react';
import '../styles/Home.scss';
import { withStyles, Toolbar, Button } from 'material-ui';
import Formsy from 'formsy-react';
import TextFormInput from './input/TextFormInput';

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

class SprintForm extends Component {

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
          label="Sprint name"
          name="name"
          value={formValues.name}
          required
        />
        <TextFormInput
          type="date"
          label="Start date"
          name="start_date"
          value={formValues.start_date}
          required
        />
        <TextFormInput
          type="date"
          label="End date"
          name="end_date"
          value={formValues.end_date}
          required
        />
      </div>
    </Formsy>;
  }

}

export default withStyles(styles)(SprintForm);
