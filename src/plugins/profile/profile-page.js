import React from 'react';

import './profile-page.less';
import {Button} from "react-bootstrap";

export const ProfilePage = () => {
    const {dispatch} = window.dpaStore;

    const handleOnClick = () => dispatch({
        message: 'That\'s profile page',
        title: 'Profile Page',
        type: 'toastr/SHOW'
    });

    return (
        <div className="profile-page">
            <Button onClick={handleOnClick}>Get info</Button>
        </div>
    );
};
