import { IonApp } from '@ionic/react';
import React, { useEffect } from 'react';
import RouterView from './router';

/* Core CSS required for Ionic components to work properly */
import '@ionic/react/css/core.css';

/* Basic CSS for apps built with Ionic */
import '@ionic/react/css/normalize.css';
import '@ionic/react/css/structure.css';
import '@ionic/react/css/typography.css';

/* Optional CSS custom-hooks that can be commented out */
import '@ionic/react/css/padding.css';
import '@ionic/react/css/float-elements.css';
import '@ionic/react/css/text-alignment.css';
import '@ionic/react/css/text-transformation.css';
import '@ionic/react/css/flex-utils.css';
import '@ionic/react/css/display.css';
import './i18n';
import { Settings } from 'luxon';

/* Theme variables */
import './theme/variables.css';
import { useTranslation } from 'react-i18next';

const App: React.FC = () => {
    const { i18n } = useTranslation();
    Settings.defaultLocale = i18n.language;

    return (
        <IonApp>
            <RouterView />
        </IonApp>
    );
};

export default App;
