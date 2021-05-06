import i18n from 'i18next';
import nl from './locales/nl.json';
import en from './locales/en.json';
import { initReactI18next } from 'react-i18next';

export const resources = {
    en: en,
    nl: nl,
};

i18n.use(initReactI18next).init({
    lng: 'en',
    ns: ['nl', 'en'],
    resources,
    react: {
        useSuspense: true,
    },
    fallbackLng: 'en',
});

export default i18n;
