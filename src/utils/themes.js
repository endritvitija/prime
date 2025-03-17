import { createTheme } from '@mui/material';
import { deepmerge } from '@mui/utils';

const typographyThemeOptions = {
  typography: {
    fontSize: 14,
    fontWeightLight: 300,
    fontWeightRegular: 400,
    fontWeightMedium: 500,
    fontWeightBold: 700,
    htmlFontSize: 16,
  },
};

const paletteLightThemeOptions = {
  palette: {
    mode: 'light',
    primary: {
      main: '#37b8e1',
      light: '#61c9ea',
      dark: '#277f9c',
    },
    secondary: {
      main: '#e85f5c',
      light: '#f38380',
      dark: '#a24240',
    },
    background: {
      default: '#f7f7f7',
      paper: '#ffffff',
    },
    text: {
      primary: 'rgba(0,0,0,0.87)',
      secondary: '#4a4a4a',
      disabled: 'rgba(12,12,12,0.38)',
    },
    error: {
      main: '#d02d2d',
      light: '#da5959',
      dark: '#8a1c1c',
    },
    warning: {
      main: '#ec6d05',
      light: '#f58d37',
      dark: '#a44b03',
    },
    info: {
      main: '#0381c5',
      light: '#369ad0',
      dark: '#035b8a',
    },
    success: {
      main: '#2b752f',
      light: '#4e8751',
      dark: '#1b4c1d',
    },
    divider: 'rgba(12,12,12,0.12)',
  },
};

const paletteDarkThemeOptions = {
  palette: {
    mode: 'dark',
    background: {
      default: '#121212',
      paper: '#282828',
    },
    text: {
      primary: 'rgba(255,255,255,0.87)',
      secondary: '#c9c9c9',
      disabled: 'rgba(201,201,201,0.38)',
    },
    divider: '#4a4a4a',
  },
};

export const lightTheme = createTheme(deepmerge(paletteLightThemeOptions, typographyThemeOptions));

export const darkTheme = createTheme(lightTheme, paletteDarkThemeOptions);
