import R from 'ramda';
import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';
import {Route} from 'react-router';
import CatchError from '../components/catch-error';
import LoadPlugin from '../components/load-plugin';
import {pluginsType} from '../types/plugins-type';

export default class CustomRoutes extends PureComponent {
    static propTypes = {
        bootstrappedPlugins: PropTypes.arrayOf(PropTypes.string).isRequired,
        plugins: pluginsType
    };

    component = (plugin) => () => <CatchError>
        <LoadPlugin
            bootstrappedPlugins={this.props.bootstrappedPlugins}
            pluginName={plugin.name}
            scriptUrl={plugin.entry}
        />
    </CatchError>;

    createRoute = (plugin) =>
        <Route
            component={this.component(plugin)}
            key={`${plugin.name}-route`}
            path={`/${plugin.name}`}
        />;

    render() {
        const {plugins} = this.props;

        return <>
            {R.map(this.createRoute, plugins)}
        </>;
    }
}
