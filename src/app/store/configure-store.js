import R from 'ramda';
import log from 'loglevel';
import {applyMiddleware, combineReducers, createStore} from 'redux';
import createSagaMiddleware from 'redux-saga';
import {routerMiddleware} from 'connected-react-router';
import {composeWithDevTools} from 'redux-devtools-extension/developmentOnly';
import {createLogger} from 'redux-logger';
import {allReducers} from '../reducers';
import {rootReducer} from '../reducers/root-reducer';
import {rootSaga} from '../sagas/root-saga';
import {ReducerRegistry} from './reducer-registry';

log.setDefaultLevel(log.levels.DEBUG);

const sagaMiddleware = createSagaMiddleware();
window.dsfaSaga = sagaMiddleware;

export const reducerRegistry = new ReducerRegistry(allReducers);
window.dsfaReducerRegistry = reducerRegistry;

let middlewareList = [sagaMiddleware];
if (process.env.NODE_ENV === 'development') {
    const logger = createLogger({collapsed: true, diff: false, duration: true});
    middlewareList = [...middlewareList, logger];
}

const configureReducers = (reducers) =>
    (state, action) => combineReducers(reducers)(rootReducer(state, action), action);

const createStoreWithMiddleware = R.curry((history) =>
    composeWithDevTools(applyMiddleware(...[...middlewareList, routerMiddleware(history)]))(createStore));

export const configureStore = (history) => {
    const mainReducer = configureReducers(reducerRegistry.getReducers());
    const store = createStoreWithMiddleware(history)(mainReducer);

    reducerRegistry.setChangeListener((reducers) => {
        store.replaceReducer(configureReducers(reducers));
    });
    window.dsfaStore = store;
    return store;
};

export const runSaga = () => sagaMiddleware.run(rootSaga);
