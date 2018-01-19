import React, {Component} from 'react';

import Swimlane from './Swimlane';
import BoardHeader from './BoardHeader';


export default class Board extends Component {

  render() {
    return <div>
      <BoardHeader/>
      <Swimlane></Swimlane>
      <Swimlane></Swimlane>
      <Swimlane></Swimlane>
    </div>;
  }
}
