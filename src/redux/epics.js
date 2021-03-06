import { LOCATION_CHANGE, push } from 'react-router-redux';

import auth from '../utils/auth';
import { userSessionSet } from './actions/user';

import { Observable } from 'rxjs';
import api from '../utils/api';
import {
  editProjectDone,
  editSprintDone,
  getProjectDone,
  getSprintDone,
  loadProjects,
  loadProjectsDone,
  loadSprintsDone
} from './actions/project';
import { loadBoardDone, moveTaskDone, updatePointsDone, loadBoard } from './actions/board';
import { getMembersDone, getTask, removeTaskDone, getTaskDone, editTaskDone, uploadAttachmentDone } from './actions/task';
import { getSwimlaneDone, editSwimlaneDone } from './actions/swimlane';

const loadProjectsEpic = (action$, store) => {
  return action$
    .ofType('PROJECT_LOAD_INIT')
    .switchMap(() => api.get('projects'))
    .map(projects => loadProjectsDone(projects))
    .catch((err) => Observable.of(loadProjectsDone(null, err)));
};

const loadSprintsEpic = (action$, store) => {
  return action$
    .ofType('SPRINT_LOAD_INIT')
    .switchMap((a) => api.get('projects/' + a.payload.project + '/sprints'))
    .map(sprints => loadSprintsDone(sprints))
    .catch((err) => Observable.of(loadSprintsDone(null, err)));
};

const addProjectEpic = (action$, store) => {
  return action$
    .ofType('PROJECT_ADD_INIT')
    .switchMap((a) => api.post('projects', a.payload.project))
    .map(project => push('/projects/view/' + project.id))
    .catch((err) => Observable.empty())
};

const getProjectEpic = (action$, store) => {
  return action$
    .ofType('PROJECT_GET_INIT')
    .switchMap((a) => api.get('projects/' + a.payload.id))
    .map(response => getProjectDone(response))
    .catch((err) => Observable.of(getProjectDone(null, err)));
};

const editProjectEpic = (action$, store) => {
  return action$
    .ofType('PROJECT_EDIT_INIT')
    .switchMap((a) => api.put('projects/' + a.payload.id, a.payload.data))
    .switchMap(project => Observable.of(push('/projects/view/' + project.id), editProjectDone(project)))
    .catch((err) => Observable.of(editProjectDone(null, err)));
};

const removeProjectEpic = (action$, store) => {
  return action$
    .ofType('PROJECT_REMOVE_INIT')
    .switchMap((a) => api.delete('projects/' + a.payload.id))
    .switchMap(project => Observable.of(push('/projects'), loadProjects()))
    .catch((err) => Observable.empty());
};

const addSprintEpic = (action$, store) => {
  return action$
    .ofType('SPRINT_ADD_INIT')
    .switchMap((a) => api.post('projects/' + a.payload.project + '/sprints', a.payload.sprint))
    .map(sprint => push('/projects/view/' + sprint.project_id))
    .catch((err) => Observable.empty())
};

const getSprintEpic = (action$, store) => {
  return action$
    .ofType('SPRINT_GET_INIT')
    .switchMap((a) => api.get('projects/' + a.payload.project + '/sprints/' + a.payload.id))
    .map(response => getSprintDone(response))
    .catch((err) => Observable.of(getSprintDone(null, err)));
};

const editSprintEpic = (action$, store) => {
  return action$
    .ofType('SPRINT_EDIT_INIT')
    .switchMap((a) => api.put('projects/' + a.payload.project + '/sprints/' + a.payload.id, a.payload.data))
    .switchMap(sprint => Observable.of(push('/projects/view/' + sprint.project_id), editSprintDone(sprint)))
    .catch((err) => Observable.of(editSprintDone(null, err)));
};

const removeSprintEpic = (action$, store) => {
  return action$
    .ofType('SPRINT_REMOVE_INIT')
    .switchMap((a) => api.delete('projects/' + a.payload.project + '/sprints/' + a.payload.id))
    .switchMap(sprint => Observable.of(push('/projects')))
    .catch((err) => Observable.empty());
};

