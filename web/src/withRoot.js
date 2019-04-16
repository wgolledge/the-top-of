import React from 'react';
import JssProvider from 'react-jss/lib/JssProvider';
import { createGenerateClassName, ThemeProvider } from '@material-ui/styles';
import { createMuiTheme } from '@material-ui/core/styles';

const generateClassName = createGenerateClassName({
  dangerouslyUseGlobalCSS: false,
  productionPrefix: 'c',
});

export const minHeightMedia = '@media (min-height:800px)';

export const theme = createMuiTheme({
  mixins: {
    toolbar: {
      minHeight: 51,
      [minHeightMedia]: {
        minHeight: 64,
      },
    },
  },
  palette: {
    primary: {
      light: '#BBD5ED',
      main: '#78A1BB',
      dark: '#445E93',
    },
    secondary: {
      main: '#9E9AA7',
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
