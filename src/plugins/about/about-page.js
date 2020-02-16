import React from 'react';

import './about-page.less';
import {Button} from 'react-bootstrap';

export const AboutPage = () => {
    const {dispatch} = window.dpaStore;

    const handleOnClick = () => dispatch({
        message: 'That\'s about page',
        title: 'About Page',
        toastrType: 'info',
        type: 'toastr/SHOW'
    });

    return (
        <div className="about-page">
            <Button onClick={handleOnClick}>Get info</Button>
        </div>
    );
};
