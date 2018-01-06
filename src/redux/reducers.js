import { createReducer } from './reducers/utils'

const initialStateTree = {
  global: {
    test: 'test'
  }
};

const globalReducer = createReducer(initialStateTree.global, {
  'TEST_ACTION': (state, action) => ({ ...state, test: action.payload.text })
});

export const reducers = {
  global: globalReducer
};

