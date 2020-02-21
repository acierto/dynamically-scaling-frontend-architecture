import action from '../actions/custom-modules-actions';
import {actionReducer, composeReducer, stateIdentity} from './reducer-utils';

const set = actionReducer((state, acton) => acton.modules);

export const customModulesReducer = composeReducer(
    set(action.SET),
    stateIdentity
)([]);
