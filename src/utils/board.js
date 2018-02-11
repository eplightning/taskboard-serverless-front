function swimlaneTasks(tasks, swimlane) {
  const filtered = [];

  for (const k in tasks) {
    if (tasks.hasOwnProperty(k)) {
      const task = tasks[k];

      if (task.swimlane_id === swimlane.id) {
        filtered.push(task);
      }
    }
  }

  return filtered;
}

function filterByState(tasks, state) {
  return tasks.filter(a => a.state === state);
}

function updateHeaders(headers, state, tasks) {

}

function calculateView(tasks, swimlanes) {
  const headers = {
    'new': 0,
    'in_progress': 0,
    'done': 0,
    'blocked': 0
  };

  const view = swimlanes.map(swimlane => {
    const ourTasks = swimlaneTasks(tasks, swimlane);

    const byState = {};

    for (const state of ['new', 'in_progress', 'done', 'blocked']) {
      byState[state] = filterByState(ourTasks, state);
      updateHeaders(headers, state, ourTasks);
    }

    return {
      swimlane: swimlane,
      tasks: byState
    };
  });

  return {
    headers: headers,
    view: view
  };
}

export function initializeBoard(sprint) {
  const tasks = {};

  for (const v of sprint.tasks) {
    tasks[v.id] = v;
  }

  return {
    tasks: tasks,
    swimlanes: sprint.swimlanes,
    view: calculateView(tasks, sprint.swimlanes)
  };
}

export function updateBoardTask(board, task) {
  const newBoard = { ...board };

  newBoard.tasks = { ...board.tasks, [task.id]: task };
  newBoard.view = calculateView(newBoard.tasks, board.swimlanes);

  return newBoard;
}

