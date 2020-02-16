import {combineReducers} from 'redux';
import {connectRouter} from 'connected-react-router';
import {bootstrapReducer} from './bootstrap-reducer';
import history from '../history';

export const allReducers = combineReducers({
    bootstrap: bootstrapReducer,
    router: connectRouter(history)
});
