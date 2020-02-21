import systemActions from '../actions/application-actions';
import {actionReducer, composeReducer, stateIdentity} from './reducer-utils';

const bootstrapped = actionReducer((state) => ({
    ...state,
    bootstrapped: true
}));

const moduleBootstrapped = actionReducer((state, action) => ({
    ...state,
    bootstrappedModules: [...state.bootstrappedModules, action.module]
}));

export const bootstrapReducer = composeReducer(
    bootstrapped(systemActions.BOOTSTRAPPED),
    moduleBootstrapped(systemActions.MODULE_BOOTSTRAPPED),
    stateIdentity
)({bootstrapped: false, bootstrappedModules: []});
