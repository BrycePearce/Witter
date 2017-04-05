import React from 'react';

//Good example for CSS of signup page http://codepen.io/mikepro4/full/pvKYZG/
class Signup extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      usernameValue: '', //initialize user/pass
      passwordValue: ''
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    //this handlesChange for all signup inputs
    this.setState({
      [event.target.name]: event.target.value
    });
  }

  handleSubmit() {
    console.log("welcome to handleSubmit");
    console.log(this.state.usernameValue);
    console.log(this.state.passwordValue);

    fetch("/user/register", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        username: this.state.usernameValue,
        password: this.state.passwordValue
      })
    })
      //decode
      .then(res => res.json())

      .then(res => {
        console.log(res);
      });
  }


  render() {
    return (
      <div className="signupSheetContainer">
        <input
          className="signupUsername"
          name="usernameValue"
          value={this.state.value} //need to log this
          onChange={this.handleChange}
          placeholder="Username" />

        <input
          className="signupPassword"
          name="passwordValue"
          value={this.state.value}
          onChange={this.handleChange}
          placeholder="Password" />

        <button
          type="button"
          className="witButton"
          onClick={this.handleSubmit}>Create Account</button>
      </div>
    )
  }
}
export default Signup;