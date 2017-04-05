import React from 'react';
import { render } from 'react-dom';
import General from './General';
import SignupContainer from './SignupContainer';

import { Router, Route, browserHistory, Redirect } from 'react-router';
render((
  <Router history={browserHistory}>
    <Route path="/" component={General} />
    <Route path="/signup" component={SignupContainer} />
    <Redirect from="*" to="/"/>

  </Router>

), document.getElementById('app'))