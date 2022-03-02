import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import enTranslate from './en.json';
import esTranslate from './es.json';

const resources = {
  en: {
    translation: enTranslate,
  },
  es: {
    translation: esTranslate,
  },
};

i18n.use(initReactI18next).init({
  resources,
  lng: 'en',
  keySeparator: false,
  interpolation: {
    escapeValue: false,
  },
});

export default i18n;
