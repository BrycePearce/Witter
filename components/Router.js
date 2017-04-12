import React from 'react';
import { render } from 'react-dom';
import General from './General';
import UserPage from './UserPageContainer';
import SignupContainer from './SignupContainer';
import { Router, Route, browserHistory, Redirect } from 'react-router';

render((
  <Router history={browserHistory}>
    <Route path="/" component={General} />
    <Route path="/signup" component={SignupContainer} />
    {/*when /user/:username route is hit, it redirects to /user/username, 
    and it passes the username of whoever is signed in as a prop to UserPage*/}
    <Route path='/user/:username' component={UserPage} />
    <Redirect from="*" to="/"/>

  </Router>

), document.getElementById('app'));