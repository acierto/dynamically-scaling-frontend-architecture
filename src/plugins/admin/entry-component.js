import {Provider} from 'react-redux';
import React from 'react';
import AdminPage from './admin-page';

export const EntryComponent = () =>
    <Provider store={window.dsfaStore}>
        <div className="admin-page">
            <AdminPage/>
        </div>
    </Provider>;
