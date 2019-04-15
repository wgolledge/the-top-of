import React from 'react';
import { makeStyles, useTheme } from '@material-ui/styles';
import CircularProgress from '@material-ui/core/CircularProgress';

const useStyles = makeStyles(theme => ({
  root: {
    height: '100%',
    width: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  progress: {
    margin: theme.spacing(2),
  },
}));

const Loader = () => {
  const classes = useStyles(useTheme());

  return (
    <div className={classes.root} data-testid="loading-spinner">
      <CircularProgress className={classes.progress} color="primary" />
    </div>
  );
};

export default Loader;
