import React, { Component } from 'react';
import { withFormsy } from 'formsy-react';
import { Select, Input, InputLabel, FormControl } from 'material-ui';

class SelectInput extends Component {

  changeValue = (event) => {
    this.props.setValue(event.target.value);
  }

  render() {
    const { children, label, name, getValue, isValid } = this.props;

    return <FormControl>
      <InputLabel>{label}</InputLabel>
      <Select
        native
        error={!isValid()}
        fullWidth
        value={getValue() || ''}
        onChange={this.changeValue}
        margin="dense"
        name={name}
      >
        {children}
      </Select>
    </FormControl>;
  }
}

export default withFormsy(SelectInput);
