import './styles/reset.less';

import React from 'react';
import {render} from 'react-dom';
import {AppContainer} from 'react-hot-loader';
import {Provider} from 'react-redux';
import {Redirect, Route, Switch} from 'react-router';
import {ConnectedRouter} from 'connected-react-router';
import {InfoPage} from './pages/info-page/info-page';
import {HomePage} from './pages/home-page/home-page';
import {App} from './pages/app';
import {store} from './store/plumbing';
import history from './history';

import './styles/dynamically-pluggable-architecture.less';

const redirectHome = () => <Redirect to='/home'/>;

const renderApp = (ComponentsApp) => {
    render(
        <AppContainer>
            <Provider store={store}>
                <ConnectedRouter history={history}>
                    <div>
                        <Route exact={true} path='/' render={redirectHome}/>
                        <ComponentsApp>
                            <Switch>
                                <Route component={InfoPage} exact={true} path='/info'/>
                                <Route component={HomePage} path='/home'/>
                            </Switch>
                        </ComponentsApp>
                    </div>
                </ConnectedRouter>
            </Provider>
        </AppContainer>,
        document.getElementById('root')
    );
};

renderApp(App);

if (module.hot) {
    module.hot.accept(() => {
        renderApp(App);
    });
}
