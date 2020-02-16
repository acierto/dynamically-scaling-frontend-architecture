import React, {useEffect, useState} from 'react';
import {useDispatch} from 'react-redux';
import PropTypes from 'prop-types';
import R from 'ramda';
import customPluginActions from '../actions/custom-plugins-actions';

const LoadPlugin = ({bootstrappedPlugins, componentNamespace, scriptUrl}) => {
    const dispatch = useDispatch();
    const context = {};

    const [namespace, setNamespace] = useState();

    useEffect(() => {
        const script = document.createElement('script');
        script.src = scriptUrl;
        script.async = true;
        script.onload = () => {
            setNamespace(componentNamespace);
        };
        document.body.appendChild(script);

        return () => {
            if (context.saga) {
                context.saga.cancel();
            }
        };
    }, []);

    if (R.complement(R.isNil)(namespace)) {
        const {
            component: Component,
            reducers,
            saga
        } = window[namespace].default;

        if (R.not(R.includes(namespace, bootstrappedPlugins))) {
            context.saga = window.xldSaga.run(saga);
            window.dpaReducerRegistry.register(reducers);
            dispatch(customPluginActions.pluginBootstrapped(namespace));
        }
        dispatch(customPluginActions.bootstrapPlugins());
        return <Component/>;
    }

    return <span/>;
};

LoadPlugin.propTypes = {
    bootstrappedPlugins: PropTypes.array.isRequired,
    componentNamespace: PropTypes.string.isRequired,
    scriptUrl: PropTypes.string.isRequired
};

export default React.memo(LoadPlugin);
