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

import { Badge, CardHeader, Menu, MenuItem, Tooltip } from 'material-ui';
import Task from './Task';
import auth from '../../utils/auth';
import SwimlaneColumn from './SwimlaneColumn';

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

  render() {
    const { classes } = this.props;
    const { anchorEl } = this.state;

    return (
      <ExpansionPanel>
        <ExpansionPanelSummary expandIcon={<Icon>add_circle</Icon>}>
          <Typography>User Story kurwa magia</Typography>
        </ExpansionPanelSummary>
        <ExpansionPanelDetails>
          <Grid container spacing={8}>
            <SwimlaneColumn>
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
      </ExpansionPanel>
    );
  }
}

export default withStyles(styles)(Swimlane);
