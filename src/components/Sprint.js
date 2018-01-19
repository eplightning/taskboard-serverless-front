import React, { Component } from 'react';
import Board from './board/Board';
import RequireAuth from '../containers/RequireAuth';

export default class Sprint extends Component {

  render() {
    return (
      <div>
        <RequireAuth>
          <Board></Board>
        </RequireAuth>
      </div>
    );
  }
}
