import React from 'react';
import {useDispatch} from 'react-redux';
import toastrActions from '../../actions/toastr-actions';

import './home-page.less';
import {Button} from "react-bootstrap";

export const HomePage = () => {
    const dispatch = useDispatch();

    const handleOnClick = () => dispatch(toastrActions.show('Home Page',
        'That is the main application page.'));

    return <div className="home-page">
        <Button onClick={handleOnClick}>Get info</Button>
    </div>;
};
