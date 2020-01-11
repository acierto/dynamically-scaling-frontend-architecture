import {combineReducers} from 'redux';
import {connectRouter} from 'connected-react-router';
import history from '../history';

export const allReducers = combineReducers({
    router: connectRouter(history)
});
