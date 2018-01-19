import React, { Component } from 'react';
import Typography from 'material-ui/Typography';
import {
  AppBar, Avatar, Divider, Drawer, Icon, IconButton, List, ListItem, ListItemIcon, ListItemText, ListSubheader, Menu,
  MenuItem,
  Toolbar,
  withStyles
} from 'material-ui';
import { Link } from 'react-router-dom';

const styles = {
  root: {
    width: '100%',
  },
  appBar: {
    position: 'sticky',
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
    auth: true,
    anchorEl: null,
    test: false
  };

  handleChange = (event, checked) => {
    this.setState({ auth: checked });
  };

  handleMenu = event => {
    this.setState({ anchorEl: event.currentTarget });
  };

  handle = val => {
    this.setState({test: val});
  };

  handleClose = () => {
    this.setState({ anchorEl: null });
  };

  render() {
    const { classes, title } = this.props;
    const { auth, anchorEl, test } = this.state;
    const open = Boolean(anchorEl);

    const sideList = (
      <div className={classes.list}>
        <List subheader={<ListSubheader>Navigation</ListSubheader>}>
          <ListItem button component={Link} to="/">
            <ListItemIcon>
              <Icon>home</Icon>
            </ListItemIcon>
            <ListItemText primary="Homepage" />
          </ListItem>
          <ListItem button>
            <ListItemIcon>
              <Icon>folder</Icon>
            </ListItemIcon>
            <ListItemText primary="Projects view" />
          </ListItem>
        </List>
        <Divider />
        <List subheader={<ListSubheader>Projects</ListSubheader>}>
          <ListItem button>
            <ListItemIcon>
              <Avatar>e</Avatar>
            </ListItemIcon>
            <ListItemText primary="eLF Konfigurator" />
          </ListItem>
          <ListItem button>
            <ListItemIcon>
              <Avatar>O</Avatar>
            </ListItemIcon>
            <ListItemText primary="Other project" />
          </ListItem>
          <ListItem button>
            <ListItemIcon>
              <Avatar>P</Avatar>
            </ListItemIcon>
            <ListItemText primary="Project 2" />
          </ListItem>
        </List>
        <Divider />
        <List subheader={<ListSubheader>Sprints</ListSubheader>}>
          <ListItem button>
            <ListItemText primary="Sprint 15" />
          </ListItem>
          <ListItem button>
            <ListItemText primary="Sprint 14" />
          </ListItem>
          <ListItem button>
            <ListItemText primary="Sprint 13" />
          </ListItem>
        </List>
      </div>
    );

    return <AppBar className={classes.appBar}>
      <Toolbar>
        <Drawer open={test} onClose={() => this.handle(false)}>
          <div
            tabIndex={0}
            role="button"
            onClick={() => this.handle(false)}
            onKeyDown={() => this.handle(false)}
          >
            {sideList}
          </div>
        </Drawer>
        <IconButton className={classes.menuButton} color="contrast" aria-label="Menu" onClick={() => this.handle(true)}>
          <Icon>menu</Icon>
        </IconButton>
        <Typography type="title" color="inherit" className={classes.flex}>
          {title || 'Task Board'}
        </Typography>
        {auth && (
          <div>
            <IconButton
              aria-owns={open ? 'menu-appbar' : null}
              aria-haspopup="true"
              onClick={this.handleMenu}
              color="contrast"
            >
              <Avatar>L</Avatar>
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorEl}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={open}
              onClose={this.handleClose}
            >
              <MenuItem onClick={this.handleClose}>Logout</MenuItem>
            </Menu>
          </div>
        )}
      </Toolbar>
    </AppBar>;
  }
}


export default withStyles(styles)(Header);
