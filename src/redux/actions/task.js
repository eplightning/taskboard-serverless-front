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

export function editTask(project, id, data) {
  return {
    type: 'TASK_EDIT_INIT',
    payload: {
      project: project,
      id: id,
      data: data
    }
  }
}

export function editTaskDone(data, error) {
  if (error != null) {
    return {
      type: 'TASK_EDIT_DONE',
      payload: error,
      error: true
    }
  }

  return {
    type: 'TASK_EDIT_DONE',
    payload: {
      data: data
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

export function getTask(project, id) {
  return {
    type: 'TASK_GET_INIT',
    payload: {
      project: project,
      id: id
    }
  }
}

export function getTaskDone(task, error) {
  if (error != null) {
    return {
      type: 'TASK_GET_DONE',
      payload: error,
      error: true
    }
  }

  return {
    type: 'TASK_GET_DONE',
    payload: {
      data: task
    }
  }
}
