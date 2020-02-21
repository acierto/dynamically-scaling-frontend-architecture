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
import {modulesType} from '../types/modules-type';
import {usersType} from '../types/users-type';
import {UsersPage} from './users-page/users-page';
import {HomePage} from './home-page/home-page';

import './app.less';

const mapStateToProps = (state) => ({
    bootstrappedModules: state.bootstrap.bootstrappedModules,
    modules: state.customModules,
    permissions: state.permissions,
    users: state.users
});

@connect(mapStateToProps)
export class App extends Component {
    static propTypes = {
        bootstrappedModules: PropTypes.arrayOf(PropTypes.string).isRequired,
        modules: modulesType,
        permissions: permissionsType,
        users: usersType
    };

    allowToRemoveUsers = () =>
        R.find(R.propEq('name', 'allow-remove-users'), this.props.permissions).enabled;

    allowToViewAdminPage = () =>
        R.find(R.propEq('name', 'allow-view-admin-page'), this.props.permissions).enabled;

    render() {
        const {bootstrappedModules, modules, users} = this.props;

        const restrictedModuleNames = this.allowToViewAdminPage() ? [] : ['admin'];

        return <div className="dsfaApp">
            <div className="nav">
                <LinkContainer to="/home">
                    <Button variant="dark">Home</Button>
                </LinkContainer>
                <LinkContainer to="/users">
                    <Button variant="dark">Users</Button>
                </LinkContainer>
                <CustomLinks modules={modules} restrictedModuleNames={restrictedModuleNames}/>
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
                        bootstrappedModules={bootstrappedModules}
                        modules={modules}
                        restrictedModuleNames={restrictedModuleNames}
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
