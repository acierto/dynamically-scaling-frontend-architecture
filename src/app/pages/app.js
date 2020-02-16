import React, {Component} from 'react';
import {Route, Switch} from 'react-router';
import ReduxToastr from 'react-redux-toastr';
import {connect} from 'react-redux';
import 'bootstrap/dist/css/bootstrap.min.css';
import {LinkContainer} from 'react-router-bootstrap';
import {Button} from 'react-bootstrap';
import PropTypes from 'prop-types';
import CustomLinks from '../components/custom-links';
import CustomRoutes from '../components/custom-routes';
import '../imports/globals';
import {pluginsType} from '../types/plugins-type';
import {InfoPage} from './info-page/info-page';
import {HomePage} from './home-page/home-page';

import './app.less';

const mapStateToProps = (state) => ({
    bootstrappedPlugins: state.bootstrap.bootstrappedPlugins,
    plugins: state.customPlugins
});

@connect(mapStateToProps)
export class App extends Component {
    static propTypes = {
        bootstrappedPlugins: PropTypes.arrayOf(PropTypes.string).isRequired,
        plugins: pluginsType
    };

    render() {
        const {bootstrappedPlugins, plugins} = this.props;
        return <div className="dpaApp">
            <div className="nav">
                <LinkContainer to="/home">
                    <Button>Home</Button>
                </LinkContainer>
                <LinkContainer to="/info">
                    <Button variant="info">Info</Button>
                </LinkContainer>
                <CustomLinks plugins={plugins}/>
            </div>
            <main>
                <Switch>
                    <Route component={InfoPage} exact={true} path="/info"/>
                    <Route component={HomePage} path="/home"/>
                    <CustomRoutes bootstrappedPlugins={bootstrappedPlugins} plugins={plugins}/>
                </Switch>
            </main>
            <ReduxToastr
                newestOnTop={true}
                position="top-right"
                preventDuplicates={true}
                progressBar={true}
                timeOut={10000}
                transitionIn="bounceInDown"
                transitionOut="fadeOut"
            />
        </div>;
    }
}
