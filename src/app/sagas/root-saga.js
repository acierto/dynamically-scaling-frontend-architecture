import {all, call} from 'redux-saga/effects';
import {applicationSagas} from './application-sagas';
import {customPluginSagas} from './custom-plugins-saga';
import {toastrSagas} from './toastr-saga';
import {userSagas} from './user-saga';

export function* rootSaga() {
    while (true) {
        yield all([
            call(applicationSagas),
            call(customPluginSagas),
            call(toastrSagas),
            call(userSagas)
        ]);
    }
}
