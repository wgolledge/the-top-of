import '@testing-library/react/cleanup-after-each';
import '@testing-library/jest-dom/extend-expect';
import { createMuiTheme } from '@material-ui/core/styles';
import React from 'react';
import { render } from '@testing-library/react';
import { ThemeProvider } from '@material-ui/styles';

import { defaultThemeSettings } from './utils/withRoot';

const theme = createMuiTheme(defaultThemeSettings);

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
