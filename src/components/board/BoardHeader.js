import React, { Component } from 'react';
import { Card, Grid } from 'material-ui';
import { withStyles } from 'material-ui/styles/index';

const styles = theme => ({
  headerCard: {
    padding: [[10, 24]],
    position: 'sticky',
    zIndex: 100,
    top: 64,
  },
  total: {
    textAlign: 'right',
    fontSize: 12,
    paddingLeft: 10,
    '&:after': {
      content: '")"'
    },
    '&:before': {
      content: '"("'
    }
  }
});

class BoardHeader extends Component {

  render() {
    const { classes, totals } = this.props;

    return <Card className={classes.headerCard}>
      <Grid container spacing={8}>
        <Grid item xs={3}>
          <span>New</span>
          <span className={classes.total}>{totals.new}</span>
        </Grid>
        <Grid item xs={3}>
          <span>In progress</span>
          <span className={classes.total}>{totals.in_progress}</span>
        </Grid>
        <Grid item xs={3}>
          <span>Completed</span>
          <span className={classes.total}>{totals.done}</span>
        </Grid>
        <Grid item xs={3}>
          <span>Blocked</span>
          <span className={classes.total}>{totals.blocked}</span>
        </Grid>
      </Grid>
    </Card>;
  }

}

export default withStyles(styles)(BoardHeader);
