import React from 'react';
import { render } from 'react-dom';
import { Router, Route, browserHistory, Redirect } from 'react-router';
render((
  <Router history={browserHistory}>
    <Route path="/" component={Search} />
    <Route path="/details/:id" component={Details} />
    <Redirect from="*" to="/"/>

  </Router>

), document.getElementById('app'))