import {all, call, putResolve, takeEvery} from 'redux-saga/effects';
import customPluginsActions from '../actions/custom-plugins-actions';
import {getPluginsMetadata} from '../resources/api-resource';

export function* loadCustomPluginsSaga() {
    try {
        const {data} = yield call(getPluginsMetadata);
        yield putResolve(customPluginsActions.set(data));
        //TODO: append new custom plugins to navigation bar
    } catch (exception) {
        console.log(exception);
    }
}

export function* customPluginSagas() {
    yield all([
        takeEvery(customPluginsActions.LOAD, loadCustomPluginsSaga)
    ]);
}
