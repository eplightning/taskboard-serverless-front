import React, { Component } from 'react';

import Typography from 'material-ui/Typography';

import ExpansionPanel, {
  ExpansionPanelSummary,
  ExpansionPanelDetails,
} from 'material-ui/ExpansionPanel';

import Card, { CardHeader, CardContent, CardActions } from 'material-ui/Card';
import TextField from 'material-ui/TextField';

import Paper from 'material-ui/Paper';
import IconButton from 'material-ui/IconButton';
import Grid from 'material-ui/Grid';

import Icon from 'material-ui/Icon';
import Avatar from 'material-ui/Avatar';

console.error(ExpansionPanel);
console.error(ExpansionPanelSummary);

export default class Swimlane extends Component {

  render() {
    return (
      <ExpansionPanel>
        <ExpansionPanelSummary expandIcon={<Icon>add_circle</Icon>}>
          <Typography>User Story kurwa magia</Typography>
        </ExpansionPanelSummary>
        <ExpansionPanelDetails>
          <Grid container spacing={8}>
            <Grid item xs={3}>
              <Card onMouseDown={() => console.log('hmm')}>
                <CardContent>
                  <Typography>Opis taska</Typography>
                </CardContent>
                <CardActions>
                  <Avatar>L</Avatar>
                  <IconButton>
                    <Icon>add_circle</Icon>
                  </IconButton>
                  <TextField value={5}
          type="number"
          margin="normal"
        />
                </CardActions>

              </Card>
            </Grid>
            <Grid item xs={3}>
            </Grid>
            <Grid item xs={3}>
            </Grid>
            <Grid item xs={3}>
            </Grid>
          </Grid>
        </ExpansionPanelDetails>
      </ExpansionPanel>
    );
  }
}
