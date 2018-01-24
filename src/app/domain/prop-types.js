import PropTypes from 'prop-types';

export const signature = {
    name: PropTypes.string.isRequired,
    template: PropTypes.string.isRequired,
    variables: PropTypes.array,
};

export const variables = {
    key: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
    defaultValue: PropTypes.string.isRequired,
    value: PropTypes.string.isRequired
}
