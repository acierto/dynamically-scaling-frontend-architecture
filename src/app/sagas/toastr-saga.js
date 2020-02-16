import {all, put, takeEvery} from 'redux-saga/effects';
import {actions as toastr} from 'react-redux-toastr';
import toastrActions from "../actions/toastr-actions";

export const TOASTR_TYPE = {
    error: 'error',
    info: 'info',
    success: 'success',
    warning: 'warning'
};

const addToastr = (title, message, options, toastrType) =>
    toastr.add({
        message,
        options,
        title,
        type: toastrType
    });

export function* showToastr({title, message}) {
    yield put(addToastr(title, message, {timeOut: 5000}, TOASTR_TYPE.success));
}

export function* toastrSagas() {
    yield all([
        takeEvery(toastrActions.SHOW, showToastr)
    ]);
}
