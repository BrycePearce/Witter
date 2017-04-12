import React from 'react';

class Logout extends React.Component {

  handleSubmit() {
    console.log("logout123");
    fetch("/user/logout", {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      },
      credentials: 'same-origin' //this sends cookie/session, need if you want login to work outside of postman
    });
  }


  render() {
    return (
      <div className="logoutContainer">
        <button
          type="button"
          className="logoutButton"
          onClick={this.handleSubmit}>Logout</button>
      </div>
    )
  }
}

export default Logout;