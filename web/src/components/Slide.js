import React, { useMemo, memo } from 'react';
import MuiSlide from '@material-ui/core/Slide';
import PropTypes from 'prop-types';

export const Slide = memo(({ children, direction, ...rest }) => {
  const slideSettings = useMemo(
    () => ({
      direction,
      mountOnEnter: true,
      timeout: { enter: 180, exit: 180 },
      unmountOnExit: true,
    }),
    [direction],
  );

  return (
    <MuiSlide {...slideSettings} {...rest}>
      {children}
    </MuiSlide>
  );
});

Slide.propTypes = {
  children: PropTypes.node.isRequired,
  direction: PropTypes.oneOf(['up', 'down']).isRequired,
};
