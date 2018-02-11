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
