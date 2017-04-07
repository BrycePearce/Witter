import React from 'react';

//Good example for CSS of signup page http://codepen.io/mikepro4/full/pvKYZG/
class Login extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      usernameLogin: '', //initialize user/pass
      passwordLogin: ''
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
    console.log(this.state.usernameLogin);
    console.log(this.state.passwordLogin);

    fetch("/user/auth", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        username: this.state.usernameLogin,
        password: this.state.passwordLogin
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
          name="usernameLogin"
          value={this.state.value} //need to log this
          onChange={this.handleChange}
          placeholder="Username" />

        <input
          className="signupPassword"
          name="passwordLogin"
          value={this.state.value}
          onChange={this.handleChange}
          placeholder="Password" />

        <button
          type="button"
          className="witButton"
          onClick={this.handleSubmit}>Log in</button>
      </div>
    )
  }
}
export default Login;