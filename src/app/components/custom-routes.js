import R from 'ramda';
import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';
import {Route} from "react-router";
import ErrorBoundary from '../components/error-boundary-component';
import LoadPlugin from '../components/load-plugin';

export default class CustomRoutes extends PureComponent {
    static propTypes = {
        plugins: PropTypes.arrayOf(PropTypes.shape({
            entry: PropTypes.string.isRequired,
            name: PropTypes.string.isRequired
        }))
    };

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
