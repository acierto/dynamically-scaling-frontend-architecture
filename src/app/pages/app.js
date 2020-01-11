import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {Link} from 'react-router-dom';

export class App extends Component {
    static propTypes = {children: PropTypes.element};

    render() {
        return <div className="dpaApp">
            <div className="nav">
                <div>
                    <Link className="home" to="/home">Home</Link>
                    <Link className="info" to="/info">Info</Link>
                </div>
            </div>
            <main>
                {this.props.children}
            </main>
        </div>;
    }
}
