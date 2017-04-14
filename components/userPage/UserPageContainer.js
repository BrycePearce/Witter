import React from 'react';
import ReactDOM from 'react-dom' //for componentDidMount
import moment from 'moment';

class UserPageContainer extends React.Component {

  constructor(props) {
    super(props);
    this.state = { 
      tweets: [], //initalize tweets as empty (otherwise have to check this.state for null as well when we check tweets length)
      user: true
  };
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
        //user is just to check to see if page exists, created in same /api/user/:username route.
        console.log(json);
        this.setState({ tweets: json.tweets, user: json.user });
      });
    });
  }



  render() {
    /*
     *
     * TODO: 
     * 
     * 1.) 
     * Use Redux to create a global state, so that I can determine if the current user is viewing is own userPage here. Also need it, so that it can check if the userpage exists.
     * https://egghead.io/courses/getting-started-with-redux
     * https://egghead.io/courses/building-react-applications-with-idiomatic-redux
     * 
     * 2.) 
     * give the userTweets li an onClick event so that is displays the tweet in a Modal
     */
    console.log(this.state);
    let tweetInfo = '';
    let usernamePage = this.props.params.username;
    if (this.state.user === false) {
      console.log(this.state.user);
      tweetInfo = "The user " + usernamePage + " does not exist!";
    }
    //check if there are no tweets, otherwise populate our vars
    else if (this.state.tweets.length === 0) {
      tweetInfo = usernamePage + " has not tweeted anything yet!";
    } else {
      tweetInfo = this.state.tweets.map((item, index) => {
        // curly braces { } tell react to get the value of the javascript inside of it
        // so we are putting the value of 'item' inside <li> tags
        return <li className="userTweets" key={index} > <div className="tweetText"> {item.tweet} </div> </li>;
      });
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

        <div className="userpageUsername">{usernamePage}'s page. </div>
        <div className="tweetSubmitter"> </div>
        <ul> {tweetInfo} </ul>
      </div>
    )
  }
}
export default UserPageContainer;