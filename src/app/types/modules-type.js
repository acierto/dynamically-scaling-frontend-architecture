import PropTypes from 'prop-types';

export const modulesType = PropTypes.arrayOf(PropTypes.shape({
    entry: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    options: PropTypes.shape({
        tab: PropTypes.shape({
            title: PropTypes.string.isRequired,
            weight: PropTypes.number
        })
    })
}));
