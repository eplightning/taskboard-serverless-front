import { createReducer } from './reducers/utils'

const initialStateTree = {
  project: {
    projects: [],
    sprints: [],
    projectsLoaded: false
  },
  form: {
    data: {},
    loaded: false
  },
  user: {
    signedIn: false,
    accessToken: '',
    idToken: '',
    expiresAt: 0,
    profile: {}
  }
};

const formReducer = createReducer(initialStateTree.form, {
  'PROJECT_GET_INIT': (state, action) => ({ ...state, data: {}, loaded: false }),
  'PROJECT_GET_DONE': (state, action) => ({ ...state, data: action.payload.data, loaded: true }),
  'PROJECT_EDIT_DONE': (state, action) => ({ ...state, data: {}, loaded: false }),
  'SPRINT_GET_INIT': (state, action) => ({ ...state, data: {}, loaded: false }),
  'SPRINT_GET_DONE': (state, action) => ({ ...state, data: action.payload.data, loaded: true }),
  'SPRINT_EDIT_DONE': (state, action) => ({ ...state, data: {}, loaded: false }),
});

const projectReducer = createReducer(initialStateTree.project, {
  'PROJECT_LOAD_INIT': (state, action) => ({ ...state, projects: [], projectsLoaded: true }),
  'SPRINT_LOAD_INIT': (state, action) => ({ ...state, sprints: [] }),
  'PROJECT_LOAD_DONE': (state, action) => ({ ...state, projects: action.payload.projects }),
  'SPRINT_LOAD_DONE': (state, action) => ({ ...state, sprints: action.payload.sprints }),
});

const userReducer = createReducer(initialStateTree.user, {
  'USER_SESSION_SET_CALLBACK': (state, action) => {
    return {
      signedIn: true,
      accessToken: action.payload.accessToken,
      idToken: action.payload.idToken,
      expiresAt: action.payload.expiresAt,
      profile: action.payload.profile
    }
  },
  'USER_SESSION_SET_REFRESH': (state, action) => {
    return {
      signedIn: true,
      accessToken: action.payload.accessToken,
      idToken: action.payload.idToken,
      expiresAt: action.payload.expiresAt,
      profile: action.payload.profile
    }
  },
  'USER_LOGOUT': (state, action) => {
    return {
      signedIn: false,
      profile: {},
      expiresAt: 0,
      accessToken: '',
      idToken: ''
    }
  }
});

export const reducers = {
  user: userReducer,
  project: projectReducer,
  form: formReducer
};

