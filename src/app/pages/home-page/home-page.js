import React from 'react';
import {useDispatch} from 'react-redux';
import {Button} from 'react-bootstrap';
import toastrActions, {TOASTR_TYPE} from '../../actions/toastr-actions';

import './home-page.less';

export const HomePage = () => {
    const dispatch = useDispatch();

    const handleOnClick = () => dispatch(toastrActions.show('Home Page',
        'That is the main application page.', TOASTR_TYPE.success));

    return <div className="home-page">
        <Button onClick={handleOnClick}>Get info</Button>
    </div>;
};
