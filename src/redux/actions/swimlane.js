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
