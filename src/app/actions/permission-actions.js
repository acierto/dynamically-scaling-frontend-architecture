const TOGGLE = 'permissions/TOGGLE';

export default {
    TOGGLE,
    toggle: (permission) => ({permission, type: TOGGLE})
};