const addSwimlaneEpic = (action$, store) => {
  return action$
    .ofType('SWIMLANE_ADD_INIT')
    .switchMap((a) => api.post('projects/' + a.payload.project + '/sprints/' + a.payload.sprint + '/swimlanes', a.payload.swimlane))
    .map(sl => push('/sprints/board/' + sl.project_id + '/' + sl.sprint_id))
    .catch((err) => Observable.empty())
};

const loadBoardEpic = (action$, store) => {
  return action$
    .ofType('BOARD_LOAD_INIT')
    .switchMap((a) => api.get('projects/' + a.payload.project + '/sprints/' + a.payload.sprint + '/board'))
    .map(response => loadBoardDone(response.project_id, response.id, response))
    .catch((err) => Observable.empty());
};

const moveBoardEpic = (action$, store) => {
  return action$
    .ofType('BOARD_MOVE_INIT')
    .switchMap((a) => api.put('projects/' + a.payload.project + '/tasks/' + a.payload.task + '/position', a.payload.data))
    .map(response => moveTaskDone(response))
    .catch((err) => Observable.empty());
};

const pointsBoardEpic = (action$, store) => {
  return action$
    .ofType('BOARD_POINTS_INIT')
    .switchMap((a) => api.put('projects/' + a.payload.project + '/tasks/' + a.payload.task + '/points', a.payload.data))
    .map(response => updatePointsDone(response))
    .catch((err) => Observable.empty());
};

const getMembersEpic = (action$, store) => {
  return action$
    .ofType('TASK_MEMBERS_GET_INIT')
    .switchMap((a) => api.get('projects/' + a.payload.id))
    .map(response => getMembersDone([...response.members, response.owner]))
    .catch((err) => Observable.of(getMembersDone(null, err)));
};

const addTaskEpic = (action$, store) => {
  return action$
    .ofType('TASK_ADD_INIT')
    .switchMap((a) => api.post('projects/' + a.payload.project + '/tasks', a.payload.task))
    .map(sl => push('/sprints/board/' + sl.project_id + '/' + sl.sprint_id))
    .catch((err) => Observable.empty())
};

const removeTaskEpic = (action$, store) => {
  return action$
    .ofType('TASK_REMOVE_INIT')
    .switchMap((a) => api.delete('projects/' + a.payload.project + '/tasks/' + a.payload.id).mapTo(a.payload.id))
    .map((task) => removeTaskDone(task))
    .catch((err) => Observable.empty());
};

const removeSwimlaneEpic = (action$, store) => {
  return action$
    .ofType('SWIMLANE_REMOVE_INIT')
    .switchMap((a) =>
      api.delete('projects/' + a.payload.project +
                 '/sprints/' + a.payload.sprint +
                 '/swimlanes/' + a.payload.id)
         .mapTo(a.payload)
    )
    .map((payload) => loadBoard(payload.project, payload.sprint))
    .catch((err) => Observable.empty());
};

const getTaskEpic = (action$, store) => {
  return action$
    .ofType('TASK_GET_INIT')
    .switchMap((a) => api.get('projects/' + a.payload.project + '/tasks/' + a.payload.id))
    .map(response => getTaskDone(response))
    .catch((err) => Observable.of(getTaskDone(null, err)));
};

const editTaskEpic = (action$, store) => {
  return action$
    .ofType('TASK_EDIT_INIT')
    .switchMap((a) => api.put('projects/' + a.payload.project + '/tasks/' + a.payload.id, a.payload.data))
    .switchMap(task => Observable.of(
      push('/sprints/board/' + task.project_id + '/' + task.sprint_id), editTaskDone(task)
    ))
    .catch((err) => Observable.of(editTaskDone(null, err)));
};

const getSwimlaneEpic = (action$, store) => {
  return action$
    .ofType('SWIMLANE_GET_INIT')
    .switchMap((a) =>
      api.get('projects/' + a.payload.project +
              '/sprints/' + a.payload.sprint +
              '/swimlanes/' + a.payload.id)
    )
    .map(response => getSwimlaneDone(response))
    .catch((err) => Observable.of(getSwimlaneDone(null, err)));
};

