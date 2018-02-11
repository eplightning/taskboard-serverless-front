import React, { Component } from 'react';
import { Grid } from 'material-ui';
import { DropTarget } from 'react-dnd';
import { withStyles } from 'material-ui/styles';

const styles = theme => ({
  columnNormal: {
    minHeight: 200
  },
  columnTaskOver: {
    background: '#ccc',
    minHeight: 200
  },
  columnDropTarget: {
    width: '100%',
    height: '100%'
  }
});

const taskTarget = {
  canDrop(props, monitor) {
    return true;
  },

  drop(props, monitor, component) {
    return {
      swimlane: props.swimlane,
      state: props.state
    }
  }
};

@DropTarget('task', taskTarget, (connect, monitor) => ({
  connectDropTarget: connect.dropTarget(),
  isOver: monitor.isOver()
}))
class SwimlaneColumn extends Component {

  render() {
    const { classes } = this.props;
    const { isOver, connectDropTarget } = this.props;
    const { children } = this.props;

    return <Grid item xs={3} className={isOver ? classes.columnTaskOver : classes.columnNormal}>
      {connectDropTarget(<div className={classes.columnDropTarget}>
        <Grid container>
          {React.Children.map(children, a => <Grid item xs={12}>{a}</Grid>)}
        </Grid>
      </div>)}
    </Grid>;
  }

}

export default withStyles(styles)(SwimlaneColumn);
