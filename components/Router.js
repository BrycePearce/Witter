import React from 'react';
import { render } from 'react-dom';
import LandingPageContainer from './LandingPageContainer';
import UserPageContainer from './userPage/UserPageContainer';
import SignupContainer from './authentication/signup/SignupContainer';
import { Router, Route, browserHistory, Redirect } from 'react-router';

render((
  <Router history={browserHistory}>
    <Route path="/" component={LandingPageContainer} />
    <Route path="/signup" component={SignupContainer} />
    {/*when /user/:username route is hit, it redirects to /user/username, 
    and it passes the username in the url as a prop to UserPageContainer*/}
    <Route path='/user/:username' component={UserPageContainer} />
    <Redirect from="*" to="/"/>

  </Router>

), document.getElementById('app'));