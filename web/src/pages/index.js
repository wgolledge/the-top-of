import React, { useState } from 'react';
import { makeStyles, useTheme } from '@material-ui/styles';

import withRoot from '../utils/withRoot';
import Header from '../components/Header';
import Body from '../components/Body';

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
          <Body />
        </div>
      )}
    </div>
  );
};

export default withRoot(Index);
