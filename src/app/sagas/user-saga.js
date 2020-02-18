import {all, call, put, takeEvery} from 'redux-saga/effects';
import userActions from '../actions/user-actions';
import {addUser, listUsers} from '../resources/api-resource';

export function* addUserSaga({user}) {
    yield addUser(user);
}

export function* listUsersSaga({page}) {
    return yield listUsers(page);
}

export function* loadUsersSaga() {
    const {data: {payload}} = yield call(listUsers);
    yield put(userActions.set(payload));
}

export function* userSagas() {
    yield all([
        takeEvery(userActions.ADD, addUserSaga),
        takeEvery(userActions.LIST, listUsersSaga),
        takeEvery(userActions.LOAD, loadUsersSaga)
    ]);
}
