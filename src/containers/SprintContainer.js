import React, { Component } from 'react';
import Board from '../components/board/Board';
import { loadBoard, moveTask, updatePoints } from '../redux/actions/board';
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

  makeTasks(tasks) {
    return tasks.map(task =>
      <Task task={task} key={task.id} moveTask={this.props.moveTask} updatePoints={this.props.updatePoints} />
    );
  }

  render() {
    const { match, loaded, board, moveTask, ...other } = this.props;

    if (!loaded) {
      return <Loader/>;
    }

    const swimlanes = board.view.map(swimlaneWithTasks => {
      const tasks = (
        <React.Fragment>
          <SwimlaneColumn swimlane={swimlaneWithTasks.swimlane.id} state="new">
            {this.makeTasks(swimlaneWithTasks.tasks['new'])}
          </SwimlaneColumn>
          <SwimlaneColumn swimlane={swimlaneWithTasks.swimlane.id} state="in_progress">
            {this.makeTasks(swimlaneWithTasks.tasks['in_progress'])}
          </SwimlaneColumn>
          <SwimlaneColumn swimlane={swimlaneWithTasks.swimlane.id} state="done">
            {this.makeTasks(swimlaneWithTasks.tasks['done'])}
          </SwimlaneColumn>
          <SwimlaneColumn swimlane={swimlaneWithTasks.swimlane.id} state="blocked">
            {this.makeTasks(swimlaneWithTasks.tasks['blocked'])}
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
}), { loadBoard, moveTask, updatePoints })(SprintContainer);
