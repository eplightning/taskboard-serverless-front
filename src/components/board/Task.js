import React, { Component } from 'react';
import {
  Avatar,
  Badge,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Icon,
  IconButton,
  Menu,
  MenuItem,
  TextField,
  Tooltip,
  Typography
} from 'material-ui';
import { withStyles } from 'material-ui/styles';
import { DragSource } from 'react-dnd';
import { Link } from 'react-router-dom';
import gravatar from 'gravatar';

const styles = theme => ({
  actions: {
    justifyContent: 'space-between'
  },
  smallAvatar: {
    width: 35,
    height: 35
  },
  title: {
    fontSize: 18
  },
  pointInput: {
    width: 40
  }
});

const boxSource = {
  beginDrag(props) {
    return {
      task: props.task,
      swimlane: props.task.swimlane_id,
      state: props.task.state
    }
  },

  canDrag(props) {
    return true;
  },

  endDrag(props, monitor) {
    const item = monitor.getItem();
    const dropResult = monitor.getDropResult();

    if (dropResult && (item.swimlane !== dropResult.swimlane || item.state !== dropResult.state)) {
      props.moveTask(item.task, dropResult.swimlane, dropResult.state);
    }
  },
};

@DragSource('task', boxSource, (connect, monitor) => ({
  connectDragSource: connect.dragSource(),
  isDragging: monitor.isDragging(),
}))
class Task extends Component {

  state = {
    anchorEl: null,
    focused: false,
    points: ''
  };

  handleFocus = () => {
    this.setState({ points: this.props.task.points, focused: true });
  };

  handleChange = (event) => {
    this.setState({ points: event.target.value });
  };

  handleBlur = () => {
    const points = this.state.points;
    this.setState({ points: '', focused: false});
    this.props.updatePoints(this.props.task, points != null && points !== '' ? parseInt(points) : null);
  };

  handleClick = event => {
    this.setState({ anchorEl: event.currentTarget });
  };

  handleClose = () => {
    this.setState({ anchorEl: null });
    this.props.removeTask(this.props.task.project_id, this.props.task.id);
  };

  render() {
    const { isDragging, connectDragSource, task } = this.props;
    const { classes, removeTask } = this.props;
    const { anchorEl, focused, points } = this.state;

    let userAvatar = null;

    if (task.assigned_members.length === 1) {
      userAvatar = <Tooltip title={task.assigned_members[0]} placement="right">
          <Avatar className={classes.smallAvatar} src={gravatar.url(task.assigned_members[0])} />
        </Tooltip>;
    } else if (task.assigned_members.length > 1) {
      userAvatar = <Badge badgeContent={task.assigned_members.length} color="primary">
        <Tooltip title={task.assigned_members.join(' ')} placement="right">
          <Avatar className={classes.smallAvatar}>?</Avatar>
        </Tooltip>
      </Badge>;
    }

    return connectDragSource(<div>
        <Card>
          <Menu
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={this.handleClose}
            onMouseDown={(event) => event.stopPropagation()}
          >
            <MenuItem component={Link}
                      to={'/tasks/edit/' + task.project_id + '/' + task.sprint_id + '/' + task.id}>Edit</MenuItem>
            <MenuItem onClick={this.handleClose}>Remove</MenuItem>
          </Menu>
          <CardHeader
            action={
              <IconButton className={classes.option} onMouseDown={(event) => {
                event.stopPropagation();
                this.handleClick(event);
              }}>
                <Icon>more_vert</Icon>
              </IconButton>
            }
            title={<span className={classes.title}>{task.name}</span>}
          >
          </CardHeader>
          <CardContent>
            <Typography>
              {task.description}
            </Typography>
          </CardContent>
          <CardActions className={classes.actions}>
            {userAvatar}
            <TextField value={(focused ? points : task.points) || ''}
                       className={classes.pointInput}
                       onChange={this.handleChange}
                       onFocus={this.handleFocus}
                       onBlur={this.handleBlur}
                       type="number"
                       margin="normal"
            />
          </CardActions>

        </Card>
      </div>
    );
  }
}

export default withStyles(styles)(Task);
