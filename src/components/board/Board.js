import React, {Component} from 'react';

import Swimlane from './Swimlane';
import BoardHeader from './BoardHeader';
import { Button, Icon } from 'material-ui';
import { Link } from 'react-router-dom';

import '../../styles/Board.scss';

export default class Board extends Component {

  render() {
    return <React.Fragment>
      <div id="addSwimlane">
        <Button color="primary" aria-label="add" raised component={Link} to="/sprints/15/swimlanes/add">
          New swimlane
        </Button>
      </div>
      <BoardHeader/>
      <Swimlane></Swimlane>
      <Swimlane></Swimlane>
      <Swimlane></Swimlane>
    </React.Fragment>;
  }
}
