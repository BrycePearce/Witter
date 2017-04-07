import React from 'react';
import { render } from 'react-dom';
import Tweet from './Tweet';
import Login from './Login';

class General extends React.Component {

    render() {
        return (
            <div className="landing-container">
                <Login />
                <Tweet />
            </div>
        )
    }
}
export default General;