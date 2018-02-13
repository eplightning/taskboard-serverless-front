import React, { Component } from 'react';

import Typography from 'material-ui/Typography';

import ExpansionPanel, { ExpansionPanelDetails, ExpansionPanelSummary, } from 'material-ui/ExpansionPanel';

import Grid from 'material-ui/Grid';

import Icon from 'material-ui/Icon';

import { Button, Dialog, DialogActions, DialogTitle, Divider, ExpansionPanelActions } from 'material-ui';
import { Link } from 'react-router-dom';

class Swimlane extends Component {

  state = {
    removeDialog: false
  };

  confirmRemoval = () => {
    this.setState({ removeDialog: true });
  };

  handleRemovalClick = (remove) => {
    this.setState({ removeDialog: false });

    if (remove) {
      this.props.removeSwimlane(this.props.swimlane.project_id, this.props.swimlane.sprint_id, this.props.swimlane.id);
    }
  };

  render() {
    const { removeDialog } = this.state;
    const { children, swimlane } = this.props;

    return (
      <React.Fragment>
        <Dialog
          disableBackdropClick
          disableEscapeKeyDown
          maxWidth="xs"
          open={removeDialog}>
          <DialogTitle>Are you sure you want to remove swimlane {swimlane.name}?</DialogTitle>
          <DialogActions>
            <Button onClick={() => this.handleRemovalClick(false)} color="primary">
              Cancel
            </Button>
            <Button onClick={() => this.handleRemovalClick(true)} color="primary">
              Ok
            </Button>
          </DialogActions>
        </Dialog>
        <ExpansionPanel defaultExpanded={true}>
          <ExpansionPanelSummary expandIcon={<Icon>expand_more</Icon>}>
            <Typography>{swimlane.name}</Typography>
          </ExpansionPanelSummary>
          <ExpansionPanelDetails>
            <Grid container spacing={8}>
              {children}
            </Grid>
          </ExpansionPanelDetails>
          <Divider/>
          <ExpansionPanelActions>
            <Button color="inherit" component={Link} to={
              '/swimlanes/edit/' + swimlane.project_id + '/' + swimlane.sprint_id + '/' + swimlane.id
            }>Edit</Button>
            <Button color="inherit" onClick={this.confirmRemoval}>Remove</Button>
            <Button color="primary" component={Link}
                    to={'/tasks/add/' + swimlane.project_id + '/' + swimlane.sprint_id + '/' + swimlane.id}>
              Add new task
            </Button>
          </ExpansionPanelActions>
        </ExpansionPanel>
      </React.Fragment>
    );
  }
}

export default Swimlane;
