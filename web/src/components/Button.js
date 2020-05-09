import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const StyledButton = styled.button`
  background-color: ${p => p.theme.palette.background.paper};
  border: none;
  color: ${p => p.theme.palette.primary.main};
  cursor: pointer;
  outline: none;
  font-size: 0.9rem;
  font-weight: 500;
  padding: 0.5rem 0;
  letter-spacing: 1px;
  text-transform: uppercase;
  transition: all 280ms ease-in-out;
  &:hover {
    letter-spacing: 1.3px;
  }
`;

const Button = ({ children, onClick }) => (
  <StyledButton onClick={onClick}>{children}</StyledButton>
);

Button.propTypes = {
  children: PropTypes.node.isRequired,
  onClick: PropTypes.func,
};

Button.defaultProps = {
  onClick: undefined,
};

export default Button;
