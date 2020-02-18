import {connectRouter} from 'connected-react-router';
import {reducer as toastrReducer} from 'react-redux-toastr';
import history from '../history';
import {bootstrapReducer} from './bootstrap-reducer';
import {customPluginsReducer} from './custom-plugins-reducer';
import {userReducer} from './user-reducer';

export const allReducers = {
    bootstrap: bootstrapReducer,
    customPlugins: customPluginsReducer,
    router: connectRouter(history),
    toastr: toastrReducer,
    users: userReducer
};
