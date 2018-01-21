import { createReducer } from './reducers/utils'

const initialStateTree = {
  global: {
    test: 'test'
  },
  user: {
    signedIn: false,
    accessToken: '',
    idToken: '',
    expiresAt: 0,
    profile: {}
  }
};

const globalReducer = createReducer(initialStateTree.global, {
  'TEST_ACTION': (state, action) => ({ ...state, test: action.payload.text })
});

const userReducer = createReducer(initialStateTree.user, {
  'USER_SESSION_SET_CALLBACK': (state, action) => {
    return {
      ...state,
      signedIn: true,
      accessToken: action.payload.accessToken,
      idToken: action.payload.idToken,
      expiresAt: action.payload.expiresAt,
      profile: action.payload.profile
    }
  },
  'USER_SESSION_SET_REFRESH': (state, action) => {
    return {
      ...state,
      signedIn: true,
      accessToken: action.payload.accessToken,
      idToken: action.payload.idToken,
      expiresAt: action.payload.expiresAt,
      profile: action.payload.profile
    }
  },
  'USER_LOGOUT': (state, action) => {
    return {
      ...state,
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
  user: userReducer
};

