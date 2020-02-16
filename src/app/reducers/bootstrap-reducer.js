import systemActions from '../actions/application-actions';
import {actionReducer, composeReducer, stateIdentity} from './reducer-utils';

const bootstrapped = actionReducer((state) => ({
    ...state,
    bootstrapped: true
}));

const pluginBootstrapped = actionReducer((state, action) => ({
    ...state,
    bootstrappedPlugins: [...state.bootstrappedPlugins, action.plugin]
}));

export const bootstrapReducer = composeReducer(
    bootstrapped(systemActions.BOOTSTRAPPED),
    pluginBootstrapped(systemActions.PLUGIN_BOOTSTRAPPED),
    stateIdentity
)({bootstrapped: false, bootstrappedPlugins: []});
