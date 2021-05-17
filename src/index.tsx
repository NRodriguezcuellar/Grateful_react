import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import * as serviceWorkerRegistration from './serviceWorkerRegistration';
import reportWebVitals from './reportWebVitals';
import { FirebaseAuthProvider, FirebaseAuthConsumer } from '@react-firebase/auth';
import firebase from 'firebase/app';
import 'firebase/auth';
import { firebaseConfig } from './firebase';
import { Settings } from 'luxon';

import i18n from 'i18next';
import { GratefulSettings } from './helpers/gratefulSettings';

const grateful_settings = new GratefulSettings().init();

grateful_settings.getSettings().then((settings) => {
    if (settings) {
        i18n.changeLanguage(settings.locale);
        Settings.defaultLocale = i18n.language;
    }
});

ReactDOM.render(
    <React.StrictMode>
        <App />
    </React.StrictMode>,
    document.getElementById('root'),
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://cra.link/PWA
serviceWorkerRegistration.unregister();

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
