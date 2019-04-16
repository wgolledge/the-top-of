import React, { useRef, useEffect } from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';

import { minHeightMedia } from '../withRoot';

const useStyles = makeStyles({
  root: {
    flexGrow: 1,
    backgroundColor: '#BBD5ED !important',
  },
  toolbar: {
    flexDirection: 'column',
  },
  text: {
    margin: '0 auto 0 auto',
    display: 'none',
    [minHeightMedia]: {
      display: 'block',
    },
    '&:not(:first-child)': {
      display: 'block',
      marginTop: '4px',
      [minHeightMedia]: {
        marginTop: '-5px',
      },
      fontFamily: `'Pacifico', cursive`,
      fontWeight: 400,
      fontSize: '2rem',
    },
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
        <Toolbar className={classes.toolbar}>
          <Typography
            className={classes.text}
            variant="subtitle2"
            color="secondary"
          >
            Show Me...
          </Typography>
          <Typography className={classes.text} variant="h1" color="primary">
            The Top Of
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
