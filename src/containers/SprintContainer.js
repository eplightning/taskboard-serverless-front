import React, { Component } from 'react';
import Board from '../components/board/Board';
import { loadBoard } from '../redux/actions/board';
import Loader from '../components/Loader';
import Swimlane from '../components/board/Swimlane';
import SwimlaneColumn from '../components/board/SwimlaneColumn';
import Task from '../components/board/Task';
import { connect } from 'react-redux';

class SprintContainer extends Component {

  constructor(props) {
    super(props);

    this.props.loadBoard(props.match.params.project, props.match.params.sprint);
  }

  render() {
    const { match, loaded, board, ...other } = this.props;

    if (!loaded) {
      return <Loader/>;
    }

    const swimlanes = board.view.map(swimlaneWithTasks => {
      const tasks = (
        <React.Fragment>
          <SwimlaneColumn>
            <Task></Task>
            <Task></Task>
          </SwimlaneColumn>
          <SwimlaneColumn>
            <Task>
            </Task>
          </SwimlaneColumn>
          <SwimlaneColumn>
            <Task></Task>
          </SwimlaneColumn>
          <SwimlaneColumn>
            <Task></Task>
          </SwimlaneColumn>
        </React.Fragment>
      );

      return <Swimlane key={swimlaneWithTasks.swimlane.id} swimlane={swimlaneWithTasks.swimlane}>{tasks}</Swimlane>
    });

    return <Board projectId={match.params.project} sprintId={match.params.sprint} totals={board.headers}>
      {swimlanes}
    </Board>;
  }

}

export default connect((state) => ({
  board: state.sprint.board.view,
  loaded: state.sprint.loaded
}), { loadBoard })(SprintContainer);
