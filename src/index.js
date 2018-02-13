import React from 'react';
import ReactDOM from 'react-dom';

import './utils/rx-operators';
import './styles/global.scss';
import App from './containers/App';

import { Provider } from 'react-redux';
import { createReduxStore } from './utils/create-store';
import createHistory from 'history/createBrowserHistory';
import { DragDropContext } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';
import auth from './utils/auth';
import { ConnectedRouter, push } from 'react-router-redux';
import { Route, Switch } from 'react-router-dom';
import Loader from './components/Loader';
import { userSessionSet } from './redux/actions/user';
import { api } from './utils/api';

const history = createHistory();
const store = createReduxStore(history);
const AppWithDndContext = DragDropContext(HTML5Backend)(App);

api.updateStore(store);

const renderApplication = () => ReactDOM.render(
  <Provider store={store}>
    <ConnectedRouter history={history}>
      <Switch>
        <Route exact path="/auth_callback" component={Loader}/>
        <Route component={AppWithDndContext}/>
      </Switch>
    </ConnectedRouter>
  </Provider>,
  document.getElementById('root')
);

if (!auth.storageExpired()) {
  ReactDOM.render(<Loader/>, document.getElementById('root'));

  auth.renewToken()
    .then((authResult) => store.dispatch(userSessionSet(authResult, false)), (err) => store.dispatch(push('/')))
    .then(() => renderApplication());
} else {
  renderApplication();
}
