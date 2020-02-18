import PropTypes from 'prop-types';

export const usersType = PropTypes.arrayOf(PropTypes.shape({
    _id: PropTypes.string.isRequired,
    address: PropTypes.string.isRequired,
    userName: PropTypes.string.isRequired
}));
