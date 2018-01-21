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
      name: props.name,
    }
  },

  canDrag(props) {
    console.log('canDrag');
    return true;
  },

  endDrag(props, monitor) {
    const item = monitor.getItem();
    const dropResult = monitor.getDropResult();

    if (dropResult) {
      alert(`You dropped ${item.name} into ${dropResult.name}!`) // eslint-disable-line no-alert
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
  };

  handleClick = event => {
    this.setState({ anchorEl: event.currentTarget });
  };

  handleClose = () => {
    this.setState({ anchorEl: null });
  };

  render() {
    const { isDragging, connectDragSource } = this.props;
    const { classes } = this.props;
    const { anchorEl } = this.state;

    return connectDragSource(<div>
        <Card onMouseDown={() => console.log('hmm')}>
          <Menu
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={this.handleClose}
            onMouseDown={(event) => event.stopPropagation()}
          >
            <MenuItem component={Link} to="/sprints/15/tasks/edit/a">Edit</MenuItem>
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
            title={<span className={classes.title}>Jakiś tytuł kartki bo gdzieś trzeba to wprowadzić co nie troche dłuższy też można</span>}
          >
          </CardHeader>
          <CardContent>
            <Typography>
              Opis kartki Opis kartki Opis kartki Opis kartki Opis kartki Opis kartki Opis kartki
            </Typography>
          </CardContent>
          <CardActions className={classes.actions}>
            <Badge badgeContent={1} color="primary">
              <Tooltip title="Bartosz Sławianowski" placement="right">
                <Avatar className={classes.smallAvatar}>G</Avatar>
              </Tooltip>
            </Badge>
            <TextField value={5}
                       className={classes.pointInput}
                       type="number"
                       margin="normal"
                       onFocus={() => console.log('focus')}
                       onBlur={() => console.log('blur')}
                       onMouseDown={($event) => {
                         console.log('CLICK');
                         console.log('hmm2')
                       }}

            />
          </CardActions>

        </Card>
      </div>
    );
  }
}

export default withStyles(styles)(Task);
