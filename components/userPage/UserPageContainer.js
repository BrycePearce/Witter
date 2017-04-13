import React from 'react';
import ReactDOM from 'react-dom' //for componentDidMount
import moment from 'moment';

class UserPageContainer extends React.Component {

  constructor(props) {
    super(props);
    this.state = { tweets: [] }; //initalize tweets as empty (otherwise have to check this.state for null as well when we check tweets length)
  }

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
        //we just put the json value in the tweets spot -- (setting json = to tweets)
        //This way we can check for an empty length with just one statement, which we do below.
        this.setState({ tweets: json.tweets });
      });
    });
  }



  render() {
    /*
     *
     * TODO: CHANGE RESULTS TO A LIST, DON'T BE LAZY
     *
     */
    let resultString = '';
    //check if there are no tweets, otherwise populate our vars
    if (this.state.tweets.length === 0) {
      resultString = "This user hasn't tweeted anything yet!";
    } else {
      for (let i = 0; i < this.state.tweets.length; i++) {
        resultString += this.state.tweets[i].tweet + moment(this.state.tweets[i].createdAt).format('MMM Do YYYY, h:mm:ss a');
      }
    }
    // console.log(this.state.result.tweets["0"].tweet)}
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

        <div className="userpageUsername">{this.props.params.username}'s page. </div>
        {resultString}
      </div>
    )
  }
}
export default UserPageContainer;