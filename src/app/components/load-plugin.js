import React, {useEffect, useState} from 'react';
import {useDispatch} from 'react-redux';
import PropTypes from 'prop-types';
import R from 'ramda';
import applicationActions from '../actions/application-actions';

const LoadPlugin = (params) => {
    const {bootstrappedPlugins, pluginName, scriptUrl} = params;
    const dispatch = useDispatch();
    const context = {};

    const [loadedPluginName, setLoadedPluginName] = useState();

    useEffect(() => {
        if (R.not(R.includes(pluginName, bootstrappedPlugins))) {
            const script = document.createElement('script');
            script.src = scriptUrl;
            script.async = true;
            script.onload = () => {
                setLoadedPluginName(pluginName);
            };
            document.body.appendChild(script);
        } else {
            setLoadedPluginName(pluginName);
        }

        return () => {
            if (context.saga) {
                context.saga.cancel();
            }
        };
    }, []);

    if (R.complement(R.isNil)(loadedPluginName)) {
        const {
            component: Component,
            reducers,
            saga
        } = window[loadedPluginName].default;

        if (R.not(R.includes(loadedPluginName, bootstrappedPlugins))) {
            if (saga) {
                context.saga = window.dsfaSaga.run(saga);
            }
            if (reducers) {
                window.dsfaReducerRegistry.register(reducers);
            }
            dispatch(applicationActions.pluginBootstrapped(loadedPluginName));
        }
        return <Component/>;
    }

    return <span/>;
};

LoadPlugin.propTypes = {
    bootstrappedPlugins: PropTypes.array.isRequired,
    pluginName: PropTypes.string.isRequired,
    scriptUrl: PropTypes.string.isRequired
};

export default React.memo(LoadPlugin);
