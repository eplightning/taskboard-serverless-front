export function addProject(project) {
  return {
    type: 'PROJECT_ADD_INIT',
    payload: {
      project: project
    }
  }
}

export function addProjectDone(project, error) {
  if (error != null) {
    return {
      type: 'PROJECT_ADD_DONE',
      payload: error,
      error: true
    }
  }

  return {
    type: 'PROJECT_ADD_DONE',
    payload: {
      project: project
    }
  }
}

export function editProject(id, data) {
  return {
    type: 'PROJECT_EDIT_INIT',
    payload: {
      id: id,
      data: data
    }
  }
}

export function editProjectDone(data, error) {
  if (error != null) {
    return {
      type: 'PROJECT_EDIT_DONE',
      payload: error,
      error: true
    }
  }

  return {
    type: 'PROJECT_EDIT_DONE',
    payload: {
      data: data
    }
  }
}

export function getProject(id) {
  return {
    type: 'PROJECT_GET_INIT',
    payload: {
      id: id
    }
  }
}

export function getProjectDone(project, error) {
  if (error != null) {
    return {
      type: 'PROJECT_GET_DONE',
      payload: error,
      error: true
    }
  }

  return {
    type: 'PROJECT_GET_DONE',
    payload: {
      data: project
    }
  }
}

export function loadProjects() {
  return {
    type: 'PROJECT_LOAD_INIT'
  }
}

export function loadProjectsDone(projects, error) {
  if (error != null) {
    return {
      type: 'PROJECT_LOAD_DONE',
      payload: error,
      error: true
    }
  }

  return {
    type: 'PROJECT_LOAD_DONE',
    payload: {
      projects: projects
    }
  }
}

export function loadSprints(project) {
  return {
    type: 'SPRINT_LOAD_INIT',
    payload: {
      project: project
    }
  }
}

export function loadSprintsDone(sprints, error) {
  if (error != null) {
    return {
      type: 'SPRINT_LOAD_DONE',
      payload: error,
      error: true
    }
  }

  return {
    type: 'SPRINT_LOAD_DONE',
    payload: {
      sprints: sprints
    }
  }
}

export function removeProject(id) {
  return {
    type: 'PROJECT_REMOVE_INIT',
    payload: {
      id: id
    }
  }
}

export function removeSprint(project, id) {
  return {
    type: 'SPRINT_REMOVE_INIT',
    payload: {
      project: project,
      id: id
    }
  }
}
