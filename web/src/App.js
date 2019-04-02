import React, { useState } from 'react';
import { makeStyles } from '@material-ui/styles';

import Header from './components/Header';
import Modal from './components/Modal';

const useStyles = makeStyles({
  root: {
    height: '100%',
  },
  main: {
    alignItems: 'center',
    display: 'flex',
    height: props => `calc(100% - ${props.height}px)`,
    justifyContent: 'center',
  },
});

const App = () => {
  const [height, setHeight] = useState(null);

  const classes = useStyles({ height });

  return (
    <div className={classes.root}>
      <Header setHeight={setHeight} />
      {height && (
        <div className={classes.main}>
          <Modal />
        </div>
      )}
    </div>
  );
};

export default App;
