import {connectRouter} from 'connected-react-router';
import {bootstrapReducer} from './bootstrap-reducer';
import {customPluginsReducer} from './custom-plugins-reducer';
import history from '../history';

export const allReducers = {
    bootstrap: bootstrapReducer,
    customPlugins: customPluginsReducer,
    router: connectRouter(history)
};
