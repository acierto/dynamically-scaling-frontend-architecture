import R from 'ramda';
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
import {permissionsType} from '../types/permissions-type';
import {pluginsType} from '../types/plugins-type';
import {usersType} from '../types/users-type';
import {UsersPage} from './users-page/users-page';
import {HomePage} from './home-page/home-page';

import './app.less';

const mapStateToProps = (state) => ({
    bootstrappedPlugins: state.bootstrap.bootstrappedPlugins,
    permissions: state.permissions,
    plugins: state.customPlugins,
    users: state.users
});

@connect(mapStateToProps)
export class App extends Component {
    static propTypes = {
        bootstrappedPlugins: PropTypes.arrayOf(PropTypes.string).isRequired,
        permissions: permissionsType,
        plugins: pluginsType,
        users: usersType
    };

    allowToRemoveUsers = () =>
        R.find(R.propEq('name', 'allow-remove-users'), this.props.permissions).enabled;

    allowToViewAdminPage = () =>
        R.find(R.propEq('name', 'allow-view-admin-page'), this.props.permissions).enabled;

    render() {
        const {bootstrappedPlugins, plugins, users} = this.props;

        const restrictedPluginNames = this.allowToViewAdminPage() ? [] : ['admin'];

        return <div className="dpaApp">
            <div className="nav">
                <LinkContainer to="/home">
                    <Button variant="dark">Home</Button>
                </LinkContainer>
                <LinkContainer to="/users">
                    <Button variant="dark">Users</Button>
                </LinkContainer>
                <CustomLinks plugins={plugins} restrictedPluginNames={restrictedPluginNames}/>
            </div>
            <main>
                <Switch>
                    <Route
                        component={() =>
                            <UsersPage
                                allowToRemoveUsers={this.allowToRemoveUsers()}
                                users={users}
                            />
                        }
                        exact={true}
                        path="/users"
                    />
                    <Route component={HomePage} exact={true} path="/home"/>
                    <CustomRoutes
                        bootstrappedPlugins={bootstrappedPlugins}
                        plugins={plugins}
                        restrictedPluginNames={restrictedPluginNames}
                    />
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
