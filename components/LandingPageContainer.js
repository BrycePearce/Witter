import React from 'react';
import { render } from 'react-dom';
import Tweet from './Tweet';
import Login from './authentication/Login';
import Logout from './authentication/Logout';
class General extends React.Component {

    render() {
        return (
            <div className="landing-container">
                <Login />
                <Logout />
                <Tweet />
            </div>
        )
    }
}
export default General;