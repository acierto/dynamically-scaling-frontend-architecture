import history from '../history';
import {configureStore, runSaga} from './configure-store';

export const store = configureStore(history);
runSaga();
