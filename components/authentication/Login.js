import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as actionCreators from '../../actions/actionCreators';
import LandingPageContainer from '../LandingPageContainer';

//Good example for CSS of signup page http://codepen.io/mikepro4/full/pvKYZG/

//redux to keep track of user
function mapStateToProps(state) {
  console.log("we are setting user to " + state.user.user);
  return {
    user: state.user.user
  }
}
//connects functions in actionCreator and maps them to this.props, so it will become this.props.functionName() which we use in the componentDidMount
function mapDispatchToProps(dispatch) {
  return bindActionCreators(actionCreators, dispatch);
}

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
      }),
      credentials: 'same-origin' //this sends cookie/session, need if you want login to work outside of postman
    })
      //decode
      .then(res => res.json())

      .then(res => {
        // Injected by react-redux:
        let { dispatch } = this.props;
        this.props.user(this.state.usernameLogin);
       // dispatch(action);
      });
  }


  render() {
    let { dispatch } = this.props
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
//if we are using redux in a component, export like this
export default connect(mapStateToProps, mapDispatchToProps)(Login);