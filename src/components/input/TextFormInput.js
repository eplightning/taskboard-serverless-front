import React, { Component } from 'react';
import { withFormsy } from 'formsy-react';
import { TextField } from 'material-ui';

class TextFormInput extends Component {

  changeValue = (event) => {
    this.props.setValue(event.target.value);
  }

  render() {
    const { getValue, isValid } = this.props;
    const { label, name, required, type, multiline, fullWidth, onBlur } = this.props;

    return <TextField
      error={!isValid()}
      value={getValue() || ''}
      onChange={this.changeValue}
      margin="normal"
      label={label}
      name={name}
      required={required}
      type={type}
      multiline={multiline}
      fullWidth={fullWidth == null ? true : fullWidth}
      onBlur={onBlur}
    />;
  }
}

export default withFormsy(TextFormInput);
