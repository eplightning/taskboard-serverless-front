import React from 'react';
import ReactDOM from 'react-dom';
import App from './containers/App';
import { Provider } from 'react-redux';
import { createReduxStore } from './utils/create-store';
import createHistory from 'history/createBrowserHistory';
import { ConnectedRouter } from 'react-router-redux';

it('renders without crashing', () => {
  const history = createHistory();
  const store = createReduxStore(history);
  const div = document.createElement('div');

  ReactDOM.render(<Provider store={store}>
    <ConnectedRouter history={history}>
      <App />
    </ConnectedRouter>
  </Provider>, div);
});
