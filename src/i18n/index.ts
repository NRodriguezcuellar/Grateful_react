import i18n from 'i18next';
import general_nl from './locales/nl/general.json';
import add_moment_nl from './locales/nl/add_moment.json';
import general_en from './locales/en/general.json';
import add_moment_en from './locales/en/add_moment.json';

import { initReactI18next } from 'react-i18next';

export const resources = {
    en: {
        general: general_en,
        add_moment: add_moment_en,
    },
    nl: {
        general: general_nl,
        add_moment: add_moment_nl,
    },
};

i18n.use(initReactI18next).init({
    lng: 'en',
    react: {
        useSuspense: true,
    },
    fallbackLng: 'en',
    resources: resources,
    defaultNS: 'general',
});

export default i18n;
