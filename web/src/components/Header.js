import React, { useRef, useEffect } from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles({
  root: {
    flexGrow: 1,
  },
  text: {
    margin: 'auto !important',
  },
});

const Header = props => {
  const ref = useRef(null);
  const classes = useStyles();

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
  setHeight: PropTypes.func.isRequired,
};

export default Header;
