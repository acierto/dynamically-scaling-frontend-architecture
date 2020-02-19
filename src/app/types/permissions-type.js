import PropTypes from 'prop-types';

export const permissionsType = PropTypes.arrayOf(PropTypes.shape({
    enabled: PropTypes.bool.isRequired,
    label: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired
}));
