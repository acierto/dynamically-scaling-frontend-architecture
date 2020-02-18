import React from 'react';
import {Jumbotron} from 'react-bootstrap';

import './home-page.less';

export const HomePage = () =>
    <div className="home-page">
        <Jumbotron>
            <h1>UMS</h1>
            <p>UMS - User management system.</p>
            <p>With the help of this system you can manager your users.</p>
        </Jumbotron>
    </div>;
