import React from 'react';
import {useDispatch} from 'react-redux';
import toastrActions from '../../actions/toastr-actions';

import './info-page.less';
import {Button} from "react-bootstrap";

export const InfoPage = () => {
    const dispatch = useDispatch();

    const handleOnClick = () => dispatch(toastrActions.show('title', 'message'));

    return <div className="info-page">
        <Button onClick={handleOnClick}>Get info</Button>
    </div>;
};
