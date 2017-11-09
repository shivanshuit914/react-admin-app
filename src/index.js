import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';
import {createStore, applyMiddleware} from 'redux';
import reduxThunk from 'redux-thunk';

import './index.css';
import 'bootstrap/dist/css/bootstrap.css'
import registerServiceWorker from './registerServiceWorker';
import {
    BrowserRouter as Router,
    Route,
    Switch
  } from 'react-router-dom';
import Login from './components/auth/login';
import Logout from './components/auth/logout';
import Dashboard from './components/dashboard';
import App from './components/app';
import reducers from './reducers/';
import Authenticate from './components/auth/authenticate';
import {AUTH_USER} from './actions/auth';

const createStoreWithMiddleware = applyMiddleware(reduxThunk)(createStore);
const store = createStoreWithMiddleware(reducers);

const token = localStorage.getItem('token');
// If we have a token, consider the user to be signed in
if (token) {
    // we need to update application state
    store.dispatch({ type: AUTH_USER });
}

ReactDOM.render(
    <Provider store={store}>
        <Router>
            <App>
                <Switch>
                    <Route exact path="/" component={Login}/>
                    <Route path="/logout" component={Logout}/>
                    <Route path="/dashboard" component={Authenticate(Dashboard)}/>
                </Switch>
            </App>
        </Router>
    </Provider>
  , document.getElementById('root'));
registerServiceWorker();
