import React, {useEffect, useState} from 'react';
import {useDispatch} from 'react-redux';
import PropTypes from 'prop-types';
import R from 'ramda';
import applicationActions from '../actions/application-actions';

const LoadPlugin = ({bootstrappedPlugins, pluginName, scriptUrl}) => {
    const dispatch = useDispatch();
    const context = {};

    const [loadedPluginName, setLoadedPluginName] = useState();

    useEffect(() => {
        const script = document.createElement('script');
        script.src = scriptUrl;
        script.async = true;
        script.onload = () => {
            setLoadedPluginName(pluginName);
        };
        document.body.appendChild(script);

        return () => {
            if (context.saga) {
                context.saga.cancel();
            }
        };
    }, []);

    if (R.complement(R.isNil)(loadedPluginName)) {
        const {
            component: Component
        } = window[loadedPluginName].default;

        if (R.not(R.includes(loadedPluginName, bootstrappedPlugins))) {
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
