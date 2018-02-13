export function addSwimlane(project, sprint, swimlane) {
  return {
    type: 'SWIMLANE_ADD_INIT',
    payload: {
      project: project,
      sprint: sprint,
      swimlane: swimlane
    }
  }
}

export function removeSwimlane(project, sprint, id) {
  return {
    type: 'SWIMLANE_REMOVE_INIT',
    payload: {
      project: project,
      sprint: sprint,
      id: id
    }
  }
}

export function editSwimlane(project, sprint, id, data) {
  return {
    type: 'SWIMLANE_EDIT_INIT',
    payload: {
      project: project,
      sprint: sprint,
      id: id,
      data: data
    }
  }
}

export function editSwimlaneDone(data, error) {
  if (error != null) {
    return {
      type: 'SWIMLANE_EDIT_DONE',
      payload: error,
      error: true
    }
  }

  return {
    type: 'SWIMLANE_EDIT_DONE',
    payload: {
      data: data
    }
  }
}

export function getSwimlane(project, sprint, id) {
  return {
    type: 'SWIMLANE_GET_INIT',
    payload: {
      project: project,
      sprint: sprint,
      id: id
    }
  }
}

export function getSwimlaneDone(swimlane, error) {
  if (error != null) {
    return {
      type: 'SWIMLANE_GET_DONE',
      payload: error,
      error: true
    }
  }

  return {
    type: 'SWIMLANE_GET_DONE',
    payload: {
      data: swimlane
    }
  }
}
