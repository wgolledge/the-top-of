import React from 'react';
import JssProvider from 'react-jss/lib/JssProvider';
import { createGenerateClassName, ThemeProvider } from '@material-ui/styles';
import { createMuiTheme } from '@material-ui/core/styles';

const generateClassName = createGenerateClassName({
  dangerouslyUseGlobalCSS: false,
  productionPrefix: 'c',
});

export const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#78A1BB',
    },
    secondary: {
      main: '#ADA8B6',
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
