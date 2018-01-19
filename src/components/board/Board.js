import React, {Component} from 'react';

import Swimlane from './Swimlane';
import BoardHeader from './BoardHeader';
import { Button, Icon } from 'material-ui';

import '../../styles/Board.scss';

export default class Board extends Component {

  render() {
    return <React.Fragment>
      <div id="addSwimlane">
        <Button color="primary" aria-label="add" raised>
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
