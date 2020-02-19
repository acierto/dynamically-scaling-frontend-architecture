import R from 'ramda';
import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';
import './settings-page.less';
import {Form} from 'react-bootstrap';
import {connect} from 'react-redux';

const mapStateToProps = (state) => ({permissions: state.permissions});

const mapDispatchToProps = (dispatch) => ({
    togglePermission: (permission) => dispatch({
        permission,
        type: 'permissions/TOGGLE'
    })
});

@connect(mapStateToProps, mapDispatchToProps)
export default class SettingsPage extends PureComponent {
    static propTypes = {
        permissions: PropTypes.arrayOf(PropTypes.shape({
            enabled: PropTypes.bool.isRequired,
            label: PropTypes.string.isRequired,
            name: PropTypes.string.isRequired
        })),
        togglePermission: PropTypes.func
    };

    handlePermissionToggle = (permission) => () => this.props.togglePermission(permission);

    render() {
        const {permissions} = this.props;

        return (
            <div className="settings-page">
                <Form>
                    {R.map((permission) => <Form.Check
                        checked={permission.enabled}
                        id={permission.name}
                        key={permission.name}
                        label={permission.label}
                        onChange={this.handlePermissionToggle(permission)}
                        type="switch"
                    />, permissions)}
                </Form>
            </div>
        );
    }
}
