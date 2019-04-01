import React from 'react';
import Button from '@material-ui/core/Button';
import PropTypes from 'prop-types';

const button = ({ text, onClick }) => (
  <Button onClick={onClick} variant="contained" color="primary" size="large">
    {text}
  </Button>
);

button.propTypes = {
  text: PropTypes.string.isRequired,
  onClick: PropTypes.func,
};

button.defaultProps = {
  onClick: undefined,
};

export default button;
