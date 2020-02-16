import R from 'ramda';
import React, {PureComponent} from 'react';
import {Route} from 'react-router';
import ErrorBoundary from '../components/error-boundary-component';
import LoadPlugin from '../components/load-plugin';
import {pluginsType} from '../types/plugins-type';

export default class CustomRoutes extends PureComponent {
    static propTypes = {plugins: pluginsType};

    createRoute = (plugin) => {
        const component = () => <ErrorBoundary>
            <LoadPlugin
                bootstrappedPlugins={[]}
                pluginName={plugin.name}
                scriptUrl={plugin.entry}
            />
        </ErrorBoundary>;
        return <Route component={component} key={`${plugin.name}-route`} path={`/${plugin.name}`}/>;
    };

    render() {
        const {plugins} = this.props;

        return <>
            {R.map(this.createRoute, plugins)}
        </>;
    }
}
