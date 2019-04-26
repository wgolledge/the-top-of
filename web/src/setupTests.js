import 'react-testing-library/cleanup-after-each';
import 'jest-dom/extend-expect';

import React from 'react';
import { render } from 'react-testing-library';
import { ThemeProvider } from '@material-ui/styles';

import { theme } from './utils/withRoot';

global.renderWithTheme = (ui, options) => {
  // eslint-disable-next-line react/prop-types
  const Wrapper = ({ children }) => (
    <ThemeProvider theme={theme}>{children}</ThemeProvider>
  );

  return render(ui, { wrapper: Wrapper, ...options });
};

window.matchMedia = jest.fn().mockImplementation(query => {
  return {
    matches: false,
    media: query,
    onchange: null,
    addListener: jest.fn(),
    removeListener: jest.fn(),
  };
});
