import React from 'react';
import AvatarSmall from './static/avatarSmall.png';
class Tweet extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      value: '', //initialize
      clicked: false
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleExpand = this.handleExpand.bind(this);
  }

  /*can probably use this for the number of characters available: https://facebook.github.io/react/docs/forms.html */
  handleChange(event) {
    this.setState({value: event.target.value});
  }


  handleSubmit() {
    console.log("Welcome to handleSubmit, your Wit = " + this.state.value);
    console.log(this.state);
    
    fetch("/", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({value: this.state.value}),
      credentials: 'same-origin' //this sends cookie/session, need if you want login to work outside of postman
    })
      //decode
      .then(res => res.json())

      .then(res => {
        //TODO:
        //set the state with the result, then display it on Witter feed
        console.log(res);
      });
  }
  
  //Handle how the tweetbox should react when being used
  handleExpand(click) {
    if (click.target.value.length === 0) {
      this.setState({
        clicked: !this.state.clicked ? 'tweetBoxFocus' : ''
      });
    } else {
      this.setState({ clicked: 'tweetBoxFocus' });
    }
  }

  render() {
    return (
      <div className="tweetContainer">
        <div className="avatarSmall">
          <img className="avatarSmallArea" src={AvatarSmall} />
        </div>
        <textarea
          value={this.state.value} 
          onChange={this.handleChange}
          onFocus={this.handleExpand}
          onBlur={this.handleExpand}
          className={'tweetBox ' + this.state.clicked}
          placeholder="What's happening?" />
        <button
          type="submit"
          className="witButton"
          onClick={this.handleSubmit}>Wit</button>
      </div>
    )
  }
}
export default Tweet;