import React, { useState } from 'react';
import JssProvider from 'react-jss/lib/JssProvider';
import { makeStyles, createGenerateClassName } from '@material-ui/styles';

import Header from './components/Header';
import Body from './components/Body';
import Modal from './components/Modal';
import SourceCard from './components/SourceCard';
import Button from './components/Button';

const generateClassName = createGenerateClassName({
  dangerouslyUseGlobalCSS: false,
  productionPrefix: 'c',
});

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
    maxWidth: '1000px',
    width: '95%',
  },
});

const App = () => {
  const [height, setHeight] = useState(null);

  const classes = useStyles({ height });

  return (
    <JssProvider generateClassName={generateClassName}>
      <div className={classes.root}>
        <Header setHeight={setHeight} />
        <div className={classes.main}>{height && <Body />}</div>
      </div>
    </JssProvider>
  );
};

export default App;
