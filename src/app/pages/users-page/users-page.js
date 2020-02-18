import React from 'react';
import R from 'ramda';
import {usersType} from '../../types/users-type';

import './users-page.less';

export const UsersPage = ({users = []}) => {
    const headerRow = () => <tr>
        <th scope="col">#</th>
        <th scope="col">User name</th>
        <th scope="col">Address</th>
    </tr>;

    const header = () => <thead>{headerRow()}</thead>;

    const userRows = () => R.addIndex(R.map)(
        (user, index) =>
            <tr key={user._id}>
                <th scope="row">{index + 1}</th>
                <td>{user.userName}</td>
                <td>{user.address}</td>
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

UsersPage.propTypes = {users: usersType};
