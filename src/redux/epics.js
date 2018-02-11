import { LOCATION_CHANGE, push } from 'react-router-redux';

import auth from '../utils/auth';
import { userSessionSet } from './actions/user';

import { Observable } from 'rxjs';
import { api } from '../utils/api';
import { loadProjectsDone, loadSprintsDone } from './actions/project';

const loadProjectsEpic = (action$, store) => {
  return action$
    .filter(a => a.type === 'PROJECT_LOAD_INIT')
    .switchMap(() => api.get('projects'))
    .map(projects => loadProjectsDone(projects))
    .catch((err) => Observable.of(loadProjectsDone(null, err)));
};

const loadSprintsEpic = (action$, store) => {
  return action$
    .filter(a => a.type === 'SPRINT_LOAD_INIT')
    .switchMap((a) => api.get('projects/' + a.payload.project + '/sprints'))
    .map(sprints => loadSprintsDone(sprints))
    .catch((err) => Observable.of(loadSprintsDone(null, err)));
};

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
  authCallbackEpic,
  authTokenRefreshEpic,
  loadProjectsEpic,
  loadSprintsEpic
];
