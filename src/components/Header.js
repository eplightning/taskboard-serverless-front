import React, { Component } from 'react';
import Typography from 'material-ui/Typography';
import {
  AppBar,
  Avatar,
  Divider,
  Drawer,
  Icon,
  IconButton,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  ListSubheader,
  Menu,
  MenuItem,
  Toolbar,
  withStyles
} from 'material-ui';
import { Link } from 'react-router-dom';
import gravatar from 'gravatar';

const styles = {
  root: {
    width: '100%',
  },
  appBar: {
    top: 0,
    zIndex: 100,
  },
  flex: {
    flex: 1,
  },
  menuButton: {
    marginLeft: -12,
    marginRight: 20,
  },
  list: {
    width: 250,
  },
};

class Header extends Component {

  state = {
    anchorEl: null,
    drawerOpen: false
  };

  handleMenu = event => {
    this.setState({ anchorEl: event.currentTarget });
  };

  logout = () => {
    this.setState({ anchorEl: null });
    this.props.userLogout();
  };

  handleDrawerOpen = () => {
    this.setState({ drawerOpen: true });
  };

  handlerDrawerClose = () => {
    this.setState({ drawerOpen: false });
  };

  handleClose = () => {
    this.setState({ anchorEl: null });
  };

  render() {
    const { classes, title, signedIn, email, projects, sprints } = this.props;
    const { anchorEl, drawerOpen } = this.state;
    const menuOpen = !!anchorEl;

    const projectsList = projects.slice(0, 3).map(a =>
      <ListItem button component={Link} to={'/projects/view/' + a.id} key={a.id}>
        <ListItemIcon>
          <Avatar>{a.name.charAt(0)}</Avatar>
        </ListItemIcon>
        <ListItemText primary={a.name} />
      </ListItem>
    );

    const sprintsList = sprints.slice(0, 3).map(a =>
      <ListItem button component={Link} to={'/sprints/board/' + a.project_id + '/' + a.id} key={a.id}>
        <ListItemText primary={a.name} />
      </ListItem>
    );

    const sideList = (
      <div className={classes.list} onClick={this.handlerDrawerClose}>
        <List subheader={<ListSubheader>Navigation</ListSubheader>}>
          <ListItem button component={Link} to="/">
            <ListItemIcon>
              <Icon>home</Icon>
            </ListItemIcon>
            <ListItemText primary="Homepage"/>
          </ListItem>
          {signedIn && <ListItem button component={Link} to="/projects">
            <ListItemIcon>
              <Icon>folder</Icon>
            </ListItemIcon>
            <ListItemText primary="Projects view"/>
          </ListItem>}
        </List>
        <Divider/>
        {signedIn && <React.Fragment>
        <List subheader={<ListSubheader>Projects</ListSubheader>}>
          {projectsList}
        </List>
        <Divider/>
        <List subheader={<ListSubheader>Sprints</ListSubheader>}>
          {sprintsList}
        </List></React.Fragment>}
      </div>
    );

    return <AppBar className={classes.appBar} position="sticky">
      <Toolbar>
        <Drawer open={drawerOpen} onClose={this.handlerDrawerClose}>
          <div
            tabIndex={0}
            role="button"
            onClick={() => this.handleDrawerOpen}
            onKeyDown={() => this.handleDrawerOpen}
          >
            {sideList}
          </div>
        </Drawer>
        <IconButton className={classes.menuButton} color="inherit" aria-label="Menu" onClick={this.handleDrawerOpen}>
          <Icon>menu</Icon>
        </IconButton>
        <Typography variant="title" color="inherit" className={classes.flex}>
          {title || 'Task Board'}
        </Typography>
        {signedIn && (
          <div>
            <IconButton
              aria-owns={menuOpen ? 'menu-appbar' : null}
              aria-haspopup="true"
              onClick={this.handleMenu}
              color="inherit"
            >
              <Avatar src={gravatar.url(email)}></Avatar>
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorEl}
              open={menuOpen}
              onClose={this.handleClose}
            >
              <MenuItem onClick={this.logout}>Logout</MenuItem>
            </Menu>
          </div>
        )}
      </Toolbar>
    </AppBar>;
  }
}

export default withStyles(styles)(Header);
