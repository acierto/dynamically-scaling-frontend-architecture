import {
    all,
    call,
    put,
    putResolve,
    takeEvery
} from 'redux-saga/effects';
import customModulesActions from '../actions/custom-modules-actions';
import toastrActions, {TOASTR_TYPE} from '../actions/toastr-actions';
import {getModulesMetadata} from '../resources/api-resource';

export function* loadCustomModulesSaga() {
    try {
        const {data: {modules = []}} = yield call(getModulesMetadata);
        yield putResolve(customModulesActions.set(modules));
    } catch (exception) {
        yield put(toastrActions.show('Error', exception, TOASTR_TYPE.error));
    }
}

export function* customModuleSagas() {
    yield all([
        takeEvery(customModulesActions.LOAD, loadCustomModulesSaga)
    ]);
}
