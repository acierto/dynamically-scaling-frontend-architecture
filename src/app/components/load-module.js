import React, {useEffect, useState} from 'react';
import {useDispatch} from 'react-redux';
import PropTypes from 'prop-types';
import R from 'ramda';
import applicationActions from '../actions/application-actions';

const LoadModule = (params) => {
    const {bootstrappedModules, moduleName, scriptUrl} = params;
    const dispatch = useDispatch();
    const context = {};

    const [loadedModuleName, setLoadedModuleName] = useState();

    useEffect(() => {
        if (R.not(R.includes(moduleName, bootstrappedModules))) {
            const script = document.createElement('script');
            script.src = scriptUrl;
            script.async = true;
            script.onload = () => {
                setLoadedModuleName(moduleName);
            };
            document.body.appendChild(script);
        } else {
            setLoadedModuleName(moduleName);
        }

        return () => {
            if (context.saga) {
                context.saga.cancel();
            }
        };
    }, []);

    if (R.complement(R.isNil)(loadedModuleName)) {
        const {
            component: Component,
            reducers,
            saga
        } = window[loadedModuleName].default;

        if (R.not(R.includes(loadedModuleName, bootstrappedModules))) {
            if (saga) {
                context.saga = window.dsfaSaga.run(saga);
            }
            if (reducers) {
                window.dsfaReducerRegistry.register(reducers);
            }
            dispatch(applicationActions.moduleBootstrapped(loadedModuleName));
        }
        return <Component/>;
    }

    return <span/>;
};

LoadModule.propTypes = {
    bootstrappedModules: PropTypes.array.isRequired,
    moduleName: PropTypes.string.isRequired,
    scriptUrl: PropTypes.string.isRequired
};

export default React.memo(LoadModule);
