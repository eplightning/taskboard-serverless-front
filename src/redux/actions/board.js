import { initializeBoard } from '../../utils/board';

export function loadBoard(project, sprint) {
  return {
    type: 'BOARD_LOAD_INIT',
    payload: {
      project: project,
      sprint: sprint
    }
  }
}

export function loadBoardDone(project, sprint, response) {
  return {
    type: 'BOARD_LOAD_DONE',
    payload: {
      project: project,
      sprint: sprint,
      board: initializeBoard(response)
    }
  }
}

export function moveTask(task, swimlane, state) {
  return {
    type: 'BOARD_MOVE_INIT',
    payload: {
      project: task.project_id,
      task: task.id,
      data: {
        'swimlane_id': swimlane,
        'state': state
      }
    }
  }
}

export function moveTaskDone(task, error) {
  return {
    type: 'BOARD_MOVE_DONE',
    payload: {
      task: task
    }
  }
}

export function updatePoints(task, points) {
  return {
    type: 'BOARD_POINTS_INIT',
    payload: {
      project: task.project_id,
      task: task.id,
      data: {
        points: points
      }
    }
  }
}

export function updatePointsDone(task, error) {
  return {
    type: 'BOARD_POINTS_DONE',
    payload: {
      task: task
    }
  }
}
