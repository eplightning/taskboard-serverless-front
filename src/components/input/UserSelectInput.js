import React, { Component } from 'react';
import { withFormsy } from 'formsy-react';
import { Icon, Grid, TextField, Chip, FormLabel, FormControl, Button } from 'material-ui';

import '../../styles/UserSelectInput.scss'

const regexMail = /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

class UserSelectInput extends Component {

  state = {
    email: ''
  };

  addMail = () => {
    if (regexMail.test(this.state.email)) {
      const value = this.props.getValue() || [];

      if (!value.includes(this.state.email)) {
        this.props.setValue([...value, this.state.email]);
      }

      this.setState({ email: '' });
    }
  }

  changeEmail = (event) => {
    this.setState({ email: event.target.value });
  }

  deleteMail = (mail) => {
    const value = this.props.getValue() || [];

    const idx = value.indexOf(mail);

    if (idx !== -1) {
      value.splice(idx, 1);
      this.props.setValue([...value]);
    }
  }

  keyPress = (event) => {
    if (event.keyCode === 13) {
      this.addMail();
      event.preventDefault();
      event.stopPropagation();
    }
  }

  render() {
    const { getValue, label } = this.props;
    const { email } = this.state;

    return <div className="userSelectControl">
      <FormControl component="fieldset" className="userSelectFieldset">
        <FormLabel component="legend">{label}</FormLabel>
        <div className="userSelectRoot">
          {(getValue() || []).map((a) => {
            return <Chip className="userSelectChip" label={a} key={a} onDelete={() => this.deleteMail(a)} />
          })}
        </div>
        <Grid container spacing={8} className="userSelectGrid">
          <Grid item xs={6}>
            <TextField
              type="email"
              fullWidth
              onChange={this.changeEmail}
              value={email}
              margin="normal"
              label="E-mail"
              onKeyDown={this.keyPress}
              />
          </Grid>
          <Grid item xs={6}>
            <Button color="primary" variant="fab" onClick={this.addMail}>
              <Icon>add</Icon>
            </Button>
          </Grid>
        </Grid>
      </FormControl>
    </div>;
  }
}

export default withFormsy(UserSelectInput);
