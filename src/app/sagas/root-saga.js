import {all, call} from 'redux-saga/effects';
import {applicationSagas} from './application-sagas';
import {customModuleSagas} from './custom-modules-saga';
import {toastrSagas} from './toastr-saga';
import {userSagas} from './user-saga';

export function* rootSaga() {
    while (true) {
        yield all([
            call(applicationSagas),
            call(customModuleSagas),
            call(toastrSagas),
            call(userSagas)
        ]);
    }
}
