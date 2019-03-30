import React from 'react';
import Button from '@material-ui/core/Button';
import PropTypes from 'prop-types';

const button = ({ text }) => (
  <Button variant="contained" color="primary">
    {text}
  </Button>
);

button.propTypes = {
  text: PropTypes.string.isRequired,
};

export default button;
