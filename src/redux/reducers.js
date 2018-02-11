import { createReducer } from './reducers/utils'

const initialStateTree = {
  global: {
    test: 'test'
  },
  project: {
    projects: [],
    sprints: [],
    projectsLoaded: false
  },
  user: {
    signedIn: false,
    accessToken: '',
    idToken: '',
    expiresAt: 0,
    profile: {}
  }
};

const projectReducer = createReducer(initialStateTree.project, {
  'PROJECT_LOAD_INIT': (state, action) => ({ ...state, projects: [], projectsLoaded: true }),
  'SPRINT_LOAD_INIT': (state, action) => ({ ...state, sprints: [] }),
  'PROJECT_LOAD_DONE': (state, action) => ({ ...state, projects: action.payload.projects }),
  'SPRINT_LOAD_DONE': (state, action) => ({ ...state, sprints: action.payload.sprints }),
});

const globalReducer = createReducer(initialStateTree.global, {
  'TEST_ACTION': (state, action) => ({ ...state, test: action.payload.text })
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
  global: globalReducer,
  user: userReducer,
  project: projectReducer
};

