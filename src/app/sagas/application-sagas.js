import {
    all, call, put, select, take, takeEvery
} from 'redux-saga/effects';

import applicationActions from '../actions/application-actions';
import customPluginsActions from '../actions/custom-plugins-actions';
import {selectBootstrapped} from './selectors';

export function* bootstrap() {
    const bootstrapped = yield select(selectBootstrapped);
    if (!bootstrapped) {
        yield put(customPluginsActions.load());
        yield take(customPluginsActions.SET);
    }
}

export function* bootstrapSaga() {
    yield call(bootstrap);
}

export function* applicationSagas() {
    yield all([
        takeEvery(applicationActions.BOOTSTRAP, bootstrapSaga)
    ]);
}
