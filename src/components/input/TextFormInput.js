import React, { Component } from 'react';
import { withFormsy } from 'formsy-react';
import { TextField } from 'material-ui';

class TextFormInput extends Component {

  changeValue = (event) => {
    this.props.setValue(event.target.value);
  }

  render() {
    const { getValue, getErrorMessage, isValid, value, ...other } = this.props;

    return <TextField
      error={!isValid()}
      fullWidth
      value={getValue() || ''}
      onChange={this.changeValue}
      margin="normal"
      {...other}
    />;
  }
}

export default withFormsy(TextFormInput);
