import React from 'react';
import { render } from 'react-dom';
import Tweet from './Tweet';

class General extends React.Component {

    render() {
        return (
            <div className="landing-container">
                <Tweet />
            </div>
        )
    }
}
export default General;