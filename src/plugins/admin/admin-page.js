import React, {useState} from 'react';
import R from 'ramda';

import './admin-page.less';
import {Button, Form} from 'react-bootstrap';

export const AdminPage = () => {
    const {dispatch} = window.dpaStore;

    const [address = '', setAddress] = useState();
    const [userName = '', setUserName] = useState();

    const registerUser = (event) => {
        event.preventDefault();
        dispatch({
            type: 'user/ADD',
            user: {
                address,
                userName
            }
        });
    };

    const toHandler = R.curry((fnName, event) => fnName(event.target.value));

    return (
        <div className="admin-page">
            <Form onSubmit={registerUser}>
                <Form.Group controlId="formUsername" role="form">
                    <Form.Label>User name</Form.Label>
                    <Form.Control
                        onChange={toHandler(setUserName)}
                        placeholder="User name"
                        type="text"
                        value={userName}
                    />
                </Form.Group>

                <Form.Group controlId="formAddress" role="form">
                    <Form.Label>Address</Form.Label>
                    <Form.Control
                        onChange={toHandler(setAddress)}
                        placeholder="Address"
                        type="text"
                        value={address}
                    />
                </Form.Group>

                <Button type="submit" variant="primary">
                    Register
                </Button>
            </Form>
        </div>
    );
};
