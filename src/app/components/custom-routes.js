import R from 'ramda';
import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';
import {Route} from 'react-router';
import CatchError from '../components/catch-error';
import LoadModule from '../components/load-module';
import {modulesType} from '../types/modules-type';

export default class CustomRoutes extends PureComponent {
    static propTypes = {
        bootstrappedModules: PropTypes.arrayOf(PropTypes.string).isRequired,
        modules: modulesType,
        restrictedModuleNames: PropTypes.arrayOf(PropTypes.string)
    };

    static defaultProps = {restrictedModuleNames: []};

    component = (module) => () => <CatchError>
        <LoadModule
            bootstrappedModules={this.props.bootstrappedModules}
            moduleName={module.name}
            scriptUrl={module.entry}
        />
    </CatchError>;

    createRoute = (module) =>
        !R.contains(module.name, this.props.restrictedModuleNames) ?
            <Route
                component={this.component(module)}
                exact={true}
                key={`${module.name}-route`}
                path={`/${module.name}`}
            /> :
            undefined;

    render() {
        const {modules} = this.props;

        return <>
            {R.map(this.createRoute, modules)}
        </>;
    }
}
