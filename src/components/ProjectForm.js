import React, { Component } from 'react';
import '../styles/Home.scss';
import { TextField, withStyles } from 'material-ui';

const styles = theme => ({
  container: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    width: 200,
  },
  menu: {
    width: 200,
  },
});

class ProjectForm extends Component {

  state = {
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

  render() {
    const { classes } = this.props;

    return <form className={classes.container} noValidate autoComplete="off">
      <TextField
        fullWidth
        id="name"
        label="Name"
        className={classes.textField}
        value={this.state.name}
        onChange={this.handleChange('name')}
        margin="normal"
      />
      <TextField
        id="name"
        label="Name"
        className={classes.textField}
        value={this.state.name}
        onChange={this.handleChange('name')}
        margin="normal"
      />
      <TextField
        id="name"
        label="Name"
        className={classes.textField}
        value={this.state.name}
        onChange={this.handleChange('name')}
        margin="normal"
      />


    </form>;
  }

}

export default withStyles(styles)(ProjectForm);
