import R from 'ramda';
import permissionActions from '../actions/permission-actions';
import {actionReducer, composeReducer, stateIdentity} from './reducer-utils';

const toggle = actionReducer((state, action) => R.reduce((acc, permission) => {
    if (R.equals(R.path(['permission', 'name'], action), R.prop('name', permission))) {
        return [...acc, {...permission, enabled: !permission.enabled}];
    }
    return [...acc, permission];
}, [], state));

export const permissionReducer = composeReducer(
    toggle(permissionActions.TOGGLE),
    stateIdentity
)([{
    enabled: true,
    label: 'Allow to remove users',
    name: 'allow-remove-users'
}, {
    enabled: true,
    label: 'Allow to view admin panel',
    name: 'allow-view-admin-panel'
}]);
