import React from 'react';
import R from 'ramda';
import {useDispatch} from 'react-redux';
import PropTypes from 'prop-types';
import {usersType} from '../../types/users-type';
import userActions from '../../actions/user-actions';

import './users-page.less';

export const UsersPage = ({allowToRemoveUsers = false, users = []}) => {
    const dispatch = useDispatch();

    const headerRow = () => <tr>
        <th scope="col">#</th>
        <th scope="col">User name</th>
        <th scope="col">Address</th>
        {allowToRemoveUsers && <th scope="col"/>}
    </tr>;

    const header = () => <thead>{headerRow()}</thead>;

    const handleRemoveUser = (id) => () => dispatch(userActions.remove(id));

    const userRows = () => R.addIndex(R.map)(
        (user, index) =>
            <tr key={user._id}>
                <th scope="row">{index + 1}</th>
                <td>{user.userName}</td>
                <td>{user.address}</td>
                {allowToRemoveUsers && <td>
                    <i className="fas fa-trash" onClick={handleRemoveUser(user._id)}/>
                </td>
                }
            </tr>,
        users);

    return (
        <div className="users-page">
            <table className="table table-hover">
                {header()}
                <tbody>{userRows()}</tbody>
            </table>
        </div>
    );
};

UsersPage.propTypes = {
    allowToRemoveUsers: PropTypes.bool.isRequired,
    users: usersType
};
