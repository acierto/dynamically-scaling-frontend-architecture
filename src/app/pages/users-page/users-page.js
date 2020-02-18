import React from 'react';
import {useDispatch} from 'react-redux';
import {Button} from 'react-bootstrap';
import toastrActions from '../../actions/toastr-actions';

import './users-page.less';

export const UsersPage = () => {
    const dispatch = useDispatch();

    const handleOnClick = () => dispatch(toastrActions.show('Users Page',
        'That page consists the information about this site.'));

    return <div className="users-page">
        <Button onClick={handleOnClick}>Get info</Button>
    </div>;
};
