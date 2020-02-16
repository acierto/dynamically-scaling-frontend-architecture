import {
    all,
    call,
    put,
    putResolve,
    takeEvery
} from 'redux-saga/effects';
import customPluginsActions from '../actions/custom-plugins-actions';
import toastrActions, {TOASTR_TYPE} from '../actions/toastr-actions';
import {getPluginsMetadata} from '../resources/api-resource';

export function* loadCustomPluginsSaga() {
    try {
        const {data: {plugins = []}} = yield call(getPluginsMetadata);
        yield putResolve(customPluginsActions.set(plugins));
    } catch (exception) {
        yield put(toastrActions.show('Error', exception, TOASTR_TYPE.error));
    }
}

export function* customPluginSagas() {
    yield all([
        takeEvery(customPluginsActions.LOAD, loadCustomPluginsSaga)
    ]);
}
