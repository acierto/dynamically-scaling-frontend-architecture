import {connectRouter} from 'connected-react-router';
import {reducer as toastrReducer} from 'react-redux-toastr';
import history from '../history';
import {bootstrapReducer} from './bootstrap-reducer';
import {customModulesReducer} from './custom-modules-reducer';
import {userReducer} from './user-reducer';
import {permissionReducer} from './permission-reducer';

export const allReducers = {
    bootstrap: bootstrapReducer,
    customModules: customModulesReducer,
    permissions: permissionReducer,
    router: connectRouter(history),
    toastr: toastrReducer,
    users: userReducer
};
