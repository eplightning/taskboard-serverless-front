import React, { Component } from 'react';
import { Grid } from 'material-ui';
import { DropTarget } from 'react-dnd';
import { withStyles } from 'material-ui/styles';

const styles = theme => ({
  columnNormal: {},
  columnTaskOver: {
    background: '#ccc'
  },
  columnDropTarget: {
    width: '100%',
    height: '100%'
  }
});

const taskTarget = {
  canDrop(props, monitor) {
    const item = monitor.getItem();
    return true;
  },

  hover(props, monitor, component) {
    // This is fired very often and lets you perform side effects
    // in response to the hover. You can't handle enter and leave
    // here—if you need them, put monitor.isOver() into collect() so you
    // can just use componentWillReceiveProps() to handle enter/leave.

    // You can access the coordinates if you need them
    const clientOffset = monitor.getClientOffset();
    // const componentRect = findDOMNode(component).getBoundingClientRect();

    // You can check whether we're over a nested drop target
    const isJustOverThisOne = monitor.isOver({ shallow: true });

    // You will receive hover() even for items for which canDrop() is false
    const canDrop = monitor.canDrop();
  },

  drop(props, monitor, component) {
    // Obtain the dragged item
    const item = monitor.getItem();

    // You can also do nothing and return a drop result,
    // which will be available as monitor.getDropResult()
    // in the drag source's endDrag() method
    return { moved: true };
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
          {React.Children.map(this.props.children, a => <Grid item xs={12}>{a}</Grid>)}
        </Grid>
      </div>)}
    </Grid>;
  }

}

export default withStyles(styles)(SwimlaneColumn);
