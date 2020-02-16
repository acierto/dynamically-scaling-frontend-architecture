import applicationActions from '../actions/application-actions';
import {actionReducer, composeReducer, stateIdentity} from './reducer-utils';

const bootstrapped = actionReducer((state) => ({
    ...state,
    bootstrapped: true
}));

const pluginBootstrapped = actionReducer((state) => ({
    ...state,
    pluginsBootstrapped: true
}));

export const bootstrapReducer = composeReducer(
    bootstrapped(applicationActions.BOOTSTRAPPED),
    pluginBootstrapped(applicationActions.PLUGIN_BOOTSTRAPPED),
    stateIdentity
)({bootstrapped: false, pluginsBootstrapped: false});
