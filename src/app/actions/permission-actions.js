const GRANT = 'permissions/GRANT';
const REVOKE = 'permissions/REVOKE';
const TOGGLE = 'permissions/TOGGLE';

export default {
    GRANT,
    grant: (permission) => ({permission, type: GRANT}),
    REVOKE,
    revoke: (permission) => ({permission, type: REVOKE}),
    TOGGLE,
    toggle: (permission) => ({permission, type: TOGGLE})
};
