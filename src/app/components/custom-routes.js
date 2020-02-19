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
        plugins: pluginsType,
        restrictedPluginNames: PropTypes.arrayOf(PropTypes.string)
    };

    static defaultProps = {restrictedPluginNames: []};

    component = (plugin) => () => <CatchError>
        <LoadPlugin
            bootstrappedPlugins={this.props.bootstrappedPlugins}
            pluginName={plugin.name}
            scriptUrl={plugin.entry}
        />
    </CatchError>;

    createRoute = (plugin) =>
        !R.contains(plugin.name, this.props.restrictedPluginNames) ?
            <Route
                component={this.component(plugin)}
                exact={true}
                key={`${plugin.name}-route`}
                path={`/${plugin.name}`}
            /> :
            undefined;

    render() {
        const {plugins} = this.props;

        return <>
            {R.map(this.createRoute, plugins)}
        </>;
    }
}
