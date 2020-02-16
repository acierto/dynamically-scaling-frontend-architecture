import React, {Component} from 'react';
import PropTypes from 'prop-types';
import 'bootstrap/dist/css/bootstrap.min.css';
import {LinkContainer} from 'react-router-bootstrap';
import {Button} from 'react-bootstrap';
import CustomLinks from '../components/custom-links';
import CustomRoutes from '../components/custom-routes';
import '../imports/globals';

import './app.less';
import {Route, Switch} from 'react-router';
import {InfoPage} from './info-page/info-page';
import {HomePage} from './home-page/home-page';
import {connect} from 'react-redux';
import ReduxToastr from 'react-redux-toastr';

const mapStateToProps = (state) => ({plugins: state.customPlugins});

@connect(mapStateToProps)
export class App extends Component {
    static propTypes = {
        plugins: PropTypes.arrayOf(PropTypes.shape({
            entry: PropTypes.string.isRequired,
            name: PropTypes.string.isRequired
        }))
    };

    render() {
        const {plugins} = this.props;
        return <div className='dpaApp'>
            <div className='nav'>
                <LinkContainer to='/home'>
                    <Button>Home</Button>
                </LinkContainer>
                <LinkContainer to='/info'>
                    <Button>Info</Button>
                </LinkContainer>
                <CustomLinks plugins={plugins}/>
            </div>
            <main>
                <Switch>
                    <Route component={InfoPage} exact={true} path='/info'/>
                    <Route component={HomePage} path='/home'/>
                    <CustomRoutes plugins={plugins}/>
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
