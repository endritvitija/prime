import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import { store } from '@/store/store';
import lazyLoadPlugin from './lazyLoadPlugin';

i18n
  .use(lazyLoadPlugin)
  .use(initReactI18next)
  .init({
    lng: store.getState().appConfig.languageState.language,
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;
