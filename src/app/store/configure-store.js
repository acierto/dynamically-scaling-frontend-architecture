import log from 'loglevel';
import {applyMiddleware, createStore} from 'redux';
import createSagaMiddleware from 'redux-saga';
import {routerMiddleware} from 'connected-react-router';
import {composeWithDevTools} from 'redux-devtools-extension/developmentOnly';
import {createLogger} from 'redux-logger';
import {allReducers} from '../reducers';
import {rootReducer} from '../reducers/root-reducer';
import {rootSaga} from '../sagas/root-saga';

log.setDefaultLevel(log.levels.DEBUG);

const sagaMiddleware = createSagaMiddleware();

let middlewareList = [sagaMiddleware];
if (process.env.NODE_ENV === 'development') {
    const logger = createLogger({collapsed: true, diff: false, duration: true});
    middlewareList = [...middlewareList, logger];
}

export const configureStore = (history) => {
    return createStore(
        (state, action) => allReducers(rootReducer(state, action), action),
        composeWithDevTools(applyMiddleware(...[...middlewareList, routerMiddleware(history)]))
    );
};

export const runSaga = () => sagaMiddleware.run(rootSaga);
