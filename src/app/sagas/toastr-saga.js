import {all, put, takeEvery} from 'redux-saga/effects';
import {actions as toastr} from 'react-redux-toastr';
import toastrActions, {TOASTR_TYPE} from '../actions/toastr-actions';

const addToastr = (title, message, options, toastrType) =>
    toastr.add({
        message,
        options,
        title,
        type: toastrType
    });

export function* showToastr({title, message, toastrType = TOASTR_TYPE.success}) {
    yield put(addToastr(title, message, {timeOut: 5000}, toastrType));
}

export function* toastrSagas() {
    yield all([
        takeEvery(toastrActions.SHOW, showToastr)
    ]);
}
