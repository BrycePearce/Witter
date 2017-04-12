import React from 'react';
import ReactDOM from 'react-dom' //for componentDidMount
class UserPageContainer extends React.Component {

//this fetch queries out our userData for twwet
componentDidMount() {
  fetch('/api/user/' + this.props.params.username, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json'
    },
    credentials: 'same-origin' //this sends cookie/session, need if you want login to work outside of postman
  }).then((response) => {
    response.json().then((json) => {
      console.log("hi there pilgrim");
      console.log(json);
      this.setState({ result: json });
    });
  });
}



render() {

  /*
  what you can do is. when you log in save that response in the login components state
  for display
  store the username and stuff
  and the login component just gets included in every single page
 
  so if you have that login component on every page
  and have the state set (with username and whatever else) when you're logged in
  it will be available everywhere
  */
  //this value if brought ot use from app.js, but just tells us what's after /user/
  //need to update it to know the actual user
  return (
    <div className="UserPageContainer">
     {this.props.params.username}'s page.
    </div>
  )
}
}
export default UserPageContainer;