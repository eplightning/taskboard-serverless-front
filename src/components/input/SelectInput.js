import React, { Component } from 'react';
import { withFormsy } from 'formsy-react';
import { Select, Input, InputLabel, FormControl } from 'material-ui';

class SelectInput extends Component {

  changeValue = (event) => {
    this.props.setValue(event.target.value);
  }

  render() {
    const { children, label, getValue, getErrorMessage, isValid, value, ...other } = this.props;

    return <FormControl>
      <InputLabel>{label}</InputLabel>
      <Select
        native
        error={!isValid()}
        fullWidth
        value={getValue() || ''}
        onChange={this.changeValue}
        margin="normal"
        {...other}
      >
        {children}
      </Select>
    </FormControl>;
  }
}

export default withFormsy(SelectInput);
