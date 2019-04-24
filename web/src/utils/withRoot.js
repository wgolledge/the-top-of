import React from 'react';
import JssProvider from 'react-jss/lib/JssProvider';
import { createGenerateClassName, ThemeProvider } from '@material-ui/styles';
import { createMuiTheme } from '@material-ui/core/styles';

const generateClassName = createGenerateClassName({
  dangerouslyUseGlobalCSS: false,
  productionPrefix: 'c',
});

const headerHeightSmall = 51;
const headerHeightLarge = 64;
const minHeightHeaderExpand = 800;

const minHeightMedia = `@media (min-height:${minHeightHeaderExpand}px)`;

export const theme = createMuiTheme({
  maxWidth: 860,
  mixins: {
    toolbar: {
      minHeight: headerHeightSmall,
      [minHeightMedia]: {
        minHeight: headerHeightLarge,
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
  transitions: {
    easing: {
      easeOut: 'cubic-bezier(.6,0,.6,1)',
    },
  },
  header: {
    headerHeightSmall,
    headerHeightLarge,
    minHeightHeaderExpand,
    minHeightMedia,
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
