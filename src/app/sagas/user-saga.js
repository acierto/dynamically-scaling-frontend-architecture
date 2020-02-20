import {all, call, put, takeEvery} from 'redux-saga/effects';
import userActions from '../actions/user-actions';
import {addUser, listUsers, removeUser} from '../resources/api-resource';

export function* loadUsersSaga() {
    const {data: {payload}} = yield call(listUsers);
    yield put(userActions.set(payload));
}

export function* addUserSaga({user}) {
    yield addUser(user);
    yield call(loadUsersSaga);
}

export function* removeUserSaga({id}) {
    yield removeUser(id);
    yield call(loadUsersSaga);
}

export function* listUsersSaga({page}) {
    return yield listUsers(page);
}

export function* userSagas() {
    yield all([
        takeEvery(userActions.ADD, addUserSaga),
        takeEvery(userActions.LIST, listUsersSaga),
        takeEvery(userActions.LOAD, loadUsersSaga),
        takeEvery(userActions.REMOVE, removeUserSaga)
    ]);
}
