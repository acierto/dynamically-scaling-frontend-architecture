import {Provider} from 'react-redux';
import React from 'react';
import SettingsPage from './settings-page';

export const EntryComponent = () =>
    <Provider store={window.dpaStore}>
        <div className="settings-page">
            <SettingsPage/>
        </div>
    </Provider>;
