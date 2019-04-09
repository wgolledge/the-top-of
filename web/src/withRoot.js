import React from 'react';
import JssProvider from 'react-jss/lib/JssProvider';
import { createGenerateClassName, ThemeProvider } from '@material-ui/styles';
import { createMuiTheme } from '@material-ui/core/styles';
import green from '@material-ui/core/colors/green';
import grey from '@material-ui/core/colors/grey';

const generateClassName = createGenerateClassName({
  dangerouslyUseGlobalCSS: false,
  productionPrefix: 'c',
});

const theme = createMuiTheme({
  palette: {
    primary: {
      light: green[400],
      main: green[600],
      dark: green[700],
    },
    secondary: {
      light: grey[300],
      main: grey[500],
      dark: grey[700],
    },
  },
});

const withRoot = Component => {
  const WithRoot = props => (
    <JssProvider generateClassName={generateClassName}>
      <ThemeProvider theme={theme}>
        <Component {...props} />
      </ThemeProvider>
    </JssProvider>
  );

  return WithRoot;
};

export default withRoot;
