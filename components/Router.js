import React from 'react';
import { render } from 'react-dom';
import LandingPageContainer from './LandingPageContainer';
import UserPageContainer from './userPage/UserPageContainer';
import SignupContainer from './authentication/signup/SignupContainer';
import App from './App';
import { Router, Route, browserHistory, Redirect } from 'react-router';
import { Provider } from 'react-redux';
import store, { history } from '../store';
render((
  /*Provider will expose our store to the application*/
  <Provider store={store}>
    <Router history={history}>
      <Route path="/" component={LandingPageContainer} />
      <Route path="/redux" component={App} />
      <Route path="/signup" component={SignupContainer} />
      {/*when /user/:username route is hit, it redirects to /user/username, 
    and it passes the username in the url as a prop to UserPageContainer*/}
      <Route path='/user/:username' component={UserPageContainer} />
      <Redirect from="*" to="/" />

    </Router>
  </Provider>

), document.getElementById('app'));