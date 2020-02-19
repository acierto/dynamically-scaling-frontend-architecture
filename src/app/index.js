import './styles/reset.less';
import '@fortawesome/fontawesome-free/css/all.min.css';

import R from 'ramda';
import React from 'react';
import {render} from 'react-dom';
import {AppContainer} from 'react-hot-loader';
import {Provider} from 'react-redux';
import {Redirect, Route} from 'react-router';
import {ConnectedRouter} from 'connected-react-router';
import applicationActions from './actions/application-actions';
import {App} from './pages/app';
import {store} from './store/plumbing';
import history from './history';

import 'react-redux-toastr/lib/css/react-redux-toastr.min.css';

const redirectHome = () => <Redirect to="/home"/>;

store.dispatch(applicationActions.bootstrap());

const renderApp = (ApplicationLayout) => {
    render(
        <AppContainer>
            <Provider store={store}>
                <ConnectedRouter
                    history={history}
                    onLocationChanged={R.F}
                    store={store}>
                    <div>
                        <Route exact={true} path="/" render={redirectHome}/>
                        <ApplicationLayout/>
                    </div>
                </ConnectedRouter>
            </Provider>
        </AppContainer>,
        document.getElementById('root')
    );
};

renderApp(App);
