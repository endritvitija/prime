import { RouterProvider } from 'react-router-dom';
import router from './router';
import { ThemeProvider } from '@emotion/react';
import { CssBaseline } from '@mui/material';
import { useSelector } from 'react-redux';
import { darkTheme, lightTheme } from './utils/themes';

function App() {
  const theme = useSelector((state) => state.appConfig.themeState.theme);

  return (
    <ThemeProvider theme={theme === 'light' ? lightTheme : darkTheme}>
      <CssBaseline />
      <RouterProvider router={router} />
    </ThemeProvider>
  );
}

export default App;
