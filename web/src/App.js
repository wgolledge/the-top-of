import React, { useState } from 'react';
import JssProvider from 'react-jss/lib/JssProvider';
import {
  makeStyles,
  createGenerateClassName,
  ThemeProvider,
} from '@material-ui/styles';
import { createMuiTheme } from '@material-ui/core/styles';

import Header from './components/Header';
import Modal from './components/Modal';

const generateClassName = createGenerateClassName({
  dangerouslyUseGlobalCSS: false,
  productionPrefix: 'c',
});

export const theme = createMuiTheme({
  typography: {
    useNextVariants: true,
  },
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
  },
});

const App = () => {
  const [height, setHeight] = useState(null);

  const classes = useStyles({ height });

  return (
    <JssProvider generateClassName={generateClassName}>
      <ThemeProvider theme={theme}>
        <div className={classes.root}>
          <Header setHeight={setHeight} />
          {height && (
            <div className={classes.main}>
              <Modal />
            </div>
          )}
        </div>
      </ThemeProvider>
    </JssProvider>
  );
};

export default App;
