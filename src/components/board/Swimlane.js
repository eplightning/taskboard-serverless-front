import React, { Component } from 'react';

import Typography from 'material-ui/Typography';

import ExpansionPanel, { ExpansionPanelDetails, ExpansionPanelSummary, } from 'material-ui/ExpansionPanel';

import { withStyles } from 'material-ui/styles';
import Card, { CardActions, CardContent } from 'material-ui/Card';
import TextField from 'material-ui/TextField';
import IconButton from 'material-ui/IconButton';
import Grid from 'material-ui/Grid';

import Icon from 'material-ui/Icon';
import Avatar from 'material-ui/Avatar';

import {
  Badge, Button, CardHeader, Dialog, DialogActions, DialogTitle, Divider, ExpansionPanelActions, Menu, MenuItem,
  Tooltip
} from 'material-ui';
import Task from './Task';
import auth from '../../utils/auth';
import SwimlaneColumn from './SwimlaneColumn';
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

class Swimlane extends Component {

  state = {
    anchorEl: null,
    removeDialog: false
  };

  componentWillMount() {
    // auth.login();
  }

  handleClick = event => {
    this.setState({ anchorEl: event.currentTarget });
  };

  handleClose = () => {
    this.setState({ anchorEl: null });
  };

  confirmRemoval = () => {
    this.setState({ removeDialog: true });
  };

  handleRemovalClick = (remove) => {
    this.setState({ removeDialog: false });
  };

  render() {
    const { removeDialog } = this.state;
    const { classes } = this.props;
    const { anchorEl } = this.state;

    return (
      <React.Fragment>
        <Dialog
          disableBackdropClick
          disableEscapeKeyDown
          maxWidth="xs"
          open={removeDialog}>
          <DialogTitle>Are you sure you want to remove swimlane X?</DialogTitle>
          <DialogActions>
            <Button onClick={() => this.handleRemovalClick(false)} color="primary">
              Cancel
            </Button>
            <Button onClick={() => this.handleRemovalClick(true)} color="primary">
              Ok
            </Button>
          </DialogActions>
        </Dialog>
        <ExpansionPanel>
          <ExpansionPanelSummary expandIcon={<Icon>expand_more</Icon>}>
            <Typography>User Story kurwa magia</Typography>
          </ExpansionPanelSummary>
          <ExpansionPanelDetails>
            <Grid container spacing={8}>
              <SwimlaneColumn>
                <Task></Task>
                <Task></Task>
              </SwimlaneColumn>
              <SwimlaneColumn>
                <Task></Task>
              </SwimlaneColumn>
              <SwimlaneColumn>
                <Task></Task>
              </SwimlaneColumn>
              <SwimlaneColumn>
                <Task></Task>
              </SwimlaneColumn>
            </Grid>
          </ExpansionPanelDetails>
          <Divider />
          <ExpansionPanelActions>
            <Button dense>Edit</Button>
            <Button dense color="accent" onClick={this.confirmRemoval}>Remove</Button>
            <Button dense color="primary" component={Link} to="/sprints/15/tasks/add/aaaaa-aa-aa">
              Add new task
            </Button>
          </ExpansionPanelActions>
        </ExpansionPanel>
      </React.Fragment>
    );
  }
}

export default withStyles(styles)(Swimlane);
