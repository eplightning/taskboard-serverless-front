import React, { Component } from 'react';
import '../styles/Home.scss';
import { TextField, withStyles, Toolbar, Button } from 'material-ui';
import { Link } from 'react-router-dom';
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

class SprintForm extends Component {

  state = {
    valid: true,
    name: 'Cat in the Hat',
    age: '',
    multiline: 'Controlled',
    currency: 'EUR',
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

  render() {
    const { classes } = this.props;
    const { valid } = this.state;

    return <Formsy onValid={this.handleValid} onInvalid={this.handleInvalid}>
      <Toolbar className={classes.toolbar}>
        <Button disabled={!valid} raised color="primary" component={Link} to="/sprints/add">
          Save
        </Button>
      </Toolbar>
      <div className={classes.container}>
        <TextFormInput
          label="Sprint name"
          name="name"
          value="Start"
          required
        />
        <TextFormInput
          type="date"
          label="Start date"
          name="start_date"
          value="2017-01-01"
          required
        />
        <TextFormInput
          type="date"
          label="End date"
          name="end_date"
          value="2017-01-01"
          required
        />
      </div>
    </Formsy>;
  }

}

export default withStyles(styles)(SprintForm);
