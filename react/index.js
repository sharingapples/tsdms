import React from 'react';
import { render } from 'react-dom';
import { Router, browserHistory, match } from 'react-router';
import RouterApp from './routes';

require('jquery');
require('../semantic/dist/semantic.js');
require('../semantic/dist/semantic.css');
require('../assets/styles/main.css');

const history = browserHistory;
const routes = RouterApp.routes;

match({ history, routes }, (error, redirectLocation, renderProps) => {
  // The parameters for the Application are passed through renderProps.param
  render(
    <RouterApp
        user={window.user}
        initialData={window.data} {...renderProps} />,
      document.getElementById('workspace')
  );
});
