import { IonApp } from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
import { useState } from '@hookstate/core';
import { DateTime } from 'luxon';
import React from 'react';

/* Core CSS required for Ionic components to work properly */
import '@ionic/react/css/core.css';

/* Basic CSS for apps built with Ionic */
import '@ionic/react/css/normalize.css';
import '@ionic/react/css/structure.css';
import '@ionic/react/css/typography.css';

/* Optional CSS utils that can be commented out */
import '@ionic/react/css/padding.css';
import '@ionic/react/css/float-elements.css';
import '@ionic/react/css/text-alignment.css';
import '@ionic/react/css/text-transformation.css';
import '@ionic/react/css/flex-utils.css';
import '@ionic/react/css/display.css';

/* Theme variables */
import './theme/variables.css';
import StandardView from './view/StandardView';
import AddMomentView from './view/AddMomentView';
import { Persistence } from '@hookstate/persistence';

const App: React.FC = () => {
    interface State {
        userMadeMomentToday: boolean;
        lastUpdatedAt: string | null;
    }

    const state = useState<State>({
        userMadeMomentToday: false,
        lastUpdatedAt: null,
    });

    state.attach(Persistence('MomentStatus'));

    const momentStatusHandler = (value: boolean, time: string) => {
        state.userMadeMomentToday.set(value);
        state.lastUpdatedAt.set(time);
    };

    const checkLastUpdatedTime = (iso: string) => {
        const currentTime = DateTime.local();
        const lastUpdatedTime = DateTime.fromISO(iso);

        const timeDifference = currentTime.diff(lastUpdatedTime).toObject().milliseconds;

        if (timeDifference) {
            const seconds = timeDifference / 1000;
            const secondsInDay = 60 * 60 * 24;
            if (seconds >= secondsInDay) {
                state.userMadeMomentToday.set(false);
            }
        }
    };

    if (state.lastUpdatedAt.get()) {
        checkLastUpdatedTime(state.lastUpdatedAt.get() as string);
    }

    return (
        <IonApp>
            <IonReactRouter>
                {state.userMadeMomentToday.get() ? (
                    <StandardView />
                ) : (
                    <AddMomentView skip={() => momentStatusHandler(true, DateTime.local().toISO())} />
                )}
            </IonReactRouter>
        </IonApp>
    );
};

export default App;
