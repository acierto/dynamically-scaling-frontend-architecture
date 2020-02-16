import {all, call, putResolve, takeEvery} from 'redux-saga/effects';
import customPluginsActions from '../actions/custom-plugins-actions';
import {getPluginsMetadata} from '../resources/api-resource';

export function* loadCustomPluginsSaga() {
    try {
        const {data: {plugins = []}} = yield call(getPluginsMetadata);
        yield putResolve(customPluginsActions.set(plugins));
    } catch (exception) {
        console.log(exception);
    }
}

export function* customPluginSagas() {
    yield all([
        takeEvery(customPluginsActions.LOAD, loadCustomPluginsSaga)
    ]);
}
