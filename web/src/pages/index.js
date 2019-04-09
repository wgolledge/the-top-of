import React, { useState } from 'react';
import { makeStyles } from '@material-ui/styles';

import withRoot from '../withRoot';
import Header from '../components/Header';
import Body from '../components/Body';

const useStyles = makeStyles({
  root: {
    height: '100%',
  },
  main: {
    alignItems: 'center',
    display: 'flex',
    height: props => `calc(100% - ${props.height}px)`,
    justifyContent: 'center',
    margin: 'auto',
    maxWidth: '860px',
  },
});

const Index = () => {
  const [height, setHeight] = useState(null);

  const classes = useStyles({ height });

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
