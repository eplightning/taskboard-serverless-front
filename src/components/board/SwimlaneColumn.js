import React, { Component } from 'react';
import { Grid } from 'material-ui';

class SwimlaneColumn extends Component {

  render() {
    return <Grid item xs={3}>
      {this.props.children}
    </Grid>;
  }

}

export default SwimlaneColumn;
