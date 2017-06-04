import React from 'react';
import { render } from 'react-dom';
import Tweet from './Tweet';
import Login from './authentication/Login';
import Logout from './authentication/Logout';
import { Router, Route, browserHistory, Redirect, IndexRoute } from 'react-router';

class General extends React.Component {
  //******TODO: temporary for testing redux stuff, remove this when you test for current user with Express cookie
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
    this.handleClick2 = this.handleClick2.bind(this);
  }

  handleClick() {
    console.log("click1");
    console.log(this);
    this.props.router.push('/user/admin');
  }

  handleClick2() {
    console.log("click2");
    console.log(this);
    this.props.router.push('/user/test');
  }
  //******
  render() {
    return (
      <div className="landing-container">
        <Login />
        <Logout />
        <Tweet />
        <button onClick={this.handleClick}> admin page </button>
        <button onClick={this.handleClick2}> random page </button>
      </div>
    )
  }
}
export default General;