const editSwimlaneEpic = (action$, store) => {
  return action$
    .ofType('SWIMLANE_EDIT_INIT')
    .switchMap((a) =>
      api.put('projects/' + a.payload.project +
      '/sprints/' + a.payload.sprint +
      '/swimlanes/' + a.payload.id, a.payload.data)
    )
    .switchMap(swimlane => Observable.of(
      push('/sprints/board/' + swimlane.project_id + '/' + swimlane.sprint_id), editSwimlaneDone(swimlane)
    ))
    .catch((err) => Observable.of(editSwimlaneDone(null, err)));
};

const uploadAttachmentEpic = (action$, store) => {
  return action$
    .ofType('ATTACHMENT_UPLOAD_INIT')
    .switchMap((a) => {
      let url = 'projects/' + a.payload.project + '/tasks/' + a.payload.task + '/upload';
      url += '?filename=' + encodeURIComponent(a.payload.file.name);

      return api.get(url)
        .map((response) => {
          return { ...response, ...a.payload };
        });
    })
    .switchMap((data) => {
      const body = new FormData();

      for (const k in data.fields) {
        if (data.fields.hasOwnProperty(k)) {
          const v = data.fields[k];

          body.set(k, v);
        }
      }

      body.set('file', data.file);

      return Observable.ajax({
        url: data.url,
        method: 'POST',
        crossDomain: true,
        body: body
      }).mapTo({ project: data.project, task: data.task });
    })
    .delay(2000)
    .map((a) => uploadAttachmentDone(a.project, a.task))
    .catch((err) => {
      console.error(err);
      return Observable.empty()
    });
}

const uploadAttachmentDoneEpic = (action$, store) => {
  return action$
    .ofType('ATTACHMENT_UPLOAD_DONE')
    .map((a) => getTask(a.payload.project, a.payload.task));
}

const authCallbackEpic = (action$, store) => {
  return action$
    .filter(a =>
      a.type === LOCATION_CHANGE && a.payload.pathname === '/auth_callback'
      && /access_token|id_token|error/.test(a.payload.hash)
    )
    .mergeMap(() => {
      return auth.handleAuthentication();
    })
    .switchMap((a) => Observable.of(userSessionSet(a, true), push('/')))
    .catch(() => Observable.of(push('/')));
};

const authTokenRefreshEpic = (action$, store) => {
  return action$
    .filter(a => a.type === 'USER_SESSION_SET_CALLBACK' || a.type === 'USER_SESSION_SET_REFRESH' || a.type === 'USER_LOGOUT')
    .switchMap(a => {
      if (a.type === 'USER_LOGOUT') {
        auth.logout();
        window.location.href = '/';
        return Observable.empty();
      } else {
        const timeLeft = a.payload.expiresAt - new Date().getTime();

        return Observable.timer(timeLeft > 30000 ? timeLeft - 30000 : 0)
          .mergeMap(() => auth.renewToken())
          .map((a) => userSessionSet(a, false));
      }
    });
};

export const epics = [
  // auth
  authCallbackEpic,
  authTokenRefreshEpic,

  // projects view
  loadProjectsEpic,
  loadSprintsEpic,

  // project actions
  addProjectEpic,
  getProjectEpic,
  editProjectEpic,
  removeProjectEpic,

  // sprint actions
  addSprintEpic,
  getSprintEpic,
  editSprintEpic,
  removeSprintEpic,

  // board
  loadBoardEpic,
  moveBoardEpic,
  pointsBoardEpic,

  // swimlane actions
  addSwimlaneEpic,
  removeSwimlaneEpic,
  editSwimlaneEpic,
  getSwimlaneEpic,

  // task actions
  getMembersEpic,
  addTaskEpic,
  removeTaskEpic,
  getTaskEpic,
  editTaskEpic,
  uploadAttachmentEpic,
  uploadAttachmentDoneEpic
];
