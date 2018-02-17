import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import AppRouter, { history } from './routers/AppRouter';
import LoadingPage from './components/LoadingPage';
import configureStore from './store/configureStore';
import { login, logout } from './actions/auth';

import './firebase/firebase';

import 'normalize.css/normalize.css';
import './styles/styles.scss';
import 'react-dates/lib/css/_datepicker.css';

import { firebase } from './firebase/firebase';

const store = configureStore();

const jsx = (
  <Provider store={ store } >
    <AppRouter />
  </Provider>
);

let hasRendered = false;
const renderApp = () => {
  if (!hasRendered) {
    hasRendered = true;
    ReactDOM.render(jsx, document.getElementById('app'));
  }
};

ReactDOM.render(<LoadingPage />, document.getElementById('app'));

firebase.auth().onAuthStateChanged((user) => {
  if (user) {
    store.dispatch(login(user.uid));

    renderApp();
    if(history.location.pathname === '/') {
      history.push('/dashboard');
    }
  } else {
    store.dispatch(logout());

    renderApp();
    history.push('/');
  }
});