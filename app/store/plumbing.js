import history from '../history';
import {configureStore} from './configure-store';

export const store = configureStore(history);
