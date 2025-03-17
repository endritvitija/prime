import {
  AppBar,
  Box,
  Button,
  ButtonBase,
  Container,
  Stack,
  ToggleButton,
  ToggleButtonGroup,
  Toolbar,
} from '@mui/material';
import primeLightSvg from '@/assets/primeLight.svg';
import primeDarkSvg from '@/assets/primeDark.svg';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { setLanguage, setTheme } from '@/slices/appConfig';
import ukFlag from '@/assets/ukFlag.webp';
import albFlag from '@/assets/albaniaFlag.png';
import ThemeSwitch from '@/components/atoms/ThemeSwitch/ThemeSwitch';
import { useTranslation } from 'react-i18next';

function NavigationBar() {
  const dispatch = useDispatch();
  const { t, i18n } = useTranslation();
  const appConfig = useSelector((state) => state.appConfig);
  const language = appConfig.languageState.language;
  const theme = appConfig.themeState.theme;

  const imageUrl = theme === 'light' ? primeLightSvg : primeDarkSvg;

  const handleThemeChange = (event) => {
    dispatch(setTheme(event.target.checked ? 'dark' : 'light'));
  };

  const handleLanguageChange = (_, newLanguage) => {
    if (newLanguage) {
      i18n.changeLanguage(newLanguage);
      dispatch(setLanguage(newLanguage));
    }
  };

  return (
    <AppBar position='static'>
      <Container maxWidth='xl'>
        <Toolbar disableGutters>
          <Box>
            <ButtonBase className='px-2'>
              <Link to='/'>
                <img src={imageUrl} alt='Prime' height={30} />
              </Link>
            </ButtonBase>
          </Box>

          <Stack className='ml-4' flexDirection='row' columnGap={2} flexGrow={1}>
            <Link to='/'>
              <Button sx={{ color: 'text.primary' }}>{t('home')}</Button>
            </Link>
            <Link to='/charts'>
              <Button sx={{ color: 'text.primary' }}>{t('charts.charts')}</Button>
            </Link>
            <Link to='/data'>
              <Button sx={{ color: 'text.primary' }}>{t('data')}</Button>
            </Link>
          </Stack>

          <Stack direction='row' spacing={2} alignItems='center'>
            <ThemeSwitch checked={theme === 'dark'} onChange={handleThemeChange} />

            <ToggleButtonGroup
              value={language}
              exclusive
              onChange={handleLanguageChange}
              aria-label='text alignment'
            >
              <ToggleButton value='en'>
                <img src={ukFlag} height={10} />
              </ToggleButton>
              <ToggleButton value='al'>
                <img src={albFlag} width={20} />
              </ToggleButton>
            </ToggleButtonGroup>
          </Stack>
        </Toolbar>
      </Container>
    </AppBar>
  );
}

export default NavigationBar;
