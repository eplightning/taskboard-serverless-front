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

class ProjectForm extends Component {

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
        <Button disabled={!valid} raised color="primary" component={Link} to="/projects/add">
          Save
        </Button>
      </Toolbar>
      <div className={classes.container}>
        <TextFormInput
          label="Project name"
          name="name"
          value="Start"
          required
        />
        <UserSelectInput
          label="Members"
          name="members"
          value={['wrexdot@gmail.com', 'test@gmail.com']}
        />
      </div>
    </Formsy>;
  }

}

export default withStyles(styles)(ProjectForm);
