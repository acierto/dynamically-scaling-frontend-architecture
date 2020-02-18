import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';
import R from 'ramda';
import {connect} from 'react-redux';
import './admin-page.less';
import {Button, Form} from 'react-bootstrap';
import userActions from './user-actions';

const mapStateToProps = (state) => ({user: state.adminUser});

const mapDispatchToProps = (dispatch) => ({
    registerUser: (user) => {
        dispatch(userActions.remove());
        dispatch({type: 'user/ADD', user});
        dispatch({
            message: `User ${user.userName} has been created.`,
            title: 'Successful',
            toastrType: 'success',
            type: 'toastr/SHOW'
        });
    },
    stageUser: (user) => dispatch(userActions.stage(user))
});

@connect(mapStateToProps, mapDispatchToProps)
export default class AdminPage extends PureComponent {
    static propTypes = {
        registerUser: PropTypes.func,
        stageUser: PropTypes.func,
        user: PropTypes.shape({
            address: PropTypes.string,
            userName: PropTypes.string
        })
    };

    static defaultProps = {user: {}};

    onRegisterUser = (event) => {
        event.preventDefault();
        const {registerUser, user} = this.props;

        registerUser(user);
    };

    onPropertyChange = R.curry((fieldName, event) => this.props.stageUser(
        {
            ...this.props.user,
            [fieldName]: event.target.value
        }
    ));

    hasEmptyFields = () => {
        const {user: {address, userName}} = this.props;
        return R.isEmpty(address) || R.isEmpty(userName);
    };

    getSubmitVariant = () => this.hasEmptyFields() ? 'secondary' : 'primary';

    render() {
        const {
            user: {
                address,
                userName
            }
        } = this.props;

        return (
            <Form onSubmit={this.onRegisterUser}>
                <Form.Group controlId="formUsername" role="form">
                    <Form.Label>User name</Form.Label>
                    <Form.Control
                        onChange={this.onPropertyChange('userName')}
                        placeholder="User name"
                        type="text"
                        value={userName}
                    />
                </Form.Group>

                <Form.Group controlId="formAddress" role="form">
                    <Form.Label>Address</Form.Label>
                    <Form.Control
                        onChange={this.onPropertyChange('address')}
                        placeholder="Address"
                        type="text"
                        value={address}
                    />
                </Form.Group>

                <Button disabled={this.hasEmptyFields()} type="submit" variant={this.getSubmitVariant()}>
                    Register
                </Button>
            </Form>
        );
    }
}
