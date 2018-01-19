import React, { Component } from 'react';
import {
  Avatar,
  Button,
  Card,
  Grid,
  Icon,
  IconButton,
  List,
  ListItem,
  ListItemIcon,
  ListItemSecondaryAction,
  ListItemText,
  ListSubheader, Menu, MenuItem,
  Toolbar,
  withStyles
} from 'material-ui';
import { Link } from 'react-router-dom';

const styles = theme => ({
  toolbar: {
    justifyContent: 'flex-end'
  }
});

class ProjectsView extends Component {

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
    const { anchorEl } = this.state;
    const { classes } = this.props;

    return (
      <React.Fragment>
        <Menu
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={this.handleClose}
          onMouseDown={(event) => event.stopPropagation()}
        >
          <MenuItem onClick={this.handleClose}>Edit</MenuItem>
          <MenuItem onClick={this.handleClose}>Remove</MenuItem>
        </Menu>
        <Grid container spacing={8}>
          <Grid item sm={6}>
            <Card>
              <Toolbar className={classes.toolbar}>
                <Button raised color="primary">
                  Add project
                </Button>
              </Toolbar>
              <List subheader={<ListSubheader>Projects</ListSubheader>}>
                <ListItem button component={Link} to="/">
                  <ListItemIcon>
                    <Avatar>e</Avatar>
                  </ListItemIcon>
                  <ListItemText primary="Homepage"/>
                  <ListItemSecondaryAction>
                    <IconButton aria-label="Edit" onClick={this.handleClick}>
                      <Icon>more_vert</Icon>
                    </IconButton>
                  </ListItemSecondaryAction>
                </ListItem>
                <ListItem button component={Link} to="/">
                  <ListItemIcon>
                    <Avatar>T</Avatar>
                  </ListItemIcon>
                  <ListItemText primary="Homepage"/>
                  <ListItemSecondaryAction>
                    <IconButton aria-label="Edit" onClick={this.handleClick}>
                      <Icon>more_vert</Icon>
                    </IconButton>
                  </ListItemSecondaryAction>
                </ListItem>
              </List>
            </Card>
          </Grid>
          <Grid item sm={6}>
            <Card>
              <Toolbar className={classes.toolbar}>
                <Button raised color="primary">
                  Add sprint
                </Button>
              </Toolbar>
              <List subheader={<ListSubheader>Sprints</ListSubheader>}>
                <ListItem button component={Link} to="/sprint/15">
                  <ListItemText primary="Sprint 16" secondary="01.01.2010 - 15.01.2010" />
                  <ListItemSecondaryAction>
                    <IconButton aria-label="Edit" onClick={this.handleClick}>
                      <Icon>more_vert</Icon>
                    </IconButton>
                  </ListItemSecondaryAction>
                </ListItem>
                <ListItem button component={Link} to="/sprint/15">
                  <ListItemText primary="Sprint 15" secondary="01.01.2010 - 15.01.2010" />
                  <ListItemSecondaryAction>
                    <IconButton aria-label="Edit" onClick={this.handleClick}>
                      <Icon>more_vert</Icon>
                    </IconButton>
                  </ListItemSecondaryAction>
                </ListItem>
              </List>
            </Card>
          </Grid>
        </Grid>
      </React.Fragment>
    );
  }
}

export default withStyles(styles)(ProjectsView);
