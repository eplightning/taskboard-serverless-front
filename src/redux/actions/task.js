export function getMembers(id) {
  return {
    type: 'TASK_MEMBERS_GET_INIT',
    payload: {
      id: id
    }
  }
}

export function getMembersDone(members, error) {
  if (error != null) {
    return {
      type: 'TASK_MEMBERS_GET_DONE',
      payload: error,
      error: true
    }
  }

  return {
    type: 'TASK_MEMBERS_GET_DONE',
    payload: {
      members: members
    }
  }
}

export function addTask(project, task) {
  return {
    type: 'TASK_ADD_INIT',
    payload: {
      project: project,
      task: task
    }
  }
}

export function removeTask(project, id) {
  return {
    type: 'TASK_REMOVE_INIT',
    payload: {
      project: project,
      id: id
    }
  }
}

export function removeTaskDone(id) {
  return {
    type: 'TASK_REMOVE_DONE',
    payload: {
      id: id
    }
  }
}
