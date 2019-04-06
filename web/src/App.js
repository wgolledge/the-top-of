import React, { useState } from 'react';
import JssProvider from 'react-jss/lib/JssProvider';
import {
  makeStyles,
  createGenerateClassName,
  ThemeProvider,
} from '@material-ui/styles';
import { createMuiTheme } from '@material-ui/core/styles';

import Header from './components/Header';
import Body from './components/Body';

const generateClassName = createGenerateClassName({
  dangerouslyUseGlobalCSS: false,
  productionPrefix: 'c',
});

console.log(createMuiTheme());

export const theme = createMuiTheme();

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
    width: '95%',
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
              <Body />
            </div>
          )}
        </div>
      </ThemeProvider>
    </JssProvider>
  );
};

export default App;
