import React, { Component } from 'react';
import {
  Avatar,
  Button,
  Card, Dialog, DialogActions, DialogTitle,
  Grid,
  Icon,
  IconButton,
  List,
  ListItem,
  ListItemIcon,
  ListItemSecondaryAction,
  ListItemText,
  ListSubheader,
  Menu,
  MenuItem,
  Toolbar,
  withStyles
} from 'material-ui';
import { Link } from 'react-router-dom';

const styles = theme => ({
  toolbar: {
    justifyContent: 'flex-end'
  },
  selected: {
    backgroundColor: theme.palette.primary.main,
    '& $primary h3, & $icon': {
      color: theme.palette.common.white,
    },
    '&:hover': {
      backgroundColor: theme.palette.primary.main,
    }
  },
  primary: {},
  icon: {}
});

class ProjectsView extends Component {

  state = {
    anchorEl: null,
    menuProject: null,
    menuSprint: null,
    dialogOpen: false
  };

  handleClick = (id, sprint) => event => {
    this.setState({ anchorEl: event.currentTarget, menuProject: id, menuSprint: sprint });
  };

  handleRemove = event => {
    this.setState({ anchorEl: null, dialogOpen: true });
  };

  handleRemoveConfirm = event => {
    this.setState({ dialogOpen: false });

    if (this.state.menuSprint) {
      this.props.removeSprint(this.state.menuProject, this.state.menuSprint);
    } else {
      this.props.removeProject(this.state.menuProject);
    }
  };

  handleRemoveCancel = event => {
    this.setState({ dialogOpen: false });
  };

  handleClose = () => {
    this.setState({ anchorEl: null });
  };

  render() {
    const { anchorEl, menuProject, menuSprint, dialogOpen } = this.state;
    const { classes, activeProject, projects, sprints } = this.props;

    const projectsList = projects.map(a =>
      <ListItem button className={activeProject === a.id ? classes.selected : null} component={Link} to={'/projects/view/' + a.id}>
        <ListItemIcon className={classes.icon}>
          <Avatar>{a.name.charAt(0)}</Avatar>
        </ListItemIcon>
        <ListItemText primary={a.name} className={classes.primary} />
        <ListItemSecondaryAction className={activeProject === a.id ? classes.selected : null}>
          <IconButton aria-label="Edit" onClick={this.handleClick(a.id)} className={classes.icon}>
            <Icon>more_vert</Icon>
          </IconButton>
        </ListItemSecondaryAction>
      </ListItem>
    );

    const sprintsList = sprints.map(a =>
      <ListItem button component={Link} to={'/sprints/board/' + activeProject + '/' + a.id}>
        <ListItemText primary={a.name} secondary={a.start_date + ' - ' + a.end_date}/>
        <ListItemSecondaryAction>
          <IconButton aria-label="Edit" onClick={this.handleClick(activeProject, a.id)}>
            <Icon>more_vert</Icon>
          </IconButton>
        </ListItemSecondaryAction>
      </ListItem>
    );

    return (
      <React.Fragment>
        <Dialog
          disableBackdropClick
          disableEscapeKeyDown
          maxWidth="xs"
          open={dialogOpen}>
          <DialogTitle>Are you sure you want to remove this item?</DialogTitle>
          <DialogActions>
            <Button onClick={this.handleRemoveCancel} color="primary">
              Cancel
            </Button>
            <Button onClick={this.handleRemoveConfirm} color="primary">
              Ok
            </Button>
          </DialogActions>
        </Dialog>
        <Menu
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={this.handleClose}
          onMouseDown={(event) => event.stopPropagation()}
        >
          <MenuItem component={Link}
                    to={menuSprint
                      ? '/sprints/edit/' + menuProject + '/' + menuSprint
                      : '/projects/edit/' + menuProject}>
            Edit
          </MenuItem>
          <MenuItem onClick={this.handleRemove}>Remove</MenuItem>
        </Menu>
        <Grid container spacing={8}>
          <Grid item sm={activeProject ? 6 : 12}>
            <Card>
              <Toolbar className={classes.toolbar}>
                <Button variant="raised" color="primary" component={Link} to="/projects/add">
                  Add project
                </Button>
              </Toolbar>
              <List subheader={<ListSubheader>Projects</ListSubheader>}>
                {projectsList}
              </List>
            </Card>
          </Grid>
          {activeProject &&
          <Grid item sm={6}>
            <Card>
              <Toolbar className={classes.toolbar}>
                <Button variant="raised" color="primary" component={Link} to="/sprints/add">
                  Add sprint
                </Button>
              </Toolbar>
              <List subheader={<ListSubheader>Sprints</ListSubheader>}>
                {sprintsList}
              </List>
            </Card>
          </Grid>}
        </Grid>
      </React.Fragment>
    );
  }
}

export default withStyles(styles)(ProjectsView);
