import React from 'react';
import ReactDOM from 'react-dom';

import './utils/rx-operators';
import './styles/global.scss';
import AppContainer from './containers/AppContainer';

import { Provider } from 'react-redux';
import { createReduxStore } from './utils/create-store';
import createHistory from 'history/createBrowserHistory';
import { DragDropContext } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';

const history = createHistory();
const store = createReduxStore(history);
const AppWithDndContext = DragDropContext(HTML5Backend)(AppContainer);

ReactDOM.render(
  <Provider store={store}>
    <AppWithDndContext history={history} />
  </Provider>,
  document.getElementById('root')
);
