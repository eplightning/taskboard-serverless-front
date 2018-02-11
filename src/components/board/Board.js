import React, { Component } from 'react';
import BoardHeader from './BoardHeader';
import { Button } from 'material-ui';
import { Link } from 'react-router-dom';

import '../../styles/Board.scss';

export default class Board extends Component {

  render() {
    const { totals, children } = this.props;

    return <React.Fragment>
      <div id="addSwimlane">
        <Button color="primary" aria-label="add" variant="raised" component={Link}
                to={'/swimlanes/add/' + this.props.projectId + '/' + this.props.sprintId}>
          New swimlane
        </Button>
      </div>
      <BoardHeader totals={totals}/>
      {children}
    </React.Fragment>;
  }
}
