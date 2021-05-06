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

/* Theme variables */
import './theme/variables.css';
import { Settings } from 'luxon';
import globalStore from './stores/global';
import { useState } from '@hookstate/core';

const App: React.FC = () => {
    const locale = useState(globalStore.locale);

    useEffect(() => {
        Settings.defaultLocale = locale.get();
    }, [locale]);

    return (
        <IonApp>
            <RouterView />
        </IonApp>
    );
};

export default App;
