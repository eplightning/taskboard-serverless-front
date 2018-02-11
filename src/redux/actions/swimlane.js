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
