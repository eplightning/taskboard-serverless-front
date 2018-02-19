import React, { Component } from 'react';
import '../styles/Home.scss';
import {
  Avatar,
  Button,
  CircularProgress,
  Grid,
  Icon,
  List,
  ListItem,
  ListItemText,
  Paper,
  Toolbar,
  Typography,
  withStyles
} from 'material-ui';
import Formsy from 'formsy-react';
import TextFormInput from './input/TextFormInput';
import SelectInput from './input/SelectInput';
import AssignedUserInput from './input/AssignedUserInput'
import { DropTarget } from 'react-dnd';
import { NativeTypes } from 'react-dnd-html5-backend';

const styles = theme => ({
  container: {
    display: 'flex',
    flexWrap: 'wrap',
    padding: [[0, '20px']]
  },
  uploadBox: {
    width: '100%',
    textAlign: 'center',
    padding: [['100px', 0]]
  },
  uploadIcon: {
    width: 256,
    height: 256
  },
  uploadBoxOver: {
    width: '100%',
    textAlign: 'center',
    background: '#eee',
    padding: [['100px', 0]]
  },
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    width: 200,
  },
  inputDivFull: {
    width: '100%'
  },
  menu: {
    width: 200,
  },
  toolbar: {
    justifyContent: 'flex-end'
  },
});

const taskTarget = {
  canDrop(props, monitor) {
    return true;
  },

  drop(props, monitor, component) {
    props.uploadAttachment(monitor.getItem().files[0]);
  }
};

@DropTarget(NativeTypes.FILE, taskTarget, (connect, monitor) => ({
  connectDropTarget: connect.dropTarget(),
  isOver: monitor.isOver()
}))
class TaskForm extends Component {

  state = {
    valid: true,
    defaultPoints: ''
  };

  handleValid = () => {
    this.setState({ valid: true });
  };

  handleInvalid = () => {
    this.setState({ valid: false });
  };

  handlePointsBlur = () => {
    const model = this.refs.form.getModel();

    if (model.points === '' || model.points == null) {
      this.setState({ defaultPoints: model.planned_points });
    }
  };

  render() {
    const { classes, submit, formValues, members, attachments, isOver, connectDropTarget, uploading } = this.props;
    const { valid, defaultPoints } = this.state;

    return <React.Fragment>
      <Formsy onValidSubmit={submit} onValid={this.handleValid} onInvalid={this.handleInvalid} ref="form">
        <Toolbar className={classes.toolbar}>
          <Button disabled={!valid} variant="raised" color="primary" type="submit">
            Save
          </Button>
        </Toolbar>
        <div className={classes.container}>
          <SelectInput
            label="State"
            name="state"
            value={formValues.state}>
            <option value="new">New</option>
            <option value="in_progress">In progress</option>
            <option value="done">Done</option>
            <option value="blocked">Blocked</option>
          </SelectInput>
          <TextFormInput
            label="Task title"
            name="name"
            value={formValues.name}
            required
          />
          <TextFormInput
            label="Description"
            name="description"
            value={formValues.description}
            multiline
          />
          <div className={classes.inputDivFull}>
            <TextFormInput
              type="number"
              label="Planned points"
              name="planned_points"
              fullWidth={false}
              value={formValues.planned_points}
              onBlur={this.handlePointsBlur}
            />
          </div>
          <div className={classes.inputDivFull}>
            <TextFormInput
              type="number"
              label="Points"
              name="points"
              fullWidth={false}
              value={defaultPoints || formValues.points}
            />
          </div>
          <AssignedUserInput
            label="Assigned members"
            name="assigned_members"
            options={members}
            value={formValues.assigned_members}
          />
        </div>
      </Formsy>
      {attachments != null &&
      <div className={classes.container}>
        <Typography>
          <h2>Attachments</h2>
        </Typography>
        <Grid container spacing={16}>
          <Grid item xs={12}>
            <Paper>
              <List>
                {attachments.map((attachment) => {
                  const fragments = attachment.split('/');
                  const url = process.env.REACT_APP_UPLOAD_URL + attachment;

                  return <ListItem key={fragments[2]} component="a" href={url}>
                    <Avatar>
                      <Icon>folder</Icon>
                    </Avatar>
                    <ListItemText primary={fragments[3]}/>
                  </ListItem>;
                })}
              </List>
            </Paper>
          </Grid>
          <Grid item xs={12}>
            {uploading || connectDropTarget(
              <div>
                <Paper className={isOver ? classes.uploadBoxOver : classes.uploadBox}>
                  <Icon>backup</Icon>
                </Paper>
              </div>
            )}
            {uploading && (
              <div>
                <Paper className={classes.uploadBox}>
                  <CircularProgress size={50}></CircularProgress>
                </Paper>
              </div>
            )}
          </Grid>
        </Grid>
      </div>
      }
    </React.Fragment>;
  }

}

export default withStyles(styles)(TaskForm);
