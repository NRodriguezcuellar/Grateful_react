import React from 'react';
import {
    IonContent,
    IonPage,
    IonList,
    IonListHeader,
    IonSegmentButton,
    IonSegment,
    IonFab,
    IonFabButton,
    IonIcon,
} from '@ionic/react';
import '../assets/styles/Tab1.css';
import TheHeader from '../components/TheHeader';
import { State, useState } from '@hookstate/core';
import globalStore from '../stores/global';
import AggregatedMoments from '../components/MomentsAggregratedByTime';
import { setStateBasedOnPeriodKind } from '../helpers/state';
import { PeriodKind } from '../components/MomentDropdown';
import { useTranslation } from 'react-i18next';
import { MomentStorage } from '../helpers/storage';
import { useAsyncEffect } from 'use-async-effect';
import { addOutline, chevronUpCircleOutline } from 'ionicons/icons';
import { useHistory } from 'react-router';

const emptyState = { fontWeight: 400, margin: '1rem auto', width: '100%', paddingLeft: '1.3rem' };

const Homepage: React.FC = () => {
    const state = useState(globalStore);
    const timePeriodState = useState<PeriodKind>('week');
    const { t } = useTranslation(['general']);
    const momentStorage = new MomentStorage().init();
    const history = useHistory();

    useAsyncEffect(async () => {
        state.moments.set(await momentStorage.getMoments());
    }, []);

    const moments = () => {
        const moments = state.moments.get();
        const aggregationType = timePeriodState.get();
        if (moments.length) {
            return <AggregatedMoments aggregrationType={aggregationType} moments={moments} />;
        } else {
            return <h6 style={emptyState}>No Moments added yet!</h6>;
        }
    };

    const timePeriodClickHandler = (period: string, timePeriodState: State<PeriodKind>) => {
        setStateBasedOnPeriodKind('year', false, state);
        timePeriodState.set(period as PeriodKind);
    };

    return (
        <IonPage>
            <TheHeader />
            <IonContent>
                <IonList style={{ height: '100%' }}>
                    <IonListHeader>
                        <h1>{t('moment_list_title')}</h1>
                    </IonListHeader>
                    <IonSegment
                        value={timePeriodState.get()}
                        onIonChange={(event) => timePeriodClickHandler(event.detail.value!, timePeriodState)}
                    >
                        <IonSegmentButton value="year"> {t('year')}</IonSegmentButton>
                        <IonSegmentButton value="month">{t('month')}</IonSegmentButton>
                        <IonSegmentButton value="week"> {t('week')}</IonSegmentButton>
                    </IonSegment>

                    {moments()}
                </IonList>

                <IonFab slot="fixed" vertical="bottom" horizontal="end" onClick={() => history.push('addMoment')}>
                    <IonFabButton>
                        <IonIcon icon={addOutline} />
                    </IonFabButton>
                </IonFab>
            </IonContent>
        </IonPage>
    );
};

export default Homepage;
