import { routerReducer, routerMiddleware } from 'react-router-redux';
import { createStore, compose, applyMiddleware, combineReducers } from 'redux';
import { reducers } from '../redux/reducers';
import { epics } from '../redux/epics';
import { combineEpics, createEpicMiddleware } from 'redux-observable';

export function createReduxStore(history) {
  const rootReducer = combineReducers({
    ...reducers,
    router: routerReducer
  });

  const rootEpic = combineEpics(...epics);

  let middlewareCompose = compose;

  if (process.env.NODE_ENV === 'development') {
    middlewareCompose = typeof window === 'object' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
      ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({}) : compose;
  }

  const enhancer = middlewareCompose(
    applyMiddleware(
      routerMiddleware(history),
      createEpicMiddleware(rootEpic)
    )
  );

  return createStore(rootReducer, enhancer);
};
