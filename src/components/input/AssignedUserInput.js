import React, { Component } from 'react';
import { withFormsy } from 'formsy-react';
import { Select, Input, MenuItem, InputLabel, FormControl } from 'material-ui';
class AssignedUserInput extends Component {

  changeValue = (event) => {
    this.props.setValue(event.target.value);
  };

  render() {
    const { options, name, label, getValue, isValid } = this.props;

    const formValue = getValue() || [];

    return <FormControl margin="dense" fullWidth>
      <InputLabel>{label}</InputLabel>
      <Select
        fullWidth
        multiple
        error={!isValid()}
        value={formValue}
        onChange={this.changeValue}
        margin="dense"
        name={name}
      >
        {options.map(a => {
          return <MenuItem key={a} value={a} style={{
            fontWeight:
              formValue.indexOf(a) === -1
                ? 'normal'
                : 'bold'
          }}>
            {a}
          </MenuItem>;
        })}
      </Select>
    </FormControl>;
  }
}

export default withFormsy(AssignedUserInput);
