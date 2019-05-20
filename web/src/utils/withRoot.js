import React from 'react';
import JssProvider from 'react-jss/lib/JssProvider';
import {
  createGenerateClassName,
  ThemeProvider,
  makeStyles,
} from '@material-ui/styles';
import { createMuiTheme } from '@material-ui/core/styles';
import Toggle from 'react-toggle';

import './toggle.css';
import moon from '../assets/moon.svg';
import sun from '../assets/sun.svg';

import { useDarkMode } from './hooks';

const generateClassName = createGenerateClassName({
  dangerouslyUseGlobalCSS: false,
  productionPrefix: 'c',
});

const lightThemeBg = '#F2F6F8';
const darkThemeBg = '#393D3F';
const lightThemePrimaryText = '#78A1BB';
const darkThemePrimaryText = '#BBD5ED';
const lightThemeSecondaryText = '#9E9AA7';
const darkThemeSecondaryText = '#fff';
const lightThemePaperBg = '#fff';
const darkThemePaperBg = '#272727';

const headerHeightSmall = 51;
const headerHeightLarge = 64;
const minHeightHeaderExpand = 800;

const minHeightMedia = `@media (min-height:${minHeightHeaderExpand}px)`;

export const defaultThemeSettings = {
  cardBackground: '#272727',
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
      main: lightThemePrimaryText,
    },
    secondary: {
      main: lightThemeSecondaryText,
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
};

const getTheme = darkMode =>
  createMuiTheme({
    ...defaultThemeSettings,
    palette: {
      ...defaultThemeSettings.palette,
      type: darkMode ? 'dark' : 'light',
      primary: {
        main: darkMode ? darkThemePrimaryText : lightThemePrimaryText,
      },
      secondary: {
        main: darkMode ? darkThemeSecondaryText : lightThemeSecondaryText,
      },
      background: {
        paper: darkMode ? darkThemePaperBg : lightThemePaperBg,
      },
    },
  });

export const setTheme = theme => {
  localStorage.setItem('theme', theme);
  const setCssProp = (prop, color) =>
    document.body.style.setProperty(prop, color);
  const colors = {
    dot: {
      normal: {
        light: '#000',
        dark: '#F1E3F3',
      },
      active: {
        light: '#000',
        dark: '#fff',
      },
    },
    background: {
      light: lightThemeBg,
      dark: darkThemeBg,
    },
    text: {
      light: lightThemePrimaryText,
      dark: darkThemePrimaryText,
    },
  };

  setCssProp('--dot-color', colors.dot.normal[theme]);
  setCssProp('--dot-color-active', colors.dot.active[theme]);
  setCssProp('--background-color', colors.background[theme]);
  setCssProp('--primary-text', colors.text[theme]);
};

const useStyles = makeStyles({
  toggle: {
    position: 'absolute',
    right: 11,
    top: 12,
    [minHeightMedia]: {
      top: 18,
    },
    zIndex: 300,
  },
});

const withRoot = Component => props => {
  const [darkModeEnabled, setDarkModeEnabled] = useDarkMode();
  const theme = getTheme(darkModeEnabled);
  const classes = useStyles();

  return (
    <JssProvider generateClassName={generateClassName}>
      <ThemeProvider theme={theme}>
        <Toggle
          checked={darkModeEnabled}
          className={classes.toggle}
          onChange={() => setDarkModeEnabled(c => !c)}
          icons={{
            checked: (
              <img
                src={moon}
                width="16"
                height="16"
                alt="moon"
                style={{ pointerEvents: 'none' }}
              />
            ),
            unchecked: (
              <img
                src={sun}
                width="16"
                height="16"
                alt="sun"
                style={{ pointerEvents: 'none' }}
              />
            ),
          }}
        />
        <Component
          {...props}
          darkMode={[darkModeEnabled, setDarkModeEnabled]}
        />
      </ThemeProvider>
    </JssProvider>
  );
};

export default withRoot;
