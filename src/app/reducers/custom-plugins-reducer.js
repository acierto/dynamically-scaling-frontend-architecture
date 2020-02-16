import customPluginsActions from '../actions/custom-plugins-actions';
import {actionReducer, composeReducer, stateIdentity} from './reducer-utils';

const set = actionReducer((state, acton) => acton.extensions);

export const customPluginsReducer = composeReducer(
    set(customPluginsActions.SET),
    stateIdentity
)([]);
