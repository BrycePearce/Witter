import React from 'react';
import { Link } from 'react-router';

const Main = React.createClass({
  render() {
    return (
      <div>
        <h1>
          <Link to="/redux">Reduxstagram</Link>
        </h1>
        {/*cloneElement passes down props from Main to the first child (in react router)*/}
        {React.cloneElement(this.props.children, this.props)}
      </div>
    )
  }
});

export default Main;