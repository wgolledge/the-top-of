import React, { useState } from 'react';
import { makeStyles, useTheme } from '@material-ui/styles';

import withRoot from '../utils/withRoot';
import Header from '../components/Header';
import Body from '../components/Body';

// eslint-disable-next-line global-require
export const history = require('history').createBrowserHistory();

const IS_FRESH_LOAD = history.length < 3;

const useStyles = makeStyles({
  root: {
    height: '100%',
    overflow: 'hidden',
    position: 'absolute',
    width: '100%',
  },
  main: {
    alignItems: 'center',
    display: 'flex',
    height: props => `calc(100% - ${props.height}px)`,
    justifyContent: 'center',
    margin: 'auto',
    maxWidth: props => props.theme.maxWidth,
    position: 'relative',
  },
});

const Index = () => {
  const [height, setHeight] = useState(null);

  const classes = useStyles({ height, theme: useTheme() });

  return (
    <div className={classes.root}>
      <Header setHeight={setHeight} />
      {height && (
        <div className={classes.main}>
          <Body isFreshLoad={IS_FRESH_LOAD} />
        </div>
      )}
    </div>
  );
};

export default withRoot(Index);
