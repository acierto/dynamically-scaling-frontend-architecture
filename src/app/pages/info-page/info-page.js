import React from 'react';
import {useDispatch} from 'react-redux';
import {Button} from 'react-bootstrap';
import toastrActions, {TOASTR_TYPE} from '../../actions/toastr-actions';

import './info-page.less';

export const InfoPage = () => {
    const dispatch = useDispatch();

    const handleOnClick = () => dispatch(toastrActions.show('Info Page',
        'That page consists the information about this site.', TOASTR_TYPE.success));

    return <div className="info-page">
        <Button onClick={handleOnClick}>Get info</Button>
    </div>;
};
