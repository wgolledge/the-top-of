import React, { useState, useEffect } from 'react';
import { get } from 'axios';
import { makeStyles } from '@material-ui/styles';

import Header from './components/Header';
import Button from './components/Button';

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
  const [text, setText] = useState('...');

  const classes = useStyles({ height });

  useEffect(() => {
    get('http://localhost:8080/').then(({ data }) => setText(data));
  }, []);

  return (
    <div className={classes.root}>
      <Header setHeight={setHeight} />
      {height && (
        <div className={classes.main}>
          <Button text={text} />
        </div>
      )}
    </div>
  );
};

export default App;
