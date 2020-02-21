import userActions from './user-actions';
import {actionReducer, composeReducer, stateIdentity} from './reducer-utils';

const initialState = {address: '', userName: ''};

const remove = actionReducer(() => initialState);
const stage = actionReducer((state, acton) => acton.user);

export const adminUserReducer = composeReducer(
    remove(userActions.REMOVE),
    stage(userActions.STAGE),
    stateIdentity
)(initialState);
