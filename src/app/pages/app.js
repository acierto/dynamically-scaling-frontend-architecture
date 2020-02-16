import React, {Component} from 'react';
import PropTypes from 'prop-types';
import 'bootstrap/dist/css/bootstrap.min.css';
import {LinkContainer} from 'react-router-bootstrap';
import {Button} from 'react-bootstrap';
import CustomPluginsExtension from '../components/custom-plugins-extension';

import './app.less';

export class App extends Component {
    static propTypes = {children: PropTypes.element};

    render() {
        return <div className="dpaApp">
            <div className="nav">
                <LinkContainer to="/home">
                    <Button>Home</Button>
                </LinkContainer>
                <LinkContainer to="/info">
                    <Button>Info</Button>
                </LinkContainer>
                <CustomPluginsExtension/>
            </div>
            <main>
                {this.props.children}
            </main>
        </div>;
    }
}
