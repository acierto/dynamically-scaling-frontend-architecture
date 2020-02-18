import userActions from '../actions/user-actions';
import {actionReducer, composeReducer, stateIdentity} from './reducer-utils';

const set = actionReducer((state, acton) => acton.users);

export const userReducer = composeReducer(
    set(userActions.SET),
    stateIdentity
)([]);
