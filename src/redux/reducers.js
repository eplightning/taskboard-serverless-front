import { createReducer } from './reducers/utils'
import { updateBoardTask, removeBoardTask } from '../utils/board';

const initialStateTree = {
  project: {
    projects: [],
    sprints: [],
    projectsLoaded: false
  },
  form: {
    data: {},
    loaded: false,
    members: [],
    membersLoaded: false,
    uploading: false
  },
  sprint: {
    loaded: false,
    board: {}
  },
  user: {
    signedIn: false,
    accessToken: '',
    idToken: '',
    expiresAt: 0,
    profile: {}
  }
};

const sprintReducer = createReducer(initialStateTree.sprint, {
  'BOARD_LOAD_DONE': (state, action) => ({ ...state, loaded: true, board: action.payload.board }),
  'BOARD_LOAD_INIT': (state, action) => ({ ...state, loaded: false, board: {} }),
  'BOARD_MOVE_DONE': (state, action) => ({ ...state, board: updateBoardTask(state.board, action.payload.task) }),
  'BOARD_POINTS_DONE': (state, action) => ({ ...state, board: updateBoardTask(state.board, action.payload.task) }),
  'TASK_REMOVE_DONE': (state, action) => ({ ...state, board: removeBoardTask(state.board, action.payload.id) }),
});

const formReducer = createReducer(initialStateTree.form, {
  'PROJECT_GET_INIT': (state, action) => ({ ...state, data: {}, loaded: false }),
  'PROJECT_GET_DONE': (state, action) => ({ ...state, data: action.payload.data, loaded: true }),
  'PROJECT_EDIT_DONE': (state, action) => ({ ...state, data: {}, loaded: false }),
  'SPRINT_GET_INIT': (state, action) => ({ ...state, data: {}, loaded: false }),
  'SPRINT_GET_DONE': (state, action) => ({ ...state, data: action.payload.data, loaded: true }),
  'SPRINT_EDIT_DONE': (state, action) => ({ ...state, data: {}, loaded: false }),
  'SWIMLANE_GET_INIT': (state, action) => ({ ...state, data: {}, loaded: false }),
  'SWIMLANE_GET_DONE': (state, action) => ({ ...state, data: action.payload.data, loaded: true }),
  'SWIMLANE_EDIT_DONE': (state, action) => ({ ...state, data: {}, loaded: false }),
  'TASK_GET_INIT': (state, action) => ({ ...state, data: {}, loaded: false }),
  'TASK_GET_DONE': (state, action) => ({ ...state, data: action.payload.data, loaded: true }),
  'TASK_EDIT_DONE': (state, action) => ({ ...state, data: {}, loaded: false }),
  'TASK_MEMBERS_GET_DONE': (state, action) => ({ ...state, members: action.payload.members, membersLoaded: true }),
  'TASK_MEMBERS_GET_INIT': (state, action) => ({ ...state, members: [], membersLoaded: false }),
  'ATTACHMENT_UPLOAD_INIT': (state, action) => ({ ...state, uploading: true }),
  'ATTACHMENT_UPLOAD_DONE': (state, action) => ({ ...state, uploading: false })
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
  form: formReducer,
  sprint: sprintReducer
};

