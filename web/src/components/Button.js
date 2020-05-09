import React from 'react';
import PropTypes from 'prop-types';

const Button = ({ text, onClick }) => (
  <button onClick={onClick} variant="contained" color="primary" size="large">
    {text}
  </button>
);

Button.propTypes = {
  text: PropTypes.string.isRequired,
  onClick: PropTypes.func,
};

Button.defaultProps = {
  onClick: undefined,
};

export default Button;
