import React, { useRef, useEffect } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';

const styles = {
  root: {
    flexGrow: 1,
  },
  text: {
    margin: 'auto',
  },
};

const Header = props => {
  const ref = useRef(null);
  const { classes } = props;

  useEffect(() => {
    props.setHeight(ref.current.clientHeight);
  }, []);

  return (
    <div className={classes.root} ref={ref}>
      <AppBar position="static" color="default">
        <Toolbar>
          <Typography className={classes.text} variant="h6" color="inherit">
            Show Me...
          </Typography>
        </Toolbar>
      </AppBar>
    </div>
  );
};

Header.propTypes = {
  classes: PropTypes.shape().isRequired,
  setHeight: PropTypes.func.isRequired,
};

export default withStyles(styles)(Header);